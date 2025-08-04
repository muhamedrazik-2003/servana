import React from 'react'
import Header from '../../components/common/Provider&AdminHeader';
import AdminSidebar from '../../components/admin/common/AdminSidebar';
import TableSkeleton from '../../components/common/skeltons/TableSkelton';
import { ScrollArea } from '@/components/ui/scroll-area';
import DataTable from '../../components/admin/common/DataTable';

function ManageBookings() {
  const headData = ["Full Name", "Email", "Phone", "Joined On", "Total Bookings", "Status"," Action"]
  return (
    <>
      <Header />
      <main className="flex p-4 pt-0 gap-6">
        {/* Sidebar */}
        <div className="">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <section className="h-[calc(100vh-82px)]  grid grid-cols-2  w-full m-0 gap-4 p-0 overflow-hidden">
          <div className='flex justify-between flex-wrap gap-2 items-center mt-6 px-7 pb-2'>
            <h2 className="md:text-[20px] text-sm mr-auto font-semibold text-slate-900  flex items-center gap-2 ">
              <Users className="md:size-5.5 size-5 text-primary" />
              All Students
            </h2>
            <button>Add Student</button>
            {/* <AddStudent setPageReload={setPageReload} /> */}
          </div>
          <ScrollArea className={'h-[75%]'}>
            {isLoading
              ? (<div className=' px-6'>
                <TableSkeleton headerSkeltonData={headerData} />
              </div>)
              : (
                <div className=' px-6'>
                  {/* <DataTable headData={headData} /> */}
                </div>
              )}
          </ScrollArea>
        </section>
      </main >
    </>
  )
}

export default ManageBookings