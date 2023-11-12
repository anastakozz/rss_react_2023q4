import { ResultsCard } from './components';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../modules/context';

export default function Cards() {
  const data = useContext(DataContext);
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
