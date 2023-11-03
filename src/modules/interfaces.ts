export interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export interface ContextProps {
  search: string | null;
  pageSize: string | null;
  updateContext?: (newContext: ContextProps) => void;
}

export interface ShowsProps {
  [key: string]: string | string[] | number;
}
