import React from 'react'
import Header from '../../components/common/Provider&AdminHeader';
import AdminSidebar from '../../components/admin/common/AdminSidebar';

function ManageServices() {
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
          {/* <h1 className="m-0 text-2xl">Welcome <span className="text-primary">{user?.fullName}</span>, Today is {DateToday}</h1> */}

          <div className='space-y-4'>
            <div className='flex items-center justify-end gap-3 px-4'>
              <h1>Welcome</h1>
            </div>
          </div>

        </section>
      </main >
    </>
  )
}

export default ManageServices