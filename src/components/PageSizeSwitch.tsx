import { SearchContext } from '../modules/context';
import Button from './Button';
import { ChangeEvent, useContext, useState } from 'react';

type Props = {
  updateData: (value: string) => void;
};

export default function PageSizeSwitch(props: Props) {
  const context = useContext(SearchContext);
  const [value, setValue] = useState(context.pageSize);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (value) {
      props.updateData(value);
    }
  };

  return (
    <div className="bg-white rounded-full max-w-fit">
      <input
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
