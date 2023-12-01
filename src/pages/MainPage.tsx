import { Link } from 'react-router-dom';
import CardsList from '../components/CardsList';
function MainPage() {
  return (
    <main className='bg-gradient-to-r from-slate-200 to-blue-400'>
      <h1>Main page</h1>
      <section className="mb-8 flex justify-center gap-8">
        <Link
          className="transition hover:underline active:scale-95"
          to={'/form-1'}
        >
          to Hook Form
        </Link>
        <Link
          className="transition hover:underline active:scale-95"
          to={'/form-2'}
        >
          to Uncontrolled Form
        </Link>
      </section>
      <CardsList />
    </main>
  );
}

export default MainPage;
