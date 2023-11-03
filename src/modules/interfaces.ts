export interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export interface ContextProps {
  search: string;
  pageSize: string;
  updateContext?: (newContext: ContextProps) => void;
}

export interface ShowsProps {
  [key: string]: string | string[] | number;
}
