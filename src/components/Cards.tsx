import { ResultsCard } from './components';
import { Outlet } from 'react-router-dom';
import { Shows } from '../modules/types';

type CardsProps = {
  data: Shows;
};

export default function Cards(props: CardsProps) {
  const { data } = props;
  return (
    <>
      {data && data.length !== 0 ? (
        <div className="flex gap-12 w-full justify-center text-white">
          <div className="h-min grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((item, index) => {
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
