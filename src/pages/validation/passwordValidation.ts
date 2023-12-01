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
    console.log(value
        .split('')
        .filter(
          (item) => isNaN(+item / 1) === true && item === item.toLowerCase()
        ).length !== 0)
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
