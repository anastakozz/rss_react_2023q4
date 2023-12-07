import { ReactNode } from 'react';

interface ErrorProps {
  children: ReactNode;
}

export default function ErrorMessage({ children }: ErrorProps) {
  return (
    <div className=" absolute text-center text-xs font-normal text-red-600">
      {children}
    </div>
  );
}
