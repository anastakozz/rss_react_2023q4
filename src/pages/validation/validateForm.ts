import personSchema from './personSchema';
import * as yup from 'yup';
import { rawData } from '../../models/interface';

export async function validateForm(formData: rawData) {
  console.log(formData);
  try {
    const validatedData = await personSchema.validate(formData, {
      abortEarly: false,
    });
    console.log(validatedData);

    const { name, age, gender, email, password, picture } = validatedData;
    const result = {
      name,
      age,
      gender,
      email,
      password,
      picture,
    };

    return { result, isOk: true };
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
