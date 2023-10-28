import { SearchContext } from '../../lib/context';
import { Component, ReactNode } from 'react';
import Button from '../Button';
import SearchInput from '../SearchInput';


class Search extends Component {
  static contextType = SearchContext;
  declare context: React.ContextType<typeof SearchContext>;

  render(): ReactNode {
    const context = this.context;

    return (
      <div>
        <h1 className="text-6xl text-center text-white py-4">
          STARWARS Species
        </h1>
        <div className="flex gap-4 py-4 justify-center">
          <SearchInput defaultValue={context.search}></SearchInput>
          <Button text="Search"></Button>
        </div>
        <hr className="w-full" />
      </div>
    );
  }
}

export default Search;
