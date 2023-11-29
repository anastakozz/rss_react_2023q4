import { useAppSelector } from '../hooks';
import Card from './Card';

export default function CardsList() {
  const cards = useAppSelector((state) => state.cards.cards);
  return (
    <section>
      {cards.map((item) => (
        <Card item={item}></Card>
      ))}
    </section>
  );
}
