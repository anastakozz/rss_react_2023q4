import { SearchContext } from '../../lib/context';
import { Component, ReactNode } from 'react';
import Button from '../Button';
import SearchInput from '../SearchInput';
import { ContextProps } from '../../lib/interfaces';

type SearchProps = { updateContext: (newContext: ContextProps) => void };

class Search extends Component<SearchProps> {
  static contextType = SearchContext;
  declare context: React.ContextType<typeof SearchContext>;
  state = { newSearch: '' };

  updateState(value: string) {
    this.setState({ newSearch: value });
  }

  handleClick() {
    localStorage.setItem('previousSearch', this.state.newSearch);
    const newSearchTrimmed = this.state.newSearch.trim()
    this.props.updateContext({
      search: newSearchTrimmed,
    });
  }

  render(): ReactNode {
    
    return (
      <div>
        <h1 className="text-6xl text-center text-white py-4">
          STARWARS Species
        </h1>
        <div className="flex gap-4 py-4 justify-center">
          <SearchInput updateState={this.updateState.bind(this)}></SearchInput>
          <Button text="Search" onClick={this.handleClick.bind(this)}></Button>
        </div>
        <hr className="w-full" />
      </div>
    );
  }
}

export default Search;
