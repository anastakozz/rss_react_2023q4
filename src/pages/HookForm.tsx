import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import SubmitButton from '../components/SubmitButton';
import { yupResolver } from '@hookform/resolvers/yup';
import personSchema from './validation/personSchema';
import ErrorMessage from '../components/ErrorMessage';
import { HookGenderSelect } from '../components/inputComponents/GenderSelect';
import { HookInput } from '../components/inputComponents/BasicInput';

interface IFormInput {
  name: string;
  age: number;
  email: string;
  gender: string;
  password: string;
  repeatedPassword?: string | undefined;
  picture: File;
  terms?: boolean | undefined;
}

function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(personSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <main className="bg-gradient-to-r from-blue-200 to-pink-200 pb-8">
      <h1>Hook</h1>
      <Link
        to={'/'}
        className="block text-center transition hover:underline active:scale-95"
      >
        to MainPage
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-4 flex max-w-fit flex-col gap-4 px-10"
      >
        <HookInput type="text" title="Name :" {...register('name')}>
          <ErrorMessage> {errors.name?.message} </ErrorMessage>
        </HookInput>

        <HookInput type="number" title="Age :" {...register('age')}>
          <ErrorMessage> {errors.age?.message} </ErrorMessage>
        </HookInput>

        <HookInput type="text" title="E-mail :" {...register('email')}>
          <ErrorMessage> {errors.email?.message} </ErrorMessage>
        </HookInput>

        <HookGenderSelect title="Gender :" {...register('gender')}>
          <ErrorMessage> {errors.gender?.message} </ErrorMessage>
        </HookGenderSelect>

        <SubmitButton />
      </form>
    </main>
  );
}

export default HookForm;
