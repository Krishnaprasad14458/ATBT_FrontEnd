import React from 'react';
import { Link } from 'react-router-dom';
const Error401 = () => {
  document.title = 'ATBT | 401';
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='border-2 border-gray-100 px-10 py-2 sm:px-20 sm:py-5 md:px-40 md:py-10 shadow-md  rounded-md'>
        <div className='flex justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-orange-600'
          >
            <path
              fill-rule='evenodd'
              d='M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z'
              clip-rule='evenodd'
            />
          </svg>
        </div>
        <div className='text-4xl sm:text-6xl md:text-8xl text-center text-orange-600 font-light mt-1 sm:mt-3 md:mt-5'>
          401
        </div>
        <div className='text-lg sm:text-2xl md:text-3xl text-center text-orange-600  sm:mt-1 md:mt-3'>
          Unauthorized
        </div>
        <div className='text-sm sm:text-md md:text-md text-center text-orange-600  sm:mt-1 md:mt-2'>
          Your not authorized to access this page.
        </div>
        <div className='flex justify-center mt-3 sm:mt-4 md:mt-6'>
          <Link to='/'>
            <button className='border border-1 border-gray-100 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-orange-600 text-white rounded-md'>
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error401;
