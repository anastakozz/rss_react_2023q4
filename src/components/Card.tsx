import { CardData } from '../models/interface';

type CardProps = {
  item: CardData;
  isLast?: boolean;
};

export default function Card({ item, isLast }: CardProps) {
  return (
    <div
      className={
        (isLast ? ' border-orange-400' : ' border-white/50') +
        ' w-1/3 border border-4'
      }
    >
      <div className="p-4">
        <ul className="mb-4">
          <li>Name : {item.name}</li>
          <li>Age: {item.age}</li>
          <li>Email : {item.email}</li>
          <li>Gender: {item.gender}</li>
          <li>Country: {item.country}</li>
          <li>Password: {item.password}</li>
        </ul>

        <img src={typeof item.picture === 'string' ? item.picture : ''}></img>
      </div>
    </div>
  );
}
