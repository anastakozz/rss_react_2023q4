import { FormEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { updateCards } from '../store/cardsSlice';
import { validateForm } from './validation/validateForm';
import ErrorMessage from '../components/ErrorMessage';
import BasicInput from '../components/inputComponents/BasicInput';
import SubmitButton from '../components/SubmitButton';
import GenderSelect from '../components/inputComponents/GenderSelect';

function StandartForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const [nameErr, setNameErr] = useState<string | undefined>(undefined);

  const ageRef = useRef<HTMLInputElement | null>(null);
  const [ageErr, setAgeErr] = useState<string | undefined>(undefined);

  const mailRef = useRef<HTMLInputElement | null>(null);
  const [mailErr, setMailErr] = useState<string | undefined>(undefined);

  const genderRef = useRef<HTMLSelectElement | null>(null);
  const [genderErr, setGenderErr] = useState<string | undefined>(undefined);

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [passwordErr, setPasswordErr] = useState<string | undefined>(undefined);

  const repeatPasswordRef = useRef<HTMLInputElement | null>(null);
  const [repeatPasswordErr, setRepeatPasswordErr] = useState<
    string | undefined
  >(undefined);

  const termsRef = useRef<HTMLInputElement | null>(null);
  const [termsErr, setTermsErr] = useState<string | undefined>(undefined);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value ? +ageRef.current?.value : undefined,
      email: mailRef.current?.value,
      gender: genderRef.current?.value,
      terms: termsRef.current?.checked,
      password: passwordRef.current?.value,
      repeatedPassword: repeatPasswordRef.current?.value,
    };

    const { isOk, result } = await validateForm(formData);

    if (isOk && !Array.isArray(result)) {
      dispatch(updateCards(result));
      navigate('/');
    } else if (!isOk && Array.isArray(result)) {
      setNameErr(result.find((err) => err.includes('name')));
      setAgeErr(result.find((err) => err.includes('age')));
      setMailErr(result.find((err) => err.includes('email')));
      setGenderErr(result.find((err) => err.includes('gender')));
      setTermsErr(result.find((err) => err.includes('T&C')));
      setPasswordErr(result.find((err) => err.includes('password')));
      setRepeatPasswordErr(result.find((err) => err.includes('match')));
    }
  };

  return (
    <main className="bg-gradient-to-r from-green-200 to-blue-400">
      <h1>Uncontrolled Form</h1>
      <Link
        to={'/'}
        className="block text-center transition hover:underline active:scale-95"
      >
        to MainPage
      </Link>
      <form
        className="mx-auto mt-4 flex max-w-fit  flex-col gap-4 px-10"
        onSubmit={handleSubmit}
      >
        <BasicInput type="text" ref={nameRef} title="Name :">
          {nameErr && <ErrorMessage>{nameErr}</ErrorMessage>}
        </BasicInput>
        <BasicInput type="number" ref={ageRef} title="Age :">
          {ageErr && <ErrorMessage>{ageErr}</ErrorMessage>}
        </BasicInput>
        <BasicInput type="text" ref={mailRef} title="E-mail :">
          {mailErr && <ErrorMessage>{mailErr}</ErrorMessage>}
        </BasicInput>
        <GenderSelect ref={genderRef} title="Gender :">
          {genderErr && <ErrorMessage>{genderErr}</ErrorMessage>}
        </GenderSelect>
        <BasicInput type="text" ref={passwordRef} title="Password :">
          {passwordErr && <ErrorMessage>{passwordErr}</ErrorMessage>}
        </BasicInput>
        <BasicInput
          type="password"
          ref={repeatPasswordRef}
          title="Repeat password :"
        >
          {repeatPasswordErr && (
            <ErrorMessage>{repeatPasswordErr}</ErrorMessage>
          )}
        </BasicInput>
        <BasicInput
          type="checkbox"
          ref={termsRef}
          title="T&C :"
          isInline={true}
        >
          {termsErr && <ErrorMessage>{termsErr}</ErrorMessage>}
        </BasicInput>
        <SubmitButton />
      </form>
    </main>
  );
}

export default StandartForm;
