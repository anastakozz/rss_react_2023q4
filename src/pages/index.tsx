import {Search, PageSizeSwitch, Pagination, Cards} from "@/components/components"
import { Shows } from "@/modules/types"
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { basicPageSize } from "@/modules/constant"
import { ShowsProps } from "@/modules/interfaces"
import { showsApi } from "@/api/api"
import { apiMethods } from "@/modules/enum"
import { wrapper } from "@/api/store"

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => (async (context) => {
  const { query } = context;
  const { search, size, page, details } = query;

  if (!page) {
    if (context.res) {
      context.res.writeHead(302, { Location: '/?page=1' });
      context.res.end();
    }
  }

  const searchQuery = search?.toString() || '';
  const pageSize = size?.toString() || basicPageSize;
  const currentPage = page?.toString() || '1';

  const showsList = await store.dispatch(showsApi.endpoints.getShowsList.initiate({
    method: apiMethods.showsList,
    params: {
      search: {
        query: searchQuery,
      },
      page: +currentPage,
      pageSize: +pageSize,
    }
  }))
  const shows = showsList.data?.result;

  const showsNumber = await store.dispatch(showsApi.endpoints.getShowsNumber.initiate({
    method: apiMethods.showsNumber,
    params: {
      search: {
        query: searchQuery,
      },
    },
  }))
  const showsTotal = showsNumber.data?.result;
  const pagesTotal = showsTotal ? Math.ceil(showsTotal / +pageSize) : 1;

  const response = details ? await store.dispatch(showsApi.endpoints.getShowData.initiate({
    method: apiMethods.showData,
    params: {
      showId: details.toString(),
      withEpisodes: true,
    }
  })) : undefined;
  const detailsResult = response?.data?.result
  const detailsData = detailsResult ? detailsResult : null;

  return { props: {searchQuery, shows, pagesTotal, currentPage, pageSize, detailsData } }
}) satisfies GetServerSideProps<{
  searchQuery: string,
  shows: Shows | undefined,
  pagesTotal:  number,
  currentPage: string,
  pageSize: string,
  detailsData: ShowsProps | null
}>)

export default function MainPage({searchQuery, shows, pagesTotal, currentPage, pageSize, detailsData}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="bg-slate-700 min-h-screen w-full">
      <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 h-full'>
        <Search search={searchQuery}></Search>
        <section role="results">
          <div className="flex justify-between py-4">
            <PageSizeSwitch size={pageSize}></PageSizeSwitch>
            <Pagination pagesTotal={pagesTotal} page={+currentPage} />
          </div>
          {shows && <Cards shows={shows} details={detailsData} />}
        </section>
      </div>
    </main>
  )
}
