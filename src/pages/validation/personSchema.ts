import * as yup from 'yup';
import {
  hasDigits,
  hasUppercased,
  hasLowercased,
  hasSpecialChar,
} from './passwordValidation';

const personSchema = yup.object().shape({
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
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
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
  repeatedPassword: yup
    .string()
    .required('please repeat the password')
    .when('password', ([password], schema) => {
      return schema.test(
        'isMatching',
        'passwords should match',
        (schema) => schema === password
      );
    }),
  picture: yup
    .mixed<FileList>()
    .required('please upload a picture')
    .test('isLoaded', 'please upload a picture', (value) => !!value[0])
    .test(
      'isSizeCorrect',
      'picture size must be equal or less than 1 MB',
      (value) => {
        if (value[0]) {
          const size: number = value[0].size;
          return size <= 1000000;
        }
      }
    )
    .test(
      'extensionIsOK',
      'picture should have an extension jpg or png',
      (value) => {
        if (value[0]) {
          const type: string = value[0].type;
          return type === 'image/jpg' || type === 'image/png';
        }
      }
    ),

  terms: yup
    .boolean()
    .test('terms-isOk', 'you need to accept T&C', (value) => value === true),
});

export default personSchema;
