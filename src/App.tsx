import { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import classNames from 'classnames';
import { SearchContext, defaultContext } from './modules/context';
import { ContextProps } from './modules/interfaces';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = { context: defaultContext };

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
            <ErrorBoundary
              fallback={
                <p className="text-center pt-10 text-white">
                  Ooops! Something went wrong... Please, refresh the page!
                </p>
              }
            >
              <Search updateContext={this.updateContext}></Search>
              <Results></Results>
            </ErrorBoundary>
          </div>
        </div>
      </SearchContext.Provider>
    );
  }
}

export default App;
