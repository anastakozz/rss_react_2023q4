import { CardData } from '../store/cardsSlice';

type CardProps = {
  item: CardData;
};

export default function Card({ item }: CardProps) {
  return <div className="bg-blue-500">{item.name}</div>;
}
