// import { SearchContext } from '../modules/context';
import { SearchContext } from '../modules/context';
import Button from './Button';
import { ChangeEvent, useContext, useEffect, useState } from 'react';

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
    props.updateData(value);
    localStorage.setItem('pageSize', value);
  };

  useEffect(() => {
    const previousValue = localStorage.getItem('pageSize');
    if (previousValue && previousValue !== context.pageSize) {
      setValue(previousValue);
      props.updateData(previousValue);
    }
  }, [props, context]);

  return (
    <>
      <div className="bg-white rounded-full max-w-fit">
        <input
          className="py-2 px-4 rounded-full focus:outline-none"
          type="number"
          min="1"
          max="30"
          onChange={handleChange}
          value={value}
        ></input>
        <Button text="Send" onClick={handleClick}></Button>
      </div>
    </>
  );
}
