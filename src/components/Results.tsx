import { DataContext } from '../modules/context';
import { getShowsCount, searchData } from '../services/api.service';
import { Shows } from '../modules/types';
import { useState, useEffect } from 'react';
import { PageSizeSwitch, Cards, Pagination } from './components';
import { useParams, useNavigate } from 'react-router-dom';
import { firstPage } from '../modules/constant';
import Loader from './Loader';
import { useAppSelector } from '../hooks';

function Results() {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<Shows | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pagesCount, setPagesCount] = useState<number>();

  const pageSize = useAppSelector((state) => state.pageSize.pageSize);
  const search = useAppSelector((state) => state.search.search);

  useEffect(() => {
    let ignore = false;

    async function updateData(page: number) {
      if (search !== null && pageSize) {
        setIsLoading(true);
        setData(null);
        const res = await searchData(search, +pageSize, page);
        const count = await getShowsCount(search);

        if (!ignore && res && count) {
          setPagesCount(Math.ceil(count / +pageSize));
          setData(res);
          setIsLoading(false);
        }
      }
    }

    const page = params.pageNumber;
    if (!page || +page < 1) {
      navigate(firstPage);
    } else {
      updateData(+page - 1);
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

      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <DataContext.Provider value={data}>
            <Cards />
          </DataContext.Provider>
        )}
      </div>
    </section>
  );
}

export default Results;
