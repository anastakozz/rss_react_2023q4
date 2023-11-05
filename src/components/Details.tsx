import { useEffect, useState } from 'react';
import { ShowsProps } from '../modules/interfaces';
import { Button } from './components';
import { useNavigate, useParams } from 'react-router-dom';
import { getShowData } from '../services/api.service';

export default function Details() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<ShowsProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const closeDetails = () => {
    navigate(`/search/${params.pageNumber}`);
  };

  useEffect(() => {
    let ignore = false;

    async function updateData() {
      setData(null);
      setIsLoading(true);
      const res = await getShowData(params.showId);

      if (!ignore && res) {
        setData(res);
        setIsLoading(false);
      }
    }

    updateData();

    return () => {
      ignore = true;
    };
  }, [params]);

  return (
    <div className="w-1/2 h-full p-4 relative">
      <div
        className="w-full h-full bg-black/50 absolute z-10 top-0 -left-full"
        onClick={closeDetails}
      ></div>
      <div className="h-full bg-slate-700 overflow-scroll">
        <div className="flex justify-end pb-4">
          <Button text="Close" onClick={closeDetails}></Button>
        </div>

        <article className="flex gap-4 flex-wrap text-white ">
          {isLoading ? (
            'loading... Please, wait'
          ) : (
            <>
              {data ? (
                <>
                  <div className="object-contain ">
                    <img
                      className=""
                      src={typeof data.image === 'string' ? data.image : ''}
                      alt="show poster"
                    />
                  </div>
                  <div>
                    <div className="text-bold text-4xl pb-4">
                      {data.titleOriginal}
                    </div>
                    <div>
                      <span className="text-bold">Country: </span>
                      <span>{data.country}</span>
                    </div>
                    <div>
                      <span className="text-bold">Started: </span>
                      <span>{data.started}</span>
                    </div>
                    <p className="pt-4">
                      {data.description.toString().replace(/<[^>]+>/g, '')}
                    </p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </article>
      </div>
    </div>
  );
}
