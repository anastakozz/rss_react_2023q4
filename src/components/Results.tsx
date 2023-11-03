import { SearchContext } from '../modules/context';
import { getShowsCount, searchData } from '../services/api.service';
import { Shows } from '../modules/types';
import { useContext, useState, useEffect } from 'react';
import { PageSizeSwitch, Cards, Pagination } from './components';
import { ContextProps } from '../modules/interfaces';

type SearchProps = { updateContext: (newContext: ContextProps) => void };

function Results(props: SearchProps) {
  const context = useContext(SearchContext);
  const [data, setData] = useState<Shows | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(context.pageSize);
  const [pagesCount, setPagesCount] = useState(0);
  const page = 0;

  const updatePageSize = (value: string) => {
    setPageSize(value);
    props.updateContext({ ...context, pageSize: value });
  };

  useEffect(() => {
    let ignore = false;
    async function updateData() {
      if (context.search !== null && pageSize) {
        setData(null);
        setIsLoading(true);
        const res = await searchData(context.search, +pageSize, page);
        const count = await getShowsCount(context.search);
        if (!ignore) {
          setData(res);
          setPagesCount(Math.ceil(count / +pageSize));
          setIsLoading(false);
        }
      }
    }
    updateData();

    return () => {
      ignore = true;
    };
  }, [context, pageSize, page]);

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
