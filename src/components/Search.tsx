import { SearchContext } from '../modules/context';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { Button, SearchInput } from './components';
import { ContextProps } from '../modules/interfaces';

type SearchProps = { updateContext: (newContext: ContextProps) => void };

function Search(props: SearchProps): ReactNode {
  const context = useContext(SearchContext);
  const [hasError, setHasError] = useState(false);
  const [newSearch, setNewSearch] = useState(context.search);

  function updateState(value: string) {
    setNewSearch(value);
  }

  const handleClick = () => {
    if (newSearch !== null) {
      const newSearchTrimmed = newSearch.trim();
      localStorage.setItem('previousSearch', newSearchTrimmed);
      props.updateContext({
        ...context,
        search: newSearchTrimmed,
      });
    }
  };

  const throwTestError = () => {
    setHasError(true);
  };

  useEffect(() => {
    if (hasError) {
      throw new Error('this is a test Error');
    }
  }, [hasError]);

  return (
    <section role='search'>
      <>
        <div className="flex gap-4 py-4 justify-center">
          <Button
            text="Error"
            onClick={() => {
              throwTestError();
            }}
          ></Button>
          <SearchInput
            updateState={updateState}
            inputValue={newSearch || ''}
          ></SearchInput>
          <Button text="Search" onClick={handleClick}></Button>
        </div>
        <hr className="w-full" />
      </>
    </section>
  );
}

export default Search;
