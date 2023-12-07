import React, { ReactNode, LegacyRef } from 'react';
import { Options } from './SelectOptions';

interface GenderSelectProps {
  children: ReactNode;
  title: string;
  name?: string;
}

const GenderSelect = React.forwardRef(
  (
    { children, title, name }: GenderSelectProps,
    ref: LegacyRef<HTMLSelectElement> | undefined
  ) => {
    return (
      <label className="min-w-full">
        {title}
        <select
          name={name}
          ref={ref}
          className="h-[24px] w-full rounded px-4 font-normal text-black"
        >
          <Options />
        </select>
        {children}
      </label>
    );
  }
);

export default GenderSelect;
