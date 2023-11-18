import { ResultsCard } from './components';
import { useParams, Outlet } from 'react-router-dom';
import Loader from './Loader';
import { useAppSelector } from '../hooks';
import { useGetShowsListQuery } from '../store/api';

export default function Cards() {
  const params = useParams();

  const pageSize = useAppSelector((state) => state.pageSize.pageSize);
  const search = useAppSelector((state) => state.search.search);

  const { data, isFetching } = useGetShowsListQuery({
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

  if (isFetching) {
    return <Loader />;
  }

  if (dataToShow && dataToShow.length !== 0) {
    return (
      <div className="flex gap-12 w-full justify-center text-white">
        <div className="h-min grid grid-cols-2 md:grid-cols-3 gap-4">
          {dataToShow.map((item, index) => (
            <div key={index}>
              <ResultsCard item={item}></ResultsCard>
            </div>
          ))}
        </div>
        <Outlet />
      </div>
    );
  }

  return 'nothing to show';
}
