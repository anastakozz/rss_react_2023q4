import { SearchContext } from '../modules/context';
import { searchData } from '../services/api.service';
import { Shows } from '../modules/types';
import { useContext, useState, useEffect } from 'react';
import { Pagination, Cards } from './components';

function Results() {
  const context = useContext(SearchContext);
  const [data, setData] = useState<Shows | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function updateData() {
      setData(null);
      setIsLoading(true);
      const res = await searchData(context.search);
      if (!ignore) {
        setData(res);
        setIsLoading(false);
      }
    }
    updateData();

    return () => {
      ignore = true;
    };
  }, [context.search]);

  return (
    <>
      <Pagination></Pagination>
      <section>
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
      </section>
    </>
  );
}

export default Results;
