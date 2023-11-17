import { Button } from './components';
import { useParams, Link } from 'react-router-dom';
import Loader from './Loader';
import { useGetShowDataQuery } from '../store/api';

export default function Details() {
  const params = useParams();

  const { data, isLoading } = useGetShowDataQuery({
    method: 'shows.GetById',
    params: {
      showId: params.showId as string,
      withEpisodes: true,
    },
  });

  const dataToShow = data?.result;

  return (
    <div className="h-full w-2/3 relative" role="details">
      <div className="h-full pb-8">
        <Link to={`/${params.pageNumber}`} className="absolute top-4 right-4">
          <Button text="Close"></Button>
        </Link>

        <article className="flex gap-4 flex-wrap text-white ">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {dataToShow && (
                <>
                  <div className="object-contain ">
                    <img
                      className="rounded"
                      src={
                        typeof dataToShow.image === 'string'
                          ? dataToShow.image
                          : ''
                      }
                      alt="show poster"
                    />
                  </div>
                  <div>
                    <div
                      role="details-title"
                      className="text-bold text-4xl pb-4"
                    >
                      {dataToShow.titleOriginal}
                    </div>
                    <div>
                      <span className="text-bold">Country: </span>
                      <span>{dataToShow.country}</span>
                    </div>
                    <div>
                      <span className="text-bold">Started: </span>
                      <span>{dataToShow.started}</span>
                    </div>
                    <p className="pt-4">
                      {dataToShow.description
                        .toString()
                        .replace(/<[^>]+>/g, '')}
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </article>
      </div>
    </div>
  );
}
