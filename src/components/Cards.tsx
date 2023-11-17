import { ResultsCard } from './components';
import { useParams, Outlet } from 'react-router-dom';
import Loader from './Loader';
import { useAppSelector } from '../hooks';
import { useGetShowsListQuery } from '../store/api';

export default function Cards() {
  const params = useParams();

  const pageSize = useAppSelector((state) => state.pageSize.pageSize);
  const search = useAppSelector((state) => state.search.search);

  const { data, isLoading } = useGetShowsListQuery({
    method: 'shows.Get',
    params: {
      search: {
        query: search,
      },
      page: params.pageNumber as string,
      pageSize,
    },
  });

  const dataToShow = data?.result;
  console.log(data?.result);

  return (
    <>
      {isLoading && <Loader />}
      {dataToShow && dataToShow.length !== 0 ? (
        <div className="flex gap-12 w-full justify-center text-white">
          <div className="h-min grid grid-cols-2 md:grid-cols-3 gap-4">
            {dataToShow.map((item, index) => {
              return (
                <div key={index}>
                  <ResultsCard item={item}></ResultsCard>
                </div>
              );
            })}
          </div>
          <Outlet />
        </div>
      ) : (
        'nothing to show'
      )}
    </>
  );
}
