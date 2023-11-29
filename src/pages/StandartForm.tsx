import { Link } from 'react-router-dom';

function StandartForm() {
  return (
    <>
      <h1 className="py-4 text-center text-4xl text-red-500">StandartForm</h1>
      <Link to={'/'} className="block text-center">
        to MainPage
      </Link>
    </>
  );
}

export default StandartForm;
