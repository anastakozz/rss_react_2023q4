import { ReactNode } from 'react';

interface ErrorProps {
  children: ReactNode;
}

export default function ErrorMessage({ children }: ErrorProps) {
  return <div className=" absolute text-red-600 text-sm text-center font-normal">{children}</div>;
}
