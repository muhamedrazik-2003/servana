import React from 'react'
import { Card } from '../../components/ui/card'
import {Separator} from "../../components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function AdminDashboard() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-[clamp(2.5rem,8vw,44px)] leading-11  md:leading-18 z-0 mb-2'>Admin Page Not Available Yet </h1>
      <Card className="relative flex flex-col items-center gap-6 p-3 bg-white  shadow-none border-0">

        <Avatar className='size-30'>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>


        <div className="text-center">
          <h4 className="text-2xl font-semibold text-gray-800">Muhamed Razik</h4>
          <p className="text-gray-500 text-sm mb-1">admin@servana.com</p>
          <p className="text-white py-1.5 rounded-3xl bg-primary text-sm">Admin Of Servana</p>
        </div>

      </Card>
      {/* <Separator/ className='my-16' /> */}
    </main>
  )
}

export default AdminDashboard