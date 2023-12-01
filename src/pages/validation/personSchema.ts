import * as yup from 'yup';

const personSchema = yup.object({
  name: yup
    .string()
    .required()
    .test(
      'isCapitalized',
      'first letter of name should be uppercased',
      (value) => {
        if (value[0]) {
          return value[0] === value[0].toUpperCase();
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
  terms: yup
    .boolean()
    .test('terms-isOk', 'you need to accept T&C', (value) => value === true),
});

interface rawData {
  [key: string]: string | number | undefined | boolean;
}

export async function validateForm(formData: rawData) {
  console.log(formData);
  try {
    const validatedData = await personSchema.validate(formData, {
      abortEarly: false,
    });
    console.log(validatedData);

    return { result: validatedData, isOk: true };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      console.log(err.errors);
      return {
        result: err.errors,
        isOk: false,
      };
    }
    console.log(err);
    return {
      result: ['something went wrong'],
      isOk: false,
    };
  }
}
