import { useRouter } from 'next/router';
import { Button } from './components';
import { ShowsProps } from '@/modules/interfaces';

type DetailsProps = {
  data: ShowsProps
}

export default function Details({data}: DetailsProps) {
  const router = useRouter();
  const currentUrl = router.pathname;
  const currentQuery = { ...router.query };

  const handleClick = () => {
    delete currentQuery['details'];
    router.push({pathname: currentUrl,
    query: currentQuery},)
  };

  return (
    <div className="h-full w-2/3 relative" role="details">
      <div className="h-full pb-8">
        <div className="absolute top-4 right-4">
          <Button text="Close" onClick={handleClick}></Button>
        </div>
        <article className="flex gap-4 flex-wrap text-white ">
              {data && (
                <>
                  {data.image && 
                    <div className="object-contain ">
                      <img
                        className="rounded"
                        src={
                          typeof data.image === 'string'
                            ? data.image
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
                        {data.description
                          .toString()
                          .replace(/<[^>]+>/g, '')}
                      </p>
                    </div>
                  </>
              )}
        </article>
      </div>
    </div>
  );
}
