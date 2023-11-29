import { Link } from 'react-router-dom';

function HookForm() {
  return (
    <>
      <h1 className="py-4 text-center text-4xl text-red-500">Hook</h1>
      <Link to={'/'} className="block text-center">
        to MainPage
      </Link>
    </>
  );
}

export default HookForm;
