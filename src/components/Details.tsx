import { ShowsProps } from '../modules/interfaces';
import { Button } from './components';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

export default function Details() {
  const data: ShowsProps = useLoaderData();
  const params = useParams();
  const navigate = useNavigate();

  const description = data.description.toString().replace(/<[^>]+>/g, '');

  const closeDetails = () => {
    navigate(`/search/${params.pageNumber}`)
  };

  return (
    <div className="w-full h-full absolute z-10 top-0 flex">
      <div className=" w-1/2 bg-black/50 p-4" onClick={closeDetails}></div>
      <div className="p-4 w-1/2 bg-slate-700 overflow-scroll">
        <Button text="Close" onClick={closeDetails}></Button>
        <article className="flex gap-4 flex-wrap p-4 text-white">
          <div className="object-contain ">
            <img
              className=""
              src={typeof data.image === 'string' ? data.image : ''}
              alt="show poster"
            />
          </div>
          <div>
            <div className="text-bold text-4xl pb-4">{data.titleOriginal}</div>
            <div>
              <span className="text-bold">Country: </span>
              <span>{data.country}</span>
            </div>
            <div>
              <span className="text-bold">Started: </span>
              <span>{data.started}</span>
            </div>
            <p className="pt-4">{description}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
