import { useAppSelector, useAppDispatch } from '../hooks';
import { updatePageSize } from '../store/pageSizeSlice';
import Button from './Button';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firstPage } from '../modules/constant';

export default function PageSizeSwitch() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pageSize = useAppSelector((state) => state.pageSize.pageSize);
  const [value, setValue] = useState(pageSize);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (value) {
      dispatch(updatePageSize(value));
      navigate(firstPage);
    }
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
