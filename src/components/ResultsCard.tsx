import { Link, useParams } from 'react-router-dom';
import { ShowsProps } from '../modules/interfaces';

type ResultCardProps = {
  item: ShowsProps;
};

export default function ResultsCard(props: ResultCardProps) {
  const { id, titleOriginal, totalSeasons, rating } = props.item;
  const params = useParams();

  return (
    <Link role='card' to={`/${params.pageNumber}/${id}`}>
      <div role='card-id' className="bg-slate-500 max-w-xs p-4 rounded h-full" id={`${id}`}>
        <div className="underline my-1 hover:text-orange-300 transition">
          <span className="font-bold">{titleOriginal}</span>
        </div>
        <div>
          <span className="">Total seasons: </span>
          <span className="font-bold">{totalSeasons}</span>
        </div>
        <div>
          <span className="">Rating: </span>
          <span className="font-bold">{rating}</span>
        </div>
      </div>
    </Link>
  );
}
