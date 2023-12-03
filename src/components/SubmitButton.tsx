import classNames from 'classnames';

export default function SubmitButton() {
  return (
    <button
      className={classNames(
        ' text-bold max-w-fit rounded bg-gradient-to-r from-pink-500 to-yellow-500 ',
        ' mt-4 px-8 py-2 transition',
        ' hover:scale-[105%] hover:scale-[105%] active:scale-95 active:scale-95 '
      )}
      type="submit"
    >
      Submit
    </button>
  );
}