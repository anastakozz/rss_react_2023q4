export interface ButtonProps {
  text: string;
  onClick?: () => void;
  small?: boolean;
  disabled?: boolean;
}

export interface ShowsProps {
  [key: string]: string | string[] | number;
}
