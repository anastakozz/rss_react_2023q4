import { Species } from '../../modules/types';
import ResultsCard from '../ResultsCard';

type CardsProps = {
  data: Species;
};

export default function Cards(props: CardsProps) {
  return (
    <div className="grid grid-flow-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {props.data.map((item, index) => {
        return (
          <div key={index}>
            <ResultsCard item={item}></ResultsCard>
          </div>
        );
      })}
    </div>
  );
}
