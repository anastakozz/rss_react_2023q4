import { Button } from './components';
import Link from 'next/link';
import Loader from './Loader';
import { mockedDetailsData } from '@/modules/mockData';

export default function Details() {

  const isFetching = false;
  const dataToShow = mockedDetailsData

  return (
    <div className="h-full w-2/3 relative" role="details">
      <div className="h-full pb-8">
        <div className="absolute top-4 right-4">
          <Button text="Close"></Button>
        </div>

        <article className="flex gap-4 flex-wrap text-white ">
          {isFetching ? (
            <Loader />
          ) : (
            <>
              {dataToShow && (
                <>
                  {dataToShow.image && 
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
                    </div>}
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
