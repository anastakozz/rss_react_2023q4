export interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export interface ContextProps {
  search: string;
}

export interface ShowsProps {
  [key: string]: string | string[] | number;
}
