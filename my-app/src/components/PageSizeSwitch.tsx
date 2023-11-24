import Button from './Button';
import { ChangeEvent, useState } from 'react';
import { firstPage } from '../modules/constant';

export default function PageSizeSwitch() {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
  };

  return (
    <div className="bg-white rounded-full max-w-fit">
      <input
        role="page-size-input"
        className="py-2 px-4 rounded-full focus:outline-none"
        type="number"
        min="1"
        max="30"
        onChange={handleChange}
        value={value ? value : ''}
      ></input>
      <Button text="Set page size" onClick={handleClick}></Button>
    </div>
  );
}
