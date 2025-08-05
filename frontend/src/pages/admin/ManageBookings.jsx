import React, { useEffect } from 'react'
import Header from '../../components/common/Provider&AdminHeader';
import AdminSidebar from '../../components/admin/common/AdminSidebar';
import TableSkeleton from '../../components/common/skeltons/TableSkelton';
import { ScrollArea } from '@/components/ui/scroll-area';
import DataTable from '../../components/admin/common/DataTable';
import { getAllBookings } from '../../redux/slices/bookingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarClock } from 'lucide-react';

function ManageBookings() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllBookings());
  }, [])
  const {bookings, isLoading} = useSelector(state => state.bookingSlice);
  const  sortedData = [...bookings]?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  const headData = ['ID', 'Customer', 'Provider', "Service", "Price", "Date", "Status", "Payment", "Actions"]
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
              <CalendarClock className="lg:size-8 size-5 text-primary" />
              All Bookings
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
                <div className='px-2 overflow-auto max-w-[calc(100vw-220px-60px)]'>
                  <DataTable headData={headData} rowData={sortedData} tableFormat={"booking"} />
                </div>
              )}
          </ScrollArea>
        </section>
      </main >
    </>
  )
}

export default ManageBookings