import { ReactNode, useEffect, useState } from 'react';
import { Button, SearchInput } from './components';

function Search(): ReactNode {
  const [hasError, setHasError] = useState(false);
  const [newSearch, setNewSearch] = useState('');

  const updateState = (value: string) => {
    setNewSearch(value);
  };

  const handleClick = () => {
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
