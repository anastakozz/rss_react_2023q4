import React, { ReactNode, LegacyRef } from 'react';
import { ChangeHandler, UseFormRegister } from 'react-hook-form';

interface GenderSelectProps {
  children: ReactNode;
  title: string;
  name?: string;
  onBlur?: () => void | ChangeHandler;
  onChange?: () => void | ChangeHandler;
}

interface IFormInput {
  name: string;
  age: number;
  email: string;
  gender: string;
  password: string;
  repeatedPassword?: string | undefined;
  picture: File;
  terms?: boolean | undefined;
}


const GenderSelect = React.forwardRef(
  (
    { children, title, name, onBlur, onChange }: GenderSelectProps,
    ref: LegacyRef<HTMLSelectElement> | undefined
  ) => {
    return (
      <label className="min-w-full">
        {title}
        <select
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          className="h-[24px] w-full rounded px-4 font-normal text-black"
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
      <option value="not selected">Not selected</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
    {children}
  </label>
));

export default GenderSelect;
