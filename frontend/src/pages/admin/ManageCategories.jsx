import Header from '../../components/common/Provider&AdminHeader';
import AdminSidebar from '../../components/admin/common/AdminSidebar';
import TableSkeleton from '../../components/common/skeltons/TableSkelton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import DataTable from '../../components/admin/common/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Columns3Cog, Hammer, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';
import { getCategories } from '../../redux/slices/categorySlice';
import CategoryAccordion from '../../components/admin/CategoryAccordion';

function ManageCategories() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories());
  }, [])
  const { categories, isLoading } = useSelector(state => state.categorySlice);
  const sortedData = [...categories]?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const headData = ["Title", "Category", "SubCategory", "Provider", "Location", "Starting Price", "Created At", "Status", " Action"]
  return (
    <>
      <Header />
      <main className="flex p-4 pt-0 gap-6">
        <div className="">
          <AdminSidebar />
        </div>

        <section className="h-[calc(100vh-82px)]  w-full m-0 gap-4 p-0">
          <div className='flex justify-between flex-wrap gap-2 items-center px-2'>
            <h2 className="text-sm lg:text-4xl mr-auto text-slate-900  flex items-center gap-2 ">
              <Columns3Cog className="lg:size-8 size-5 text-primary" />
              All Categoires
            </h2>
            {/* <Link to={'/admin/services/new'}> */}
              <Button variant={'outline2'} className={'border border-primary'}> <Plus />Add New Category</Button>
            {/* </Link> */}
          </div>
          <ScrollArea className={'h-[86%] whitespace-nowrap'}>
            {isLoading
              ? (<div className=' px-2'>
                <TableSkeleton headerSkeltonData={headData} />
              </div>)
              : (
                <div className=' px-2 overflow-auto max-w-[calc(100vw-220px-60px)] '>
                 <CategoryAccordion categoryData={sortedData}/>
                </div>
              )}
            
          </ScrollArea>
        </section>
      </main >
    </>
  )
}

export default ManageCategories