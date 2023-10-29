import { SearchContext } from '../../lib/context';
import { Component, ReactNode } from 'react';
import Button from '../Button';
import SearchInput from '../SearchInput';
import { ContextProps } from '../../lib/interfaces';

type SearchProps = { updateContext: (newContext: ContextProps) => void };

class Search extends Component<SearchProps> {
  static contextType = SearchContext;
  declare context: React.ContextType<typeof SearchContext>;
  state = { isInitial: true, newSearch: '', hasError: false };

  updateState(value: string) {
    this.setState({ newSearch: value });
  }

  handleClick() {
    const searchItem = this.state.newSearch;
    if (typeof searchItem === 'string') {
      localStorage.setItem('previousSearch', searchItem);
      const newSearchTrimmed = searchItem.trim();
      this.props.updateContext({
        search: newSearchTrimmed,
      });
    }
  }

  throwTestError() {
    this.setState({ hasError: true });
  }

  componentDidMount(): void {
    const previousSearch = localStorage.getItem('previousSearch');

    if (previousSearch) {
      this.props.updateContext({
        search: previousSearch,
      });
    }
  }

  componentDidUpdate(): void {
    if (this.state.hasError) {
      throw new Error('this is a test Error');
    }
    if (this.state.newSearch === '' && this.state.isInitial) {
      this.setState({ newSearch: this.context.search, isInitial: false });
    }
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
          <SearchInput
            updateState={this.updateState.bind(this)}
            inputValue={this.state.newSearch}
          ></SearchInput>
          <Button text="Search" onClick={this.handleClick.bind(this)}></Button>
        </div>
        <hr className="w-full" />
      </div>
    );
  }
}

export default Search;
