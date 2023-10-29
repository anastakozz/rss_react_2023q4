import classNames from 'classnames';
import { Component, ReactNode } from 'react';
import { ButtonProps } from '../../lib/interfaces';

class Button extends Component<ButtonProps> {
  render(): ReactNode {
    return (
      <button
        className={classNames(
          'text-white transition bg-slate-500 hover:bg-slate-400',
          'px-4 py-2 rounded-full min-w-[90px]',
          'active:scale-95'
        )}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}

export default Button;
