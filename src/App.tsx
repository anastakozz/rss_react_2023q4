import { Search, Results } from './components/components';
import classNames from 'classnames';
import { SearchContext, defaultContext } from './modules/context';
import { ContextProps } from './modules/interfaces';
import { useState } from 'react';

function App() {
  const [context, setContext] = useState<ContextProps>(defaultContext);

  const updateContext = (newContext: ContextProps) => {
    setContext(newContext);
  };

  return (
    <SearchContext.Provider value={context}>
      <div className="bg-slate-700 min-h-screen w-full">
        <div
          className={classNames(
            'max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 h-full'
          )}
        >
          <Search updateContext={updateContext}></Search>
          <Results updateContext={updateContext}></Results>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
