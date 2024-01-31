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
                <label htmlFor="venue" className="block text-sm my-2  font-medium text-gray-700">Department</label>
                <div className="relative inline-block text-left w-full">
                  <select className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6">
                    <option value="selected" className="hover:bg-orange-600">Select Department</option>
                    <option value="srdeveloper">Developement</option>
                    <option value="jrdeveoper">Marketing</option>
                    <option value="intern">QA</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="venue" className="block text-sm my-2  font-medium text-gray-700">Designation</label>
                <div className="relative inline-block text-left w-full">
                  <select className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6">
                    <option value="selected" className="hover:bg-orange-600">Select Designation</option>
                    <option value="developer"> Sr. Developer</option>
                    <option value="jrdeveoper">Jr. Developer</option>
                    <option value="intern">Intern</option>
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
                <button onClick={handleSubmit} type="submit" className="mt-4 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                  Create User
                </button>
              </div>
            </form>
          </div>
          <div className="col-span-2 ">

            <div className='flex justify-center items-center mt-10'>
              <div className='flex justify-center items-center  w-4/6 h-[200px] border border-1 border-gray-200 rounded-md p-2 shadow-md bg-[#f8fafc]'>
                <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3  gap-8'>
                  <div className='col-span-1'>
                    <img class=" rounded-lg " src={defprop} alt="Neil image" />
                  </div>
                  <div className='col-span-2'>
                    <p class="text-lg font-black text-gray-800 ">{userDetails.userName}</p>
                    <p class="text-md text-gray-700 mt-2"> {userDetails.email}</p>
                    <p class="text-md text-gray-700 mt-1"> {userDetails.phone}</p>
                    <p class="text-md text-gray-700 mt-1"> Infoz IT</p>
                    <p class="text-md text-gray-700 mt-1"> Developer</p>
                    <p class="text-md text-gray-700 mt-1"> Jr.Software Developer</p>



                  </div>
                </div>
              </div>
            </div>
            {/* <div className="rounded-md overflow-hidden shadow-md">
              <div className="p-4">
                <h2 className="text-md text-gray-800">User Details</h2>
                <h3 className="text-md text-gray-800">Name: {userDetails?.name}</h3>
                <h3 className="text-md text-gray-800">Email: {userDetails?.email}</h3>
                <h3 className="text-md text-gray-800">Phone: {userDetails?.phonenumber}</h3>
                <h3 className="text-md text-gray-800">Designation: {userDetails?.designation}</h3>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
