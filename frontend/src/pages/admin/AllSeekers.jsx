import React, { useEffect } from 'react'
import Header from '../../components/common/Provider&AdminHeader';
import AdminSidebar from '../../components/admin/common/AdminSidebar';
import TableSkeleton from '../../components/skeltons/TableSkelton';
import { ScrollArea } from '@/components/ui/scroll-area';
import DataTable from '../../components/admin/common/DataTable';
import { UserRoundSearch } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSeekers } from '../../redux/slices/userSlice';

function AllSeekers() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllSeekers());
  }, [])
  // const {services} = useSelector(state=> state.serviceSlice);
  const { seekers, isSeekerLoading } = useSelector(state => state.userSlice);
  const sortedData = [...seekers]?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const headData = ["Full Name", "Email", "Phone", "Joined On", "Total Bookings", "verification", "Status", " Action"]
  return (
    <>
      <Header />
      <main className="flex p-4 pt-0 gap-6">
        <div className="">
          <AdminSidebar />
        </div>

        <section className="h-[calc(100vh-82px)]  w-full m-0 gap-4 p-0 overflow-hidden">
          <div className='flex justify-between flex-wrap gap-2 items-center px-2'>
            <h2 className="text-sm lg:text-4xl mr-auto text-slate-900  flex items-center gap-2 ">
              <UserRoundSearch className="lg:size-8 size-5 text-primary" />
              All Customers
            </h2>
            {/* <button>Add Customer</button> */}
            {/* <AddStudent setPageReload={setPageReload} /> */}
          </div>
          <ScrollArea className={'h-[86%] whitespace-nowrap'}>
            {isSeekerLoading
              ? (<div className=' px-2'>
                <TableSkeleton headerSkeltonData={headData} />
              </div>)
              : sortedData.length > 0
                ? (
                  <div className=' px-2 overflow-auto max-w-[calc(100vw-220px-60px)]'>
                    <DataTable headData={headData} rowData={sortedData} tableFormat={"seeker"} />
                  </div>
                )
                : <h2 className='text-center py-20 text-xl lg:text-3xl leading-6 lg:leading-10'>Failed to Retrive All Seekers From Server at the moment.<br /> plase Try again Later</h2>

            }

          </ScrollArea>
        </section>
      </main >
    </>
  )
}

export default AllSeekers