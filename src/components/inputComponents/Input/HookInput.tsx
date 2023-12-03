import { IFormInput, InputProps } from '../../../models/interface';
import { UseFormRegister } from 'react-hook-form';
import React from 'react';

const HookInput = React.forwardRef<
  HTMLInputElement,
  InputProps & ReturnType<UseFormRegister<IFormInput>>
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

export default HookInput;
