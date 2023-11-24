import { ReactNode, useEffect, useState } from 'react';
import { Button, SearchInput } from './components';
import { useRouter } from 'next/router';

type SearchProps = {
  search: string
}

function Search({search}: SearchProps): ReactNode {
  const router = useRouter();
  const currentUrl = router.pathname;
  const currentQuery = { ...router.query };
  
  const [hasError, setHasError] = useState(false);
  const [newSearch, setNewSearch] = useState(search);

  const updateState = (value: string) => {
    setNewSearch(value);
  };

  const handleClick = () => {
  currentQuery['search'] = newSearch;
  router.push({pathname: currentUrl,
  query: currentQuery},)
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
    <section role="search">
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
