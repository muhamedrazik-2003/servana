import React, { useEffect } from 'react'
import Header from '../../components/common/Provider&AdminHeader';
import AdminSidebar from '../../components/admin/common/AdminSidebar';
import TableSkeleton from '../../components/common/skeltons/TableSkelton';
import { ScrollArea } from '@/components/ui/scroll-area';
import DataTable from '../../components/admin/common/DataTable';
import { UserRoundSearch } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSeekers } from '../../redux/slices/userSlice';

function AllSeekers() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllSeekers());
  },[])
const {services} = useSelector(state=> state.serviceSlice);
  const {seekers, isSeekerLoading} = useSelector(state => state.userSlice) ;
  const headData = ["Full Name", "Email", "Phone", "Joined On", "Total Bookings", "verification", "Status"," Action"]
  return (
    <>
      <Header />
      <main className="flex p-4 pt-0 gap-6">
        {/* Sidebar */}
        <div className="">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <section className="h-[calc(100vh-82px)]  w-full m-0 gap-4 p-0 overflow-hidden">
          <div className='flex justify-between flex-wrap gap-2 items-center mt-6 px-7 pb-2'>
            <h2 className="md:text-[20px] text-sm mr-auto font-semibold text-slate-900  flex items-center gap-2 ">
              <UserRoundSearch className="md:size-5.5 size-5 text-primary" />
              All Customers
            </h2>
            <button>Add Customer</button>
            {/* <AddStudent setPageReload={setPageReload} /> */}
          </div>
          <ScrollArea className={'h-[75%]'}>
            {isSeekerLoading
              ? (<div className=' px-6'>
                <TableSkeleton headerSkeltonData={headData} />
              </div>)
              : (
                <div className=' px-6'>
                  <DataTable headData={headData} rowData={seekers} tableFormat={"seeker"} />
                </div>
              )}
          </ScrollArea>
        </section>
      </main >
    </>
  )
}

export default AllSeekers