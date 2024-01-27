import React, { useState } from 'react'

const AddRoles = () => {
  // for user toggle
  const [userPermission, setUserPermission] = useState(false);
  const handleUserPermission = (e) => {
    setUserPermission(!userPermission);
  }
  // for Entity toggle
  const [entityPermission, setEntityPermission] = useState(false);
  const handleEntityPermission = (e) => {
    setEntityPermission(!entityPermission);
  }
  // for Tasks toggle
  const [tasksPermission, setTasksPermission] = useState(false);
  const handleTasksPermission = (e) => {
    setTasksPermission(!entityPermission);
  }

  // for Board Meeting toggle
  const [boardMeetingPermission, setBoardMeetingPermission] = useState(false);
  const handleBoardMeetingPermission = (e) => {
    setBoardMeetingPermission(!entityPermission);
  }
  // for Teams toggle
  const [teamsPermission, setTeamsPermission] = useState(false);
  const handleTeamsPermission = (e) => {
    setTeamsPermission(!entityPermission);
  }

  return (
    <div className=' p-3 bg-[#f8fafc] overflow-hidden'>
      <h1 className='font-semibold text-lg grid1-item'> Add Roles</h1>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-col-2 gap-2 mt-2'>
        <div className='grid1-item mx-3 text-start w-96'>
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Name</label>
            <div className="">
              <input id="name" name="boardMeetingName" type="text" autoComplete="name" required className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
            </div>
          </div>
        </div>
        <div className='grid1-item mx-3 text-start w-96'>
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Description</label>
            <div className="">
              <input id="name" name="boardMeetingName" type="text" autoComplete="name" required className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-2 border-gray-200 shadow-md rounded-md mt-5 p-4">
        <p className='text-md mb-2 font-semibold'>Permissions</p>
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden ">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse border border-[#e5e7eb] rounded-md ">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-2 text-center text-sm font-semibold text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Name</th>
                  <th scope="col" className="px-6 py-2 text-center text-sm font-semibold text-white bg-orange-600   border-collapse border border-[#e5e7eb]">All</th>
                  <th scope="col" className="px-6 py-2 text-center text-sm font-semibold text-white bg-orange-600   border-collapse border border-[#e5e7eb]" colSpan={4}>Access</th>

                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]"></td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > All</td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > Read</td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > Update</td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > Delete</td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > Create</td>

                </tr>
                <tr onClick={handleUserPermission}>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-sm font-semibold  text-gray-800 border-collapse border border-[#e5e7eb]">User</td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" class="sr-only peer" />
                      <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                    </label>
                  </td>
                </tr>
                {userPermission &&
                  <span>
                    <tr>
                      <td className=" py-2.5 whitespace-nowrap text-center text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Create user</td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>


                    </tr>
                    <tr>
                      <td className=" py-2.5 whitespace-nowrap text-center text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">User Details</td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>


                    </tr>
                  </span>
                }
                <tr onClick={handleEntityPermission}>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-sm font-semibold text-gray-800 border-collapse border border-[#e5e7eb]">Entity</td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" class="sr-only peer" />
                      <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                    </label>
                  </td>
                </tr>
                {entityPermission &&
                  <span>
                    <tr>
                      <td className=" py-2.5 whitespace-nowrap text-center text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Create user</td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>


                    </tr>
                    <tr>
                      <td className=" py-2.5 whitespace-nowrap text-center text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">User Details</td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>


                    </tr>
                  </span>
                }
                <tr onClick={handleTasksPermission}>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-sm font-semibold text-gray-800 border-collapse border border-[#e5e7eb]">Task</td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" class="sr-only peer" />
                      <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                    </label>
                  </td>
                </tr>
                {tasksPermission &&
                  <span>
                    <tr>
                      <td className=" py-2.5 whitespace-nowrap text-center text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Create user</td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>


                    </tr>
                    <tr>
                      <td className=" py-2.5 whitespace-nowrap text-center text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">User Details</td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>


                    </tr>
                  </span>
                }
                <tr onClick={handleBoardMeetingPermission}>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-sm font-semibold text-gray-800 border-collapse border border-[#e5e7eb]">Board Meeting</td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" class="sr-only peer" />
                      <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                    </label>
                  </td>
                </tr>
                {boardMeetingPermission &&
                  <span>
                    <tr>
                      <td className=" py-2.5 whitespace-nowrap text-center text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Create user</td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>


                    </tr>
                    <tr>
                      <td className=" py-2.5 whitespace-nowrap text-center text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">User Details</td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>


                    </tr>
                  </span>
                }
                <tr onClick={handleTeamsPermission}>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-sm font-semibold text-gray-800 border-collapse border border-[#e5e7eb]">Teams</td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" class="sr-only peer" />
                      <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                    </label>
                  </td>
                </tr>
                {teamsPermission &&
                  <span>
                    <tr>
                      <td className=" py-2.5 whitespace-nowrap text-center text-sm font-semibold text-gray-800 border-collapse border border-[#e5e7eb]">Create user</td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>


                    </tr>
                    <tr>
                      <td className=" py-2.5 whitespace-nowrap text-center text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">User Details</td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className=" py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>
                      <td className="py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" >
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" />
                          <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>

                        </label>
                      </td>


                    </tr>
                  </span>
                }

                {/* {tempdata.map(data => (
                  <tr key = {data} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td  ">Kapil Chits</td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">5,000</td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">2,000</td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">2,000</td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">1,000</td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800  flex justify-evenly">
                      <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#64748b] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                          <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" />
                        </svg>
                      </button>
                      <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#64748b] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                        </svg>

                      </button>
                      <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#64748b] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" />
                        </svg>

                      </button>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>

      </div>


    </div>
  )
}

export default AddRoles