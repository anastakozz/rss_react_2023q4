import React, { ReactNode } from 'react';
import { IFormInput } from '../../models/interface';
import { UseFormRegister } from 'react-hook-form';

interface BasicInputProps {
  children: ReactNode;
  title: string;
  type: string;
  accept?: string;
  isInline?: boolean;
  callback?: () => void;
}

const BasicInput = React.forwardRef<HTMLInputElement, BasicInputProps>(
  ({ children, title, type, isInline, accept, callback }, ref) => (
    <label className={(isInline ? 'min-w-full' : '') + 'relative'}>
      {isInline ? (
        <span className="min-w-xl relative mr-4">{title}</span>
      ) : (
        <div className="max-w-contain relative block">{title}</div>
      )}

      <input
        onChange={callback}
        className={
          'rounded px-4 font-normal text-black file:rounded file:border-white file:bg-white file:text-sm file:transition file:hover:bg-green-200' +
          (isInline ? ' mt-2 max-w-[230px] ' : ' w-full')
        }
        type={type}
        ref={ref}
        accept={accept}
      />
      {children}
    </label>
  )
);

export default BasicInput;

export const HookInput = React.forwardRef<
  HTMLInputElement,
  BasicInputProps & ReturnType<UseFormRegister<IFormInput>>
>(
  (
    { onChange, onBlur, name, title, children, isInline, type, accept },
    ref
  ) => (
    <label className={(isInline ? 'min-w-full' : '') + 'relative'}>
      {isInline ? (
        <span className="min-w-xl relative mr-4">{title}</span>
      ) : (
        <div className="max-w-contain relative block">{title}</div>
      )}

      <input
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        className={
          'rounded px-4 font-normal text-black file:rounded file:border-white file:bg-white file:text-sm file:transition file:hover:bg-green-200' +
          (isInline ? ' mt-2 max-w-[230px] ' : ' w-full')
        }
        type={type}
        ref={ref}
        accept={accept}
      />
      {children}
    </label>
  )
);
