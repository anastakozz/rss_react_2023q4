import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import SubmitButton from '../components/SubmitButton';
import { yupResolver } from '@hookform/resolvers/yup';
import personSchema from './validation/personSchema';
import ErrorMessage from '../components/ErrorMessage';
import { HookGenderSelect } from '../components/inputComponents/GenderSelect';
import { HookInput } from '../components/inputComponents/BasicInput';
import { useAppDispatch } from '../hooks';
import { toBase64 } from '../models/utils';
import { updateCards } from '../store/cardsSlice';
import { IFormInput } from '../models/interface';
import { useState, ReactNode, useEffect } from 'react';
import { getStrength } from './validation/passwordValidation';

function HookForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [strength, setStrength] = useState<ReactNode>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(personSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const picture = await toBase64(data.picture[0]);
    dispatch(updateCards({ ...data, picture }));
    navigate('/');
  };
  const watchPassword = watch('password');

  useEffect(() => {
    if (watchPassword) {
      const strength = getStrength(watchPassword);
      setStrength(strength);
    }
  }, [watchPassword]);

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

        <HookInput type="password" title="Password :" {...register('password')}>
          <ErrorMessage> {errors.password?.message} </ErrorMessage>
          {<div className="absolute right-0 top-0">{strength}</div>}
        </HookInput>

        <HookInput
          type="password"
          title="Repeat password :"
          {...register('repeatedPassword')}
        >
          <ErrorMessage> {errors.repeatedPassword?.message} </ErrorMessage>
        </HookInput>

        <HookInput
          type="file"
          title="Image :"
          {...register('picture')}
          accept=".png, .jpeg"
          isInline={true}
        >
          <ErrorMessage> {errors.picture?.message} </ErrorMessage>
        </HookInput>

        <HookInput
          type="checkbox"
          title="T&C :"
          {...register('terms')}
          isInline={true}
        >
          <ErrorMessage> {errors.terms?.message} </ErrorMessage>
        </HookInput>

        <SubmitButton />
      </form>
    </main>
  );
}

export default HookForm;
