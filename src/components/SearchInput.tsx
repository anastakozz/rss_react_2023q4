import { ChangeEvent } from 'react';

type SearchInputProps = {
  updateState: (value: string) => void;
  inputValue: string | undefined;
};

export default function SearchInput(props: SearchInputProps) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.updateState(e.target.value);
  };

  return (
    <input
      className="rounded-full px-4 py-2"
      placeholder="input name to search"
      value={props.inputValue}
      onChange={handleInput}
    ></input>
  );
}
