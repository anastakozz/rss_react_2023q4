import { ReactNode, useEffect, useState } from 'react';
import { Button, SearchInput } from './components';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateSearch } from '../store/searchSlice';
import { useNavigate } from 'react-router-dom';
import { firstPage } from '../modules/constant';

function Search(): ReactNode {
  const navigate = useNavigate();
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
      dispatch(updateSearch(newSearchTrimmed));
      navigate(firstPage);
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
