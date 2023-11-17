import { getShowsCount } from '../services/api.service';
import { useState, useEffect } from 'react';
import { PageSizeSwitch, Cards, Pagination } from './components';
import { useParams, useNavigate } from 'react-router-dom';
import { firstPage } from '../modules/constant';
import Loader from './Loader';
import { useAppSelector } from '../hooks';
import { useGetApiDataQuery } from '../store/api';
import { Shows } from '../modules/types';

function Results() {
  const params = useParams();
  const navigate = useNavigate();
  let dataToShow: Shows | undefined = undefined;

  const pageSize = useAppSelector((state) => state.pageSize.pageSize);
  const search = useAppSelector((state) => state.search.search);

  const { data, isLoading } = useGetApiDataQuery({
    method: 'shows.Get',
    params: {
      search: {
        search,
      },
      page: params.pageNumber as string,
      pageSize,
    },
  });

  if(data){
    dataToShow = data.result as Shows
  }

  const [pagesCount, setPagesCount] = useState<number>();

  useEffect(() => {
    let ignore = false;

    async function updatePagesCount() {
      if (search !== null && pageSize) {
        const count = await getShowsCount(search);

        if (!ignore && count) {
          setPagesCount(Math.ceil(count / +pageSize));
        }
      }
    }

    const page = params.pageNumber;
    if (!page || +page < 1) {
      navigate(firstPage);
    } else {
      updatePagesCount();
    }

    return () => {
      ignore = true;
    };
  }, [pageSize, params.pageNumber, navigate, search]);

  return (
    <section role="results">
      <div className="flex justify-between py-4">
        <PageSizeSwitch></PageSizeSwitch>
        {pagesCount && <Pagination total={pagesCount} />}
      </div>

      <div>{isLoading ? <Loader /> : dataToShow && <Cards data={dataToShow} />}</div>
    </section>
  );
}

export default Results;
