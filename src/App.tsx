import { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import classNames from 'classnames';
import { SearchContext, defaultContext } from './lib/context';
import { ContextProps } from './lib/interfaces';

class App extends Component {
  state = { context: defaultContext };

  componentDidMount(): void {
    console.log(this.state.context);
    const previousSearch = localStorage.getItem('previousSearch');
    console.log(!!previousSearch);

    if (previousSearch) {
      this.setState(
        {
          context: {
            search: previousSearch,
          },
        },
        () => {
          console.log('state was updated with ' + this.state.context.search);
        }
      );
    }
  }

  updateContext = (newContext: ContextProps) => {
    this.setState({ context: newContext }, () => {
      localStorage.setItem('previousSearch', newContext.search);
    });
  };

  render() {
    return (
      <SearchContext.Provider value={this.state.context}>
        <div className="bg-slate-700">
          <div
            className={classNames(
              'max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10',
              'min-w-[200px] min-h-screen'
            )}
          >
            <Search updateContext={this.updateContext}></Search>
            <Results></Results>
          </div>
        </div>
      </SearchContext.Provider>
    );
  }
}

export default App;
