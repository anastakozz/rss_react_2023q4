import { Component, ChangeEvent } from 'react';

type SearchInputProps = {
  updateState: (value: string) => void;
  inputValue: string | undefined;
};

export default class SearchInput extends Component<SearchInputProps> {
  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.updateState(e.target.value);
  };

  render() {
    return (
      <input
        className="rounded-full px-4 py-2"
        placeholder="input name to search"
        value={this.props.inputValue}
        onChange={this.handleInput}
      ></input>
    );
  }
}
