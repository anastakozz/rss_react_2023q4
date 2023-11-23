import { Button } from './components';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { firstPage } from '../modules/constant';
import { useAppSelector } from '../hooks';
import { useGetShowsNumberQuery } from '../store/api';
import { apiMethods } from '../modules/enum';

export default function Pagination() {
  const search = useAppSelector((state) => state.search.search);
  const pageSize = useAppSelector((state) => state.pageSize.pageSize);

  const params = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number>();

  const { data, isLoading } = useGetShowsNumberQuery({
    method: apiMethods.showsNumber,
    params: {
      search: {
        query: search,
      },
    },
  });

  const handleClick = (url: string) => {
    navigate(url);
  };

  useEffect(() => {
    if (data) {
      setTotal(Math.ceil(data.result / +pageSize));
      if (params.pageNumber && total) {
        if (+params.pageNumber <= total) {
          setPage(+params.pageNumber);
        } else {
          navigate(firstPage);
        }
      }
    }
  }, [params, navigate, data, pageSize, total]);

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
