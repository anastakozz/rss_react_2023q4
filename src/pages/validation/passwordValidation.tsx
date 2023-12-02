export const hasDigits = (value: string) => {
  return (
    value.split('').filter((item) => isNaN(+item / 1) === false).length !== 0
  );
};

export const hasUppercased = (value: string) => {
  return (
    value
      .split('')
      .filter(
        (item) => isNaN(+item / 1) === true && item === item.toUpperCase()
      ).length !== 0
  );
};

export const hasLowercased = (value: string) => {
  return (
    value
      .split('')
      .filter(
        (item) => isNaN(+item / 1) === true && item === item.toLowerCase()
      ).length !== 0
  );
};

export const hasSpecialChar = (value: string) => {
  const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  return specialChars.test(value);
};

export const getStrength = (value: string) => {
  let strength = 0;
  if (hasDigits(value)) {
    strength += 1;
  }

  if (hasLowercased(value)) {
    strength += 1;
  }

  if (hasUppercased(value)) {
    strength += 1;
  }

  if (hasSpecialChar(value)) {
    strength += 1;
  }

  switch (strength) {
    case 1:
      return <span className="text-red-500">poor</span>;
    case 2:
      return <span className="text-orange-300">weak</span>;
    case 3:
      return <span className="text-yellow-200">medium</span>;
    case 4:
      return <span className="text-green-200">strong</span>;

    default:
      return <></>;
  }
};
