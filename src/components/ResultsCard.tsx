import { Link } from 'react-router-dom';
import { ShowsProps } from '../modules/interfaces';

type ResultCardProps = {
  item: ShowsProps;
};

export default function ResultsCard(props: ResultCardProps) {
  const item = props.item;
  return (
    <Link to={`${item.id}`} relative="path">
      <div className="bg-slate-500 max-w-xs p-4 rounded" id={`${item.id}`}>
        <div className="underline my-1 hover:text-orange-300 transition">
          <span className="font-bold">{item.titleOriginal}</span>
        </div>
        <div>
          <span className="">Total seasons: </span>
          <span className="font-bold">{item.totalSeasons}</span>
        </div>
        <div>
          <span className="">Rating: </span>
          <span className="font-bold">{item.rating}</span>
        </div>
      </div>
    </Link>
  );
}
