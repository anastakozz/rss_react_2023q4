import { ShowsProps } from '../../modules/interfaces';

type ResultCardProps = {
  item: ShowsProps;
};

export default function ResultsCard(props: ResultCardProps) {
  return (
    <article className="bg-slate-500 max-w-xs p-4 rounded">
      <a
        href={typeof props.item.imdbUrl === 'string' ? props.item.imdbUrl : ''}
        className="underline my-1 hover:text-orange-300 transition"
      >
        <span className="">Title: </span>
        <span className="font-bold">{props.item.titleOriginal}</span>
      </a>
      <div>
        <span className="">Country: </span>
        <span className="font-bold">{props.item.country}</span>
      </div>
      <div>
        <span className="">IMDB Rating: </span>
        <span className="font-bold">{props.item.imdbRating}</span>
      </div>
    </article>
  );
}
