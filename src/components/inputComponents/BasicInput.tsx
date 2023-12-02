import React, { ReactNode, LegacyRef } from 'react';

interface BasicInputProps {
  children: ReactNode;
  title: string;
  type: string;
  accept?: string;
  isInline?: boolean;
}

const BasicInput = React.forwardRef(
  (
    { children, title, type, isInline, accept }: BasicInputProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <label className={isInline ? 'min-w-full' : ''}>
        {isInline ? (
          <span className="min-w-xl relative mr-4">{title}</span>
        ) : (
          <div className="max-w-contain relative block">{title}</div>
        )}

        <input
          className={
            'rounded px-4 font-normal text-black file:rounded file:border-white file:bg-white file:transition file:hover:bg-green-200 ' +
            (isInline ? ' mt-2' : ' w-full')
          }
          type={type}
          ref={ref}
          accept={accept}
        />
        {children}
      </label>
    );
  }
);

export default BasicInput;
