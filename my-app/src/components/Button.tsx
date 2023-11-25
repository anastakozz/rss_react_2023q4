import classNames from 'classnames';
import { ButtonProps } from '../modules/interfaces';

function Button(props: ButtonProps) {
  const width = props.small ? 'min-w-[40px]' : 'min-w-[90px]';
  return (
    <button
      className={classNames(
        'text-white transition bg-slate-500 hover:bg-slate-400',
        'py-2 rounded-full px-4 max-w-fit',
        'active:scale-95',
        'disabled:bg-slate-600 border-2 border-white',
        width
      )}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}

export default Button;
