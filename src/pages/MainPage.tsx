import { Link } from 'react-router-dom';
function MainPage() {
  return (
    <>
      <h1 className="py-4 text-center text-red-500 text-4xl">Main page</h1>
      <section className="flex justify-center gap-8">
        <Link to={'/form-1'}>to HookForm</Link>
        <Link to={'/form-2'}>to StandartForm</Link>
      </section>
    </>
  );
}

export default MainPage;
