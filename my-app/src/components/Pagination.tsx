import { Button } from './components';
import { useRouter } from 'next/router';

type PaginationProps = {
  pagesTotal: number,
  page: number
}

export default function Pagination({pagesTotal, page}: PaginationProps) {
  const router = useRouter()
  const currentUrl = router.pathname;
  const currentQuery = { ...router.query };
  const isLoading = false;

  const handleClick = (newPage: number) => {
    currentQuery['page'] = `${newPage}`;
    router.push({pathname: currentUrl,
    query: currentQuery},)
  };

  return (
    !isLoading && (
      <div role="pagination" className="flex gap-4">
        <Button
          text={'Prev'}
          small={true}
          disabled={page === 1}
          onClick={() => {
            handleClick(page - 1);
          }}
        ></Button>
        <div className="py-2 rounded-full bg-white px-4">
          page {page} of {pagesTotal}
        </div>
        <Button
          text={'Next'}
          small={true}
          onClick={() => {
            handleClick(page + 1);
          }}
          disabled={page === pagesTotal}
        ></Button>
      </div>
    )
  );
}
