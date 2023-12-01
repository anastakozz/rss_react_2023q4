import { FormEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { updateCards } from '../store/cardsSlice';
import { validateForm } from './validation/personSchema';
import ErrorMessage from '../components/ErrorMessage';
import BasicInput from '../components/inputComponents/BasicInput';
import SubmitButton from '../components/SubmitButton';
import GenderSelect from '../components/inputComponents/GenderSelect';

const inputClassnames = 'rounded text-black px-4 font-normal';

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

  const termsRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: mailRef.current?.value,
      gender: genderRef.current?.value,
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
        className="mx-auto flex max-w-fit flex-col  gap-6 px-10 pt-10"
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
        <label className="min-w-full">
          <span className="min-w-xl relative mr-4">T&C :</span>
          <input
            className={inputClassnames}
            type="checkbox"
            name="T&C"
            ref={termsRef}
          />
        </label>
        <SubmitButton />
      </form>
    </main>
  );
}

export default StandartForm;
