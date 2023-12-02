import { Link } from 'react-router-dom';

function HookForm() {
  return (
    <main className="bg-gradient-to-r from-blue-200 to-pink-200">
      <h1>Hook</h1>
      <Link
        to={'/'}
        className="block text-center transition hover:underline active:scale-95"
      >
        to MainPage
      </Link>
    </main>
  );
}

export default HookForm;
