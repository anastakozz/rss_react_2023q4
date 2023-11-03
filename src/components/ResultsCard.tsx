import { ShowsProps } from '../modules/interfaces';

type ResultCardProps = {
  item: ShowsProps;
};

export default function ResultsCard(props: ResultCardProps) {
  return (
    <div className="bg-slate-500 max-w-xs p-4 rounded">
      <a
        href={
          typeof props.item.promoUrl === 'string' ? props.item.promoUrl : ''
        }
        className="underline my-1 hover:text-orange-300 transition"
      >
        <span className="font-bold">{props.item.titleOriginal}</span>
      </a>
      <div>
        <span className="">Total seasons: </span>
        <span className="font-bold">{props.item.totalSeasons}</span>
      </div>
      <div>
        <span className="">Rating: </span>
        <span className="font-bold">{props.item.rating}</span>
      </div>
    </div>
  );
}
