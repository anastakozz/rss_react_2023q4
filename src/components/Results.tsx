import { SearchContext } from '../modules/context';
import { getShowsCount, searchData } from '../services/api.service';
import { Shows } from '../modules/types';
import { useContext, useState, useEffect } from 'react';
import { PageSizeSwitch, Cards, Pagination } from './components';
import { ContextProps } from '../modules/interfaces';
import { useParams, useNavigate } from 'react-router-dom';

type SearchProps = { updateContext: (newContext: ContextProps) => void };

function Results(props: SearchProps) {
  const context = useContext(SearchContext);
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<Shows | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(context.pageSize);
  const [pagesCount, setPagesCount] = useState(0);
  const [page, setPage] = useState(0);

  const updatePageSize = (value: string) => {
    setPageSize(value);
    props.updateContext({ ...context, pageSize: value });
    navigate('/search/1');
  };

  useEffect(() => {
    let ignore = false;

    async function updateData() {
      if (context.search !== null && pageSize) {
        setData(null);
        setIsLoading(true);
        const res = await searchData(context.search, +pageSize, page);
        const count = await getShowsCount(context.search);

        if (!ignore && res && count) {
          if (params.pageNumber) {
            setPage(+params.pageNumber - 1);
          }
          setData(res);
          setPagesCount(Math.ceil(count / +pageSize));

          setIsLoading(false);
        }
      }
    }

    if (!params.pageNumber || +params.pageNumber < 1) {
      navigate('/search/1');
    } else {
      updateData();
    }

    return () => {
      ignore = true;
    };
  }, [context, pageSize, page, params, navigate]);

  return (
    <section className="pt-4">
      <div className="flex justify-between">
        <PageSizeSwitch updateData={updatePageSize}></PageSizeSwitch>
        <>{pagesCount ? <Pagination total={pagesCount} /> : <></>}</>
      </div>

      <article>
        {isLoading ? (
          <div className="text-white py-4">Loading...</div>
        ) : (
          <article className="text-white py-4">
            {data && data.length !== 0 ? (
              <Cards data={data} />
            ) : (
              'nothing to show'
            )}
          </article>
        )}
      </article>
    </section>
  );
}

export default Results;
