import * as yup from 'yup';

const personSchema = yup.object({
  name: yup.string().required(),
  age: yup.string().required(),
  email: yup.string().required().email(),
  gender: yup
    .string()
    .test(
      'gender-isOk',
      'gender is not selected',
      (value) => value !== 'not selected'
    ),
});

interface rawData {
  [key: string]: string | undefined;
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
    return {
      result: ['something went wrong'],
      isOk: false,
    };
  }
}
