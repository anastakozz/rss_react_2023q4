import { useRouter } from "next/router";
import { ShowsProps } from "../modules/interfaces";
import { queryKeys } from "@/modules/enum";

type ResultCardProps = {
  item: ShowsProps;
};

export default function ResultsCard(props: ResultCardProps) {
  const router = useRouter();
  const currentUrl = router.pathname;
  const currentQuery = { ...router.query };
  const { id, titleOriginal, totalSeasons, rating } = props.item;

  const handleClick = () => {
    currentQuery[queryKeys.details] = `${id}`;
    router.push({ pathname: currentUrl, query: currentQuery });
  };

  return (
    <div role="card" onClick={handleClick}>
      <div
        role="card-id"
        className="bg-slate-500 max-w-xs p-4 rounded h-full  hover:shadow-orange-400 hover:shadow-lg active:scale-95 transition"
        id={`${id}`}
      >
        <div className="underline my-1">
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
    </div>
  );
}
