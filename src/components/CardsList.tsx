import { useAppSelector } from '../hooks';
import Card from './Card';

export default function CardsList() {
  const cards = useAppSelector((state) => state.cards.cards);
  return (
    <section className="flex flex-wrap">
      {cards.map((item, index) => {
        if (index === cards.length - 1) {
          return <Card key={index} item={item} isLast={true}></Card>;
        }
        return <Card key={index} item={item}></Card>;
      })}
    </section>
  );
}
