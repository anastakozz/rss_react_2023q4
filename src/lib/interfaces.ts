export interface SpecieProps {
  [key: string]: string | string[];
}

export interface ButtonProps {
  text: string;
  onClick?: () => void;
}
