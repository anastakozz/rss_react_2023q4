import { Search, Results } from './components/components';
import classNames from 'classnames';

function App() {
  return (
    <div className="bg-slate-700 min-h-screen w-full">
      <div
        className={classNames(
          'max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 h-full'
        )}
      >
        <Search></Search>
        <Results></Results>
      </div>
    </div>
  );
}

export default App;
