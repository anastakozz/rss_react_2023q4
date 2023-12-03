import React, { ReactNode } from 'react';
import { Options } from './SelectOptions';
import { UseFormRegister } from 'react-hook-form';
import { IFormInput } from '../../../models/interface';

const HookGenderSelect = React.forwardRef<
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

export default HookGenderSelect;
