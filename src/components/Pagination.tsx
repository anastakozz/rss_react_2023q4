import { Button } from './components';
import { useState } from 'react';

type paginationProps = {
  total: number;
};

export default function Pagination(props: paginationProps) {
  const [page, setPage] = useState(0);


  const handleNextClick = () => {
    setPage(page + 1)
  };
  const handlePrevClick = () => {
    setPage(page - 1)
  };

  return (
    <div className="flex gap-4">
      <Button
        text={'Prev'}
        small={true}
        disabled={true}
        onClick={handlePrevClick}
      ></Button>
      <div className="py-2 rounded-full bg-white px-4">
        page {page} of {props.total}
      </div>
      <Button text={'Next'} small={true} onClick={handleNextClick}></Button>
    </div>
  );
}
