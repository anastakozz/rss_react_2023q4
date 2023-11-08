import { Button } from './components';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

type paginationProps = {
  total: number;
};

export default function Pagination(props: paginationProps) {
  const [page, setPage] = useState(1);
  const params = useParams();
  const navigate = useNavigate();

  const handleClick = (directionIsForward: boolean) => {
    if (directionIsForward) {
      navigate(`/${page + 1}`);
    } else {
      navigate(`/${page - 1}`);
    }
  };

  useEffect(() => {
    if (params.pageNumber) {
      if (+params.pageNumber <= props.total) {
        setPage(+params.pageNumber);
      } else {
        navigate('/1');
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
          handleClick(false);
        }}
      ></Button>
      <div className="py-2 rounded-full bg-white px-4">
        page {page} of {props.total}
      </div>
      <Button
        text={'Next'}
        small={true}
        onClick={() => {
          handleClick(true);
        }}
        disabled={page === props.total}
      ></Button>
    </div>
  );
}
