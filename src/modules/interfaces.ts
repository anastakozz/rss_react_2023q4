export interface ButtonProps {
  text: string;
  onClick?: () => void;
  small?: boolean;
  disabled?: boolean;
}

export interface ContextProps {
  search: string | null;
  pageSize: string | null;
}

export interface ShowsProps {
  [key: string]: string | string[] | number;
}
