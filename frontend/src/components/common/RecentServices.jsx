import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';

import { Button } from '../ui/button';
import MiniServiceCard from '../provider/common/miniServiceCard';
import SampleTable from '../provider/common/SampleTable';

function RecentServices({ userRole }) {
  const { services, isLoading } = useSelector(state => state.serviceSlice);

  const headData = [
    "Service", "Category", "Provider",
    "Location", "Price", "Status",
    "Created At", "Action"
  ];

  const recentServices = [...services]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 7);

  return (
    <div className={`p-4  row-span-2 ${userRole === "admin" ? "border rounded-3xl max-h-83" : ""}`}>
      {/* Header */}
      <div className='flex items-center justify-between mb-3'>
        <h4 className={`px-2 ${userRole === "admin" ? "text-primary" : "text-accent"}`}>
          Recent Services
        </h4>
        <Link to={userRole === "admin" ? '/admin/services' : '/provider/services'}>
          <Button variant={'outline'} size={'sm'} className='h-6'>
            View Services
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <div className='my-6 flex items-center gap-2'>
          <Loader2 className='size-5 animate-spin' />
          <span>Loading services...</span>
        </div>
      ) : services.length > 0 ? (
        userRole === "admin" ? (
          <div className="overflow-auto scrollbar-none">
            <SampleTable
              headData={headData}
              bodyData={recentServices}
              formMode="services"
            />
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto scrollbar-none">
            {recentServices.map(service => (
              <MiniServiceCard key={service._id} data={service} />
            ))}
          </div>
        )
      ) : (
        <h4 className='my-4 mb-10'>No Services Available Currently</h4>
      )}
    </div>
  );
}

export default RecentServices;
