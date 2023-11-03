import classNames from 'classnames';
import { ButtonProps } from '../modules/interfaces';

function Button(props: ButtonProps) {
  const width = props.small ? 'min-w-[40px] px-2' : 'min-w-[90px] px-4'
  return (
    <button
      className={classNames(
        'text-white transition bg-slate-500 hover:bg-slate-400',
        ' py-2 rounded-full',
        'active:scale-95', width
      )}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;
