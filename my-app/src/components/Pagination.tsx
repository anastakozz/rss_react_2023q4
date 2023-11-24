import { Button } from './components';
import { useEffect, useState } from 'react';
import { firstPage } from '../modules/constant';

export default function Pagination() {

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number>(1);
  const isLoading = false;

  const handleClick = (url: string) => {
    // navigate(url);
  };

  return (
    !isLoading && (
      <div role="pagination" className="flex gap-4">
        <Button
          text={'Prev'}
          small={true}
          disabled={page === 1}
          onClick={() => {
            handleClick(`/${page - 1}`);
          }}
        ></Button>
        <div className="py-2 rounded-full bg-white px-4">
          page {page} of {total}
        </div>
        <Button
          text={'Next'}
          small={true}
          onClick={() => {
            handleClick(`/${page + 1}`);
          }}
          disabled={page === total}
        ></Button>
      </div>
    )
  );
}
