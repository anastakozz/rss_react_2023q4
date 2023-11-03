import { Button } from './components';

type paginationProps = {
  total: number;
};

export default function Pagination(props: paginationProps) {
  return <Button text={`${props.total}`} />;
}
