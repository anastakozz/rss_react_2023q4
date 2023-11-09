import { Button } from './components';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { firstPage } from '../modules/constant';

type paginationProps = {
  total: number;
};

export default function Pagination(props: paginationProps) {
  const [page, setPage] = useState(1);
  const params = useParams();
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    navigate(url);
  };

  useEffect(() => {
    if (params.pageNumber) {
      if (+params.pageNumber <= props.total) {
        setPage(+params.pageNumber);
      } else {
        navigate(firstPage);
      }
    }
  }, [page, params, navigate, props]);

  return (
    <div className="flex gap-4">
      <Button
        text={'Prev'}
        small={true}
        disabled={page === 1}
        onClick={() => {
          handleClick(`/${page - 1}`);
        }}
      ></Button>
      <div className="py-2 rounded-full bg-white px-4">
        page {page} of {props.total}
      </div>
      <Button
        text={'Next'}
        small={true}
        onClick={() => {
          handleClick(`/${page + 1}`);
        }}
        disabled={page === props.total}
      ></Button>
    </div>
  );
}
