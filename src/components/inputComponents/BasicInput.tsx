import React, { ReactNode, LegacyRef } from 'react';

interface BasicInputProps {
  children: ReactNode;
  title: string;
  type: string;
  isInline?: boolean;
}

const BasicInput = React.forwardRef(
  (
    { children, title, type, isInline }: BasicInputProps,
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
          className="rounded px-4 font-normal text-black"
          type={type}
          ref={ref}
        />
        {children}
      </label>
    );
  }
);

export default BasicInput;
