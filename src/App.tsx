import { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import classNames from 'classnames';

class App extends Component {
  render() {
    return (
      <div
        className={classNames(
          'max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10',
          'bg-slate-700 min-w-[200px] min-h-screen'
        )}
      >
        <Search></Search>
        <Results></Results>
      </div>
    );
  }
}

export default App;
