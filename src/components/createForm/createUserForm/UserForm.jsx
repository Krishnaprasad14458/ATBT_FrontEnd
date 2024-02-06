import axios from 'axios'
import React, { useContext, useState } from 'react';
import defprop from '../../../Images/defprof.svg';
import { UserDataContext } from '../../../contexts/usersDataContext/usersDataContext';

function UserForm() {
  const { createUser } = useContext(UserDataContext);
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    phone: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    createUser(userDetails)
  }
  return (
    <div>
      <div className='container p-3 bg-[#f8fafc] '>
        <p className="text-lg font-semibold">New User</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
          <div className="col-span-1 p-3">

            <form className="space-y-3 " method="POST">
              <div>
                <label htmlFor="name" className="block text-sm font-medium  my-1 text-gray-900">Name</label>
                <div className="">
                  <input id="name" name="userName" type="text" autoComplete="userName" required
                    onChange={(e) => setUserDetails((prev) => ({
                      ...prev,
                      userName: e.target.value,
                    }))}
                    className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                </div></div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium  my-1 text-gray-900">Choose Your Photo</label>
                <input
                  type="file"
                  id="fileInput"
                  className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                  accept="image/*"

                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium  my-1 text-gray-900">Email</label>
                <div className="">
                  <input id="email" name="email" type="email" autoComplete="email" required
                    onChange={(e) => setUserDetails((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))}
                    className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                </div></div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium  my-1 text-gray-900">Phone Number</label>
                <div className="">
                  <input id="phone" name="phone" type="tel" autoComplete="phone" required
                    onChange={(e) => setUserDetails((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))}
                    className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                </div></div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium  my-1 text-gray-900">Entity Name</label>
                <div className="">
                  <input id="name" name="entityname" type="text" autoComplete="entityname" required
                    // onChange={(e) => setUserDetails((prev) => ({
                    //   ...prev,
                    //   userName: e.target.value,
                    // }))}
                    className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                </div></div>
              <div>
                <label htmlFor="venue" className="block text-sm my-2  font-medium text-gray-700">Designation</label>
                <div className="relative inline-block text-left w-full">
                  <select className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6">
                    <option value="selected" className="hover:bg-orange-600 text-xs">Select Designation</option>
                    <option value="srdeveloper" className='text-xs'>Developement</option>
                    <option value="jrdeveoper" className='text-xs'>Marketing</option>
                    <option value="intern" className='text-xs'>QA</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="venue" className="block text-sm my-2  font-medium text-gray-700">Role</label>
                <div className="relative inline-block text-left w-full">
                  <select className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6">
                    <option value="selected" className="hover:bg-orange-600 text-xs">Select Role</option>
                    <option value="developer" className='text-xs'> Sr. Developer</option>
                    <option value="jrdeveoper" className='text-xs'>Jr. Developer</option>
                    <option value="intern" className='text-xs'>Intern</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                <div className="">
                  <input id="name" name="userName" type="text" autoComplete="userName" required value={userDetails.userName}
                    onChange={(e) => setUserDetails((prev) => ({
                      ...prev,
                      userName: e.target.value,
                    }))} className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                </div>
              </div> */}
              {/* <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <div className="">
                  <input id="email" name="email" type="email" autoComplete="email" required value={userDetails.email}
                    onChange={(e) => setUserDetails((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))}
                    className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                </div>
              </div> */}
              {/* <div>
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                <div className="">
                  <input id="phone" name="phone" type="tel" autoComplete="phone" required value={userDetails.phone}
                    onChange={(e) => setUserDetails((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))}
                    className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                </div>
              </div> */}
              {/* <div>
                <label htmlFor="designation" className="block text-sm font-medium leading-6 text-gray-900">Designation</label>
                <div className="">
                  <input id="designation" name="designation" type="text" autoComplete="designation" required value={userDetails.designation} onChange={(e) => setUserDetails((prev) => ({
                    ...prev,
                    designation: e.target.value,
                  }))} className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                </div>
              </div> */}

              {/* <div>
                <label htmlFor="designation" className="block text-sm font-medium leading-6 text-gray-900">Select Entity</label>
                <div className="relative inline-block text-left w-full">
                  <select className="block appearance-none p-3 w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div> */}
              <div className=''>
                <button onClick={handleSubmit} type="submit" className="mt-4 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                  Create User
                </button>
              </div>
            </form>
          </div>
          <div className="col-span-2 ">
            <div className='flex justify-center items-center mt-10'>
              <div className='border border-1 w-screen border-gray-200 rounded-md shadow-md bg-[#f8fafc]'>
                <div className='p-5 grid grid-cols-2 gap-4 bg-gray-100'>
                  <div className='col-span-2 flex flex-wrap'>
                    <img className="w-24 h-24 rounded-sm aspect-[1/1] object-cover" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80' alt="Neil image" />
                    <p className="text-xl font-black text-gray-800 mt-8 ms-3">Sri lakshmi{userDetails.userName}</p>
                  </div>
                </div>
                {/* <div className='col-span-2'>
                    <div className='border-t my-3 border-orange-600 border-1'></div>
                  </div> */}
                <div className='grid grid-cols-2 mb-8 shadow-inner opacity-100 justify-between'>
                  <div className='flex my-3 ms-4'>
                    <div className='border-1 p-2 bg-gray-200'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-4.72 4.72a.75.75 0 1 1-1.06-1.06l4.72-4.72h-2.69a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-md text-gray-800 mt-1 ms-3">9966180667 {userDetails.phone}</p>
                  </div>

                  <div className='flex flex-row justify-start my-3 ms-4'>
                    <div className='border-1 p-2 bg-gray-200'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                      </svg>
                    </div>
                    <p className="text-md text-gray-800 mt-1 ms-3">srilaskhmiariveni@gmail.com{userDetails.email}</p>
                  </div>

                  <div className='flex flex-row justify-start my-3 ms-4'>
                    <div className='border-1 p-2 bg-gray-200'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-md text-gray-800 mt-1 ms-3"> Infoz IT</p>
                  </div>


                  <div className='flex  flex-row justify-start my-3 ms-4'>
                    <div className='border-1 p-2 bg-gray-200'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V18a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12Z" clip-rule="evenodd" />
                        <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                      </svg>
                    </div>
                    <p className="text-md text-gray-800 mt-1 ms-3"> Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default UserForm;
