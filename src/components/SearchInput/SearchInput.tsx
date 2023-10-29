import { Component, ChangeEvent } from 'react';
// import { SearchContext } from '../../lib/context';

type SearchInputProps = {
  updateState: (value: string) => void;
  inputValue: string | undefined
};

export default class SearchInput extends Component<SearchInputProps> {
  // static contextType = SearchContext;
  // declare context: React.ContextType<typeof SearchContext>;


  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.updateState(e.target.value);
  };

  render() {
    // const defaultValue = this.context.search;
    return (
      <>
        <input
          className="rounded-full px-4 py-2"
          value={this.props.inputValue}
          onChange={this.handleInput}
        ></input>
      </>
    );
  }
}
