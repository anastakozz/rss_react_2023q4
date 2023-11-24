import { Details, ResultsCard } from './components';
import Loader from './Loader';
import { Shows } from '@/modules/types';
import { mockShowsData } from '@/modules/mockData';

export default function Cards() {

  const dataToShow: Shows = mockShowsData;
  const isFetching = false;
  const isDetailsOpen = false;

  if (isFetching) {
    return <Loader />;
  }

  if (dataToShow && dataToShow.length !== 0) {
    return (
      <div
        role="cards-list"
        className="flex gap-12 w-full justify-center text-white"
      >
        <div className="h-min grid grid-cols-2 md:grid-cols-3 gap-4">
          {dataToShow.map((item, index) => (
            <div key={index}>
              <ResultsCard item={item}></ResultsCard>
            </div>
          ))}
        </div>
        {isDetailsOpen && <Details/>}
      </div>
    );
  }

  return 'nothing to show';
}
