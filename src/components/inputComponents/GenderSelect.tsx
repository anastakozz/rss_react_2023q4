import React, { ReactNode, LegacyRef } from 'react';

interface GenderSelectProps {
  children: ReactNode;
  title: string;
}

const GenderSelect = React.forwardRef(
  (
    { children, title }: GenderSelectProps,
    ref: LegacyRef<HTMLSelectElement> | undefined
  ) => {
    return (
      <label className="min-w-full">
        <div className="max-w-contain relative block">{title}</div>
        <select
          className="h-[24px] w-full rounded px-4 font-normal text-black"
          ref={ref}
        >
          <option value="not selected">Not selected</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {children}
      </label>
    );
  }
);

export default GenderSelect;
