import { CardData } from '../store/cardsSlice';

type CardProps = {
  item: CardData;
  isLast?: boolean;
};

export default function Card({ item, isLast }: CardProps) {
  
  return (
    <div className={isLast ? 'bg-orange-400' : ' bg-blue-500'}>
      {item.name} {item.age} {item.email}
    </div>
  );
}
