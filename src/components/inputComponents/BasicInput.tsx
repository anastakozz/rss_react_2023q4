import React, { ReactNode, LegacyRef } from 'react';

interface BasicInputProps {
  children: ReactNode;
  title: string;
  type: string;
}

const BasicInput = React.forwardRef(
  (
    { children, title, type }: BasicInputProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <label>
        <div className="max-w-contain relative block">{title}</div>
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
