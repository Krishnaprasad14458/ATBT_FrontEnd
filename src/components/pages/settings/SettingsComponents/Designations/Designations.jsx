import React from 'react';
import { Link } from 'react-router-dom';

const Designations = () => {
  return (
    <div className=' p-4 bg-[#f8fafc]'>
      <div className='flex justify-between my-2'>
        <p className="text-xl font-semibold">Communication</p>
        <div className='flex justify-end '>

          <Link to="#">
            <button type="submit"
              className="create-btn px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1">Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Designations