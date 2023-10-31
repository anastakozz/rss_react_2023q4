import classNames from 'classnames';
import { ButtonProps } from '../../modules/interfaces';

function Button(props: ButtonProps) {
  return (
    <button
      className={classNames(
        'text-white transition bg-slate-500 hover:bg-slate-400',
        'px-4 py-2 rounded-full min-w-[90px]',
        'active:scale-95'
      )}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;
