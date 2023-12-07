interface props {
  countries: string[];
  updateValue: (newValue: string) => void;
}

const InputSuggestions = ({ countries, updateValue }: props) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target;
    if (target instanceof HTMLElement) {
      const value = target.textContent;
      value && updateValue(value);
    }
  };

  return (
    <div className="absolute z-10 max-h-[150px] w-full  overflow-scroll rounded bg-black/90 py-1 font-normal">
      {countries.map((item, index) => {
        return (
          <div
            key={index}
            onClick={handleClick}
            className="cursor-pointer  px-4 transition hover:bg-orange-500 active:bg-orange-200"
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default InputSuggestions;
