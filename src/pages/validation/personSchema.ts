import * as yup from 'yup';
import {
  hasDigits,
  hasUppercased,
  hasLowercased,
  hasSpecialChar,
} from './passwordValidation';

const personSchema = yup.object({
  name: yup
    .string()
    .required()
    .test(
      'isCapitalized',
      'first letter of name should be uppercased',
      (value) => {
        if (value[0]) {
          return (
            isNaN(+value[0] / 1) === true && value[0] === value[0].toUpperCase()
          );
        }
      }
    ),
  age: yup
    .number()
    .required()
    .test('isNonNegative', 'age should be non-negative', (value) => value >= 0),
  email: yup.string().required().email(),
  gender: yup
    .string()
    .required()
    .test(
      'gender-isOk',
      'gender is not selected',
      (value) => value !== 'not selected'
    ),
  password: yup
    .string()
    .required()
    .test(
      'hasDigits',
      'password should contain at least 1 digit',
      (value) => hasDigits(value) === true
    )
    .test(
      'hasUppercased',
      'password should contain at least 1 uppercased letter',
      (value) => hasUppercased(value) === true
    )
    .test(
      'hasLowercased',
      'password should contain at least 1 lowercased letter',
      (value) => hasLowercased(value) === true
    )
    .test(
      'hasSpecialChar',
      'password should contain at least 1 special character',
      (value) => hasSpecialChar(value) === true
    ),
  repeatedPassword: yup.string().when('password', ([password], schema) => {
    return schema.test(
      'isMatching',
      'passwords should match',
      (schema) => schema === password
    );
  }),
  terms: yup
    .boolean()
    .test('terms-isOk', 'you need to accept T&C', (value) => value === true),
});

export default personSchema;
