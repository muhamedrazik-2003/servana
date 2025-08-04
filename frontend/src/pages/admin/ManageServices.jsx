import Header from '../../components/common/Provider&AdminHeader';
import AdminSidebar from '../../components/admin/common/AdminSidebar';
import TableSkeleton from '../../components/common/skeltons/TableSkelton';
import { ScrollArea } from '@/components/ui/scroll-area';
import DataTable from '../../components/admin/common/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllServices } from '../../redux/slices/serviceSlice';
import { Hammer } from 'lucide-react';

function ManageServices() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllServices());
  }, [])
  const { services, isLoading } = useSelector(state => state.serviceSlice);
  const headData = ["Title", "Category", "SubCategory","Provider", "Location", "Starting Price", "Created At", "Status", " Action"]
  return (
    <>
      <Header />
      <main className="flex p-4 pt-0 gap-6">
        <div className="">
          <AdminSidebar />
        </div>

        <section className="h-[calc(100vh-82px)]  w-full m-0 gap-4 p-0 overflow-hidden">
          <div className='flex justify-between flex-wrap gap-2 items-center px-7'>
            <h2 className="text-sm lg:text-4xl mr-auto text-slate-900  flex items-center gap-2 ">
              <Hammer className="lg:size-8 size-5 text-primary" />
              All Services
            </h2>
            {/* <button>Add Customer</button> */}
            {/* <AddStudent setPageReload={setPageReload} /> */}
          </div>
          <ScrollArea className={'h-[86%]'}>
            {isLoading
              ? (<div className=' px-6'>
                <TableSkeleton headerSkeltonData={headData} />
              </div>)
              : (
                <div className=' px-6'>
                  <DataTable headData={headData} rowData={services} tableFormat={"service"} />
                </div>
              )}
          </ScrollArea>
        </section>
      </main >
    </>
  )
}

export default ManageServices