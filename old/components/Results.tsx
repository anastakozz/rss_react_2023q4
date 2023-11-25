import { PageSizeSwitch, Cards, Pagination } from './components';

function Results() {
  return (
    <section role="results">
      <div className="flex justify-between py-4">
        <PageSizeSwitch></PageSizeSwitch>
        <Pagination />
      </div>
      <Cards />
    </section>
  );
}

export default Results;
