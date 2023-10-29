import { SearchContext } from '../../lib/context';
import { Component, ReactNode } from 'react';
import Button from '../Button';
import SearchInput from '../SearchInput';
import { ContextProps } from '../../lib/interfaces';

type SearchProps = { updateContext: (newContext: ContextProps) => void };

class Search extends Component<SearchProps> {
  static contextType = SearchContext;
  declare context: React.ContextType<typeof SearchContext>;
  state = { newSearch: '', hasError: false };

  updateState(value: string) {
    this.setState({ newSearch: value });
  }

  handleClick() {
    localStorage.setItem('previousSearch', this.state.newSearch);
    const newSearchTrimmed = this.state.newSearch.trim();
    this.props.updateContext({
      search: newSearchTrimmed,
    });
  }

  componentDidUpdate(): void {
    if (this.state.hasError) {
      throw new Error('this is a test Error');
    }
  }

  throwTestError() {
    this.setState({ hasError: true });
  }

  render(): ReactNode {
    return (
      <div>
        <h1 className="text-6xl text-center text-white py-4">
          STARWARS Species
        </h1>
        <div className="flex gap-4 py-4 justify-center">
          <Button
            text="Error"
            onClick={this.throwTestError.bind(this)}
          ></Button>
          <SearchInput updateState={this.updateState.bind(this)}></SearchInput>
          <Button text="Search" onClick={this.handleClick.bind(this)}></Button>
        </div>
        <hr className="w-full" />
      </div>
    );
  }
}

export default Search;
