import { Component } from 'react';

type InputProps = {
  defaultValue: string;
};

export default class SerchInput extends Component<InputProps> {
  render() {
    return (
      <>
        <input
          className="rounded-full px-4 py-2"
          defaultValue={this.props.defaultValue}
        ></input>
      </>
    );
  }
}
