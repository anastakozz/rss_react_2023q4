import { Search, Results } from './components/components';
import classNames from 'classnames';
import { SearchContext, defaultContext } from './modules/context';
import { ContextProps } from './modules/interfaces';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const [context, setContext] = useState<ContextProps>(defaultContext);

  const updateContext = (newContext: ContextProps) => {
    setContext(newContext);
  };

  return (
    <SearchContext.Provider value={context}>
      <div className="bg-slate-700 flex h-screen">
        <div
          className={classNames(
            'w-1/2 mx-auto px-4 md:px-6 lg:px-8 xl:px-10 h-full overflow-scroll'
          )}
        >
          <ErrorBoundary
            fallback={
              <p className="text-center pt-10 text-white">
                Ooops! Something went wrong... Please, refresh the page!
              </p>
            }
          >
            <Search updateContext={updateContext}></Search>
            <Results updateContext={updateContext}></Results>
          </ErrorBoundary>
        </div>
        <Outlet />
      </div>
    </SearchContext.Provider>
  );
}

export default App;
