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

  const handleNextClick = () => {
    navigate(`/search/${page + 1}`)
  };
  const handlePrevClick = () => {
    navigate(`/search/${page - 1}`)
  };

  useEffect(() =>{
    if(params.pageNumber){
        setPage(+params.pageNumber)
    }
  }, [page, params])

  return (
    <div className="flex gap-4">
      <Button
        text={'Prev'}
        small={true}
        // disabled={true}
        onClick={handlePrevClick}
      ></Button>
      <div className="py-2 rounded-full bg-white px-4">
        page {page} of {props.total}
      </div>
      <Button text={'Next'} small={true} onClick={handleNextClick}></Button>
    </div>
  );
}
