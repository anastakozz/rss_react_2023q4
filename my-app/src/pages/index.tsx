import {Search, PageSizeSwitch, Pagination, Cards} from "@/components/components"
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'


export default function MainPage() {
  return (
    <main className="bg-slate-700 min-h-screen w-full">
      <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 h-full'>
        <Search></Search>
        <section role="results">
          <div className="flex justify-between py-4">
            <PageSizeSwitch></PageSizeSwitch>
            <Pagination />
          </div>
          <Cards/>
        </section>
      </div>
    </main>
  )
}
