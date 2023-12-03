import { FormEvent, ReactNode, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { updateCards } from '../store/cardsSlice';
import { validateForm } from './validation/validateForm';
import ErrorMessage from '../components/ErrorMessage';
import BasicInput from '../components/inputComponents/Input/BasicInput';
import SubmitButton from '../components/SubmitButton';
import GenderSelect from '../components/inputComponents/Select/GenderSelect';
import { toBase64 } from '../models/utils';
import { getStrength } from './validation/passwordValidation';
import Autocomplete from '../components/inputComponents/Autocomplete/Autocomplete';

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
  const [strength, setStrength] = useState<ReactNode>();

  const repeatRef = useRef<HTMLInputElement | null>(null);
  const [repeatErr, setRepeatErr] = useState<string | undefined>(undefined);

  const termsRef = useRef<HTMLInputElement | null>(null);
  const [termsErr, setTermsErr] = useState<string | undefined>(undefined);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [fileErr, setFileErr] = useState<string | undefined>(undefined);

  const countryRef = useRef<HTMLInputElement | null>(null);
  const [countryErr, setCountryErr] = useState<string | undefined>(undefined);

  const updateCountry = (newValue: string) => {
    if (countryRef.current) {
      countryRef.current.value = newValue;
      countryRef.current.blur();
    }
  };

  const getCountryValue = () => {
    return countryRef?.current?.value;
  };

  const updateStrength = () => {
    if (passwordRef.current) {
      const strength = getStrength(passwordRef.current.value);
      setStrength(strength);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value ? +ageRef.current?.value : undefined,
      email: mailRef.current?.value,
      gender: genderRef.current?.value,
      terms: termsRef.current?.checked,
      password: passwordRef.current?.value,
      repeatedPassword: repeatRef.current?.value,
      picture: fileRef.current?.files,
      country: countryRef.current?.value,
    };

    const { isOk, result } = await validateForm(formData);

    if (isOk && !Array.isArray(result)) {
      const picture = await toBase64(result.picture[0]);
      dispatch(updateCards({ ...result, picture }));
      navigate('/');
    } else if (!isOk && Array.isArray(result)) {
      setNameErr(result.find((err) => err.includes('name')));
      setAgeErr(result.find((err) => err.includes('age')));
      setMailErr(result.find((err) => err.includes('email')));
      setGenderErr(result.find((err) => err.includes('gender')));
      setTermsErr(result.find((err) => err.includes('T&C')));
      setPasswordErr(result.find((err) => err.includes('password')));
      setRepeatErr(result.find((err) => err.includes('match')));
      setFileErr(result.find((err) => err.includes('picture')));
      setCountryErr(result.find((err) => err.includes('country')));
    }
  };

  return (
    <main className="bg-gradient-to-r from-green-200 to-blue-400 pb-8">
      <h1>Uncontrolled Form</h1>
      <Link
        to={'/'}
        className="block text-center transition hover:underline active:scale-95"
      >
        to MainPage
      </Link>
      <form
        autoComplete="off"
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

        <Autocomplete
          title="Country :"
          ref={countryRef}
          callback={updateCountry}
          getValue={getCountryValue}
        >
          {countryErr && <ErrorMessage>{countryErr}</ErrorMessage>}
        </Autocomplete>

        <BasicInput
          type="password"
          ref={passwordRef}
          title="Password :"
          callback={updateStrength}
        >
          {passwordErr && <ErrorMessage>{passwordErr}</ErrorMessage>}
          {<div className="absolute right-0 top-0">{strength}</div>}
        </BasicInput>
        <BasicInput type="password" ref={repeatRef} title="Repeat password :">
          {repeatErr && <ErrorMessage>{repeatErr}</ErrorMessage>}
        </BasicInput>
        <BasicInput
          type="file"
          ref={fileRef}
          title="Image :"
          accept=".png, .jpeg"
          isInline={true}
        >
          {fileErr && <ErrorMessage>{fileErr}</ErrorMessage>}
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
