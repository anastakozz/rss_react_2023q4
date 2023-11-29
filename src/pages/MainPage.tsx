import { Link } from 'react-router-dom';
import CardsList from '../components/CardsList';
function MainPage() {
  return (
    <main>
      <h1>Main page</h1>
      <section className="flex justify-center gap-8">
        <Link to={'/form-1'}>to HookForm</Link>
        <Link to={'/form-2'}>to StandartForm</Link>
      </section>
      <CardsList />
    </main>
  );
}

export default MainPage;
