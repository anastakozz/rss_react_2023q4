import React, { ReactNode, LegacyRef } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IFormInput } from '../../models/interface';

interface GenderSelectProps {
  children: ReactNode;
  title: string;
  name?: string;
}

const Options = () => {
  return (
    <>
      <option value="not selected">Not selected</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </>
  );
};

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

export const HookGenderSelect = React.forwardRef<
  HTMLSelectElement,
  { title: string; children?: ReactNode } & ReturnType<
    UseFormRegister<IFormInput>
  >
>(({ onChange, onBlur, name, title, children }, ref) => (
  <label className="min-w-full">
    {title}
    <select
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      className="h-[24px] w-full rounded px-4 font-normal text-black"
    >
      <Options />
    </select>
    {children}
  </label>
));

export default GenderSelect;
