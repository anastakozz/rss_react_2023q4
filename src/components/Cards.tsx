import { Details, ResultsCard } from "./components";
import { Shows } from "@/modules/types";
import { ShowsProps } from "@/modules/interfaces";

type CardsProps = {
  shows: Shows;
  details: ShowsProps | null;
};

export default function Cards({ shows, details }: CardsProps) {
  if (shows && shows.length !== 0) {
    return (
      <div
        role="cards-list"
        className="flex gap-12 w-full justify-center text-white"
      >
        <div className="h-min grid grid-cols-2 md:grid-cols-3 gap-4">
          {shows.map((item, index) => (
            <div key={index}>
              <ResultsCard item={item}></ResultsCard>
            </div>
          ))}
        </div>
        {details && <Details data={details} />}
      </div>
    );
  }

  return (
    <div className="text-white text-center">
      This search returns no results. Try another search term, please!
    </div>
  );
}
