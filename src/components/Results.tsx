import { SearchContext } from '../modules/context';
import { getShowsCount, searchData } from '../services/api.service';
import { Shows } from '../modules/types';
import { useContext, useState, useEffect } from 'react';
import { PageSizeSwitch, Cards, Pagination } from './components';
import { ContextProps } from '../modules/interfaces';
import { useParams, useNavigate } from 'react-router-dom';
import { firstPage } from '../modules/constant';

type SearchProps = { updateContext: (newContext: ContextProps) => void };

function Results(props: SearchProps) {
  const context = useContext(SearchContext);
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<Shows | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageSize, setPageSize] = useState(context.pageSize);
  const [pagesCount, setPagesCount] = useState(0);
  const [page, setPage] = useState(0);

  const updatePageSize = (value: string) => {
    setPageSize(value);
    props.updateContext({ ...context, pageSize: value });
    navigate(firstPage);
  };

  useEffect(() => {
    let ignore = false;

    async function updateData() {
      if (context.search !== null && pageSize) {
        setIsLoading(true);
        setData(null);
        const res = await searchData(context.search, +pageSize, page);
        const count = await getShowsCount(context.search);

        if (!ignore && res && count) {
          if (params.pageNumber) {
            setPage(+params.pageNumber - 1);
          }
          setPagesCount(Math.ceil(count / +pageSize));
          setData(res);
          setIsLoading(false);
        }
      }
    }

    if (!params.pageNumber || +params.pageNumber < 1) {
      navigate(firstPage);
    } else {
      updateData();
    }

    return () => {
      ignore = true;
    };
  }, [context, pageSize, params.pageNumber, navigate, page]);

  return (
    <section>
      <div className="flex justify-between py-4">
        <PageSizeSwitch updateData={updatePageSize}></PageSizeSwitch>
        <>{pagesCount && <Pagination total={pagesCount} />}</>
      </div>

      <div>
        {isLoading ? (
          <div className="text-white py-4 ">Loading...</div>
        ) : (
          <article className="text-white py-4 flex justify-center">
            {data && data.length !== 0 ? (
              <Cards data={data} />
            ) : (
              'nothing to show'
            )}
          </article>
        )}
      </div>
    </section>
  );
}

export default Results;
