import axios from 'axios'
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/authContext';

function UserForm() {
  const { createUser } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phonenumber: "",
    designation: "",
    profile: 1,
    entities: 1,
    board_meeting: 1,
    teams: 1,
    tasks: 4,
    notifications: 4,
    branch: 4
  });
  function handleSubmit(e) {
    e.preventDefault();
    createUser(userDetails)
  }
  return (
    <div>
      <div className='container p-3 bg-[#f8fafc] '>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          <div class="col-span-1 p-3">
            <p className="text-lg font-semibold">New User</p>
            <form className="space-y-3 mt-4" method="POST">
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                <div className="">
                  <input id="name" name="name" type="text" autoComplete="name" required value={userDetails.name}
                    onChange={(e) => setUserDetails((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))} className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <div className="">
                  <input id="email" name="email" type="email" autoComplete="email" required value={userDetails.email}
                    onChange={(e) => setUserDetails((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))}
                    className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                <div className="">
                  <input id="phone" name="phone" type="tel" autoComplete="phone" required value={userDetails.phonenumber}
                    onChange={(e) => setUserDetails((prev) => ({
                      ...prev,
                      phonenumber: e.target.value,
                    }))}
                    className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <label htmlFor="designation" className="block text-sm font-medium leading-6 text-gray-900">Designation</label>
                <div className="">
                  <input id="designation" name="designation" type="text" autoComplete="designation" required value={userDetails.designation} onChange={(e) => setUserDetails((prev) => ({
                    ...prev,
                    designation: e.target.value,
                  }))} className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                </div>
              </div>
              {/* <div className="relative">
                <input type="file" id="fileInput" className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1 bg-white text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
              </div> */}
              {/* <div>
                <label htmlFor="designation" className="block text-sm font-medium leading-6 text-gray-900">Select Entity</label>
                <div class="relative inline-block text-left w-full">
                  <select class="block appearance-none p-3 w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div> */}
              <div className=''>
                <button onClick={handleSubmit} type="submit" className="mt-10 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                  Create User
                </button>
              </div>
            </form>
          </div>
          <div class="col-span-2 p-3">
            <div class="rounded-md overflow-hidden shadow-md">
              <div class="p-4">
                <h2 class="text-md text-gray-800">User Details</h2>
                <h3 class="text-md text-gray-800">Name: {userDetails?.name}</h3>
                <h3 class="text-md text-gray-800">Email: {userDetails?.email}</h3>
                <h3 class="text-md text-gray-800">Phone: {userDetails?.phonenumber}</h3>
                <h3 class="text-md text-gray-800">Designation: {userDetails?.designation}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
