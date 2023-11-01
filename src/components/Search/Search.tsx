import { SearchContext } from '../../modules/context';
import { ReactNode, useContext, useEffect, useState } from 'react';
import Button from '../Button';
import SearchInput from '../SearchInput';
import { ContextProps } from '../../modules/interfaces';

type SearchProps = { updateContext: (newContext: ContextProps) => void };

function Search(props: SearchProps): ReactNode {
  const context = useContext(SearchContext);
  const [hasError, setHasError] = useState(false);
  const [newSearch, setNewSearch] = useState(context.search);

  function updateState(value: string) {
    setNewSearch(value);
  }

  const handleClick = () => {
    const newSearchTrimmed = newSearch.trim();
    localStorage.setItem('previousSearch', newSearchTrimmed);
    props.updateContext({
      search: newSearchTrimmed,
    });
  };

  const throwTestError = () => {
    setHasError(true);
  };

  useEffect(() => {
    if (hasError) {
      throw new Error('this is a test Error');
    } else {
      const previousSearch = localStorage.getItem('previousSearch');

      if (previousSearch && previousSearch !== context.search) {
        props.updateContext({
          search: previousSearch,
        });
        setNewSearch(previousSearch);
      }
    }
  }, [context.search, props, hasError]);

  return (
    <section>
      <div className="flex gap-4 py-4 justify-center">
        <Button
          text="Error"
          onClick={() => {
            throwTestError();
          }}
        ></Button>
        <SearchInput
          updateState={updateState}
          inputValue={newSearch}
        ></SearchInput>
        <Button text="Search" onClick={handleClick}></Button>
      </div>
      <hr className="w-full" />
    </section>
  );
}

export default Search;
