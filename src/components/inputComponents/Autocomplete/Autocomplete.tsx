import React, { ReactNode, useState } from 'react';
import { useAppSelector } from '../../../hooks';
import InputSuggestions from './InputSuggestions';

interface AutocompleteProps {
  title: string;
  callback: (newValue: string) => void;
  getValue: () => string | undefined;
  children: ReactNode;
}

const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ title, callback, getValue, children }, ref) => {
    const countries = useAppSelector((state) => state.countries);
    const [list, setList] = useState(countries);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const filterList = () => {
      if (!isOpen) toggleMenu();
      const value = getValue();
      if (value !== undefined) {
        const newList = countries.filter((item) => {
          return item.includes(value.charAt(0).toUpperCase() + value.slice(1));
        });
        setList(newList);
      }
    };

    return (
      <label className="relative w-full">
        <div className="max-w-contain relative block">{title}</div>
        <input
          autoComplete="off"
          className="relative z-20 w-full rounded px-4 font-normal text-black"
          type="text"
          onFocus={toggleMenu}
          onChange={filterList}
          ref={ref}
        />
        {children}
        {isOpen && <InputSuggestions countries={list} updateValue={callback} />}
      </label>
    );
  }
);

export default Autocomplete;
