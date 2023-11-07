import { Shows } from '../modules/types';
import { ResultsCard } from './components';
import { Outlet } from 'react-router-dom';

type CardsProps = {
  data: Shows;
};

export default function Cards(props: CardsProps) {
  return (
    <div className="flex gap-12 w-full justify-center">
      <div className="h-min grid grid-cols-2 md:grid-cols-3 gap-4">
        {props.data.map((item, index) => {
          return (
            <div key={index}>
              <ResultsCard item={item}></ResultsCard>
            </div>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
}
