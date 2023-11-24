import Button from './Button';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { queryKeys } from '@/modules/enum';

type pageSizeProps = {
  size: string
}

export default function PageSizeSwitch({size}: pageSizeProps) {
  const router = useRouter()
  const currentUrl = router.pathname;
  const currentQuery = { ...router.query };

  const [value, setValue] = useState(size);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    currentQuery[queryKeys.pageSize] = value;
    router.push({pathname: currentUrl,
    query: currentQuery},)
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
