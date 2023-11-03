import { SearchContext } from '../modules/context';
import { searchData } from '../services/api.service';
import { Shows } from '../modules/types';
import { useContext, useState, useEffect } from 'react';
import { PageSizeSwitch, Cards } from './components';
import { ContextProps } from '../modules/interfaces';

type SearchProps = { updateContext: (newContext: ContextProps) => void };

function Results(props: SearchProps) {
  const context = useContext(SearchContext);
  const [data, setData] = useState<Shows | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(context.pageSize);
  const page = 0;

  const updatePageSize = (value: string) => {
    setPageSize(value);
    props.updateContext({ ...context, pageSize: value });
  };

  useEffect(() => {
    let ignore = false;
    async function updateData() {
      setData(null);
      setIsLoading(true);
      const res = await searchData(context.search, +pageSize, page);
      if (!ignore) {
        setData(res);
        setIsLoading(false);
      }
    }
    updateData();

    return () => {
      ignore = true;
    };
  }, [context, pageSize, page]);

  return (
    <section className="pt-4">
      <PageSizeSwitch updateData={updatePageSize}></PageSizeSwitch>
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
