import React, { ReactNode, useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks';
import InputSuggestions from './InputSuggestions';
import { UseFormRegister } from 'react-hook-form';
import { IFormInput } from '../../../models/interface';

interface HookAutocompleteProps {
  title: string;
  callback: (newValue: string) => void;
  value: string;
  children: ReactNode;
}

const HookAutocomplete = React.forwardRef<
  HTMLInputElement,
  HookAutocompleteProps & ReturnType<UseFormRegister<IFormInput>>
>(({ onChange, onBlur, name, title, callback, value, children }, ref) => {
  const countries = useAppSelector((state) => state.countries);
  const [list, setList] = useState(countries);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (value !== undefined) {
      const newList = countries.filter((item) => {
        return item.includes(value.charAt(0).toUpperCase() + value.slice(1));
      });
      setList(newList);
    }
  }, [value, isOpen, countries, setIsOpen]);

  return (
    <label className="relative w-full">
      <div className="max-w-contain relative block">{title}</div>
      <input
        autoComplete="off"
        className="relative z-20 w-full rounded px-4 font-normal text-black"
        type="text"
        name={name}
        onClick={toggleMenu}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
      {children}
      {isOpen && <InputSuggestions countries={list} updateValue={callback} />}
    </label>
  );
});

export default HookAutocomplete;
