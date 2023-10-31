import { SearchContext } from '../../modules/context';
import { Component, ReactNode } from 'react';
import Button from '../Button';
import SearchInput from '../SearchInput';
import { ContextProps } from '../../modules/interfaces';

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
    const newSearchTrimmed = searchItem.trim();
    localStorage.setItem('previousSearch', newSearchTrimmed);
    this.props.updateContext({
      search: newSearchTrimmed,
    });
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
    const { hasError, newSearch, isInitial } = this.state;

    if (hasError) {
      throw new Error('this is a test Error');
    }
    if (newSearch === '' && isInitial) {
      this.setState({ newSearch: this.context.search, isInitial: false });
    }
  }

  render(): ReactNode {
    return (
      <section>
        <div className="flex gap-4 py-4 justify-center">
          <Button
            text="Error"
            onClick={() => {
              this.throwTestError();
            }}
          ></Button>
          <SearchInput
            updateState={this.updateState.bind(this)}
            inputValue={this.state.newSearch}
          ></SearchInput>
          <Button text="Search" onClick={this.handleClick.bind(this)}></Button>
        </div>
        <hr className="w-full" />
      </section>
    );
  }
}

export default Search;
