import { ReactNode, useEffect, useState } from 'react';
import { Button, SearchInput } from './components';
import { searchKey } from '../modules/constant';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateSearch } from '../store/searchSlice';

function Search(): ReactNode {
  const savedSearch = useAppSelector((state) => state.search.search);
  const dispatch = useAppDispatch();
  const [hasError, setHasError] = useState(false);
  const [newSearch, setNewSearch] = useState(savedSearch);

  const updateState = (value: string) => {
    setNewSearch(value);
  };

  const handleClick = () => {
    if (newSearch !== null) {
      const newSearchTrimmed = newSearch.trim();
      localStorage.setItem(searchKey, newSearchTrimmed);
      dispatch(updateSearch(newSearchTrimmed));
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
