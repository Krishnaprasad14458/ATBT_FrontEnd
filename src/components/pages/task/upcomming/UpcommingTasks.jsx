import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const tempdata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function UpcommingTasks() {
  // const [activeTab, setActiveTab] = useState(2);

  // const handleTabClick = (tabNumber) => {
  //   setActiveTab(tabNumber);
  // };
  return (
    <>
      <div className="w-full mt-4">
        <div className='mt-4'>
          <div class="flex flex-col mt-5">
            <div class="-m-1.5 overflow-x-auto ">
              <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="overflow-hidden ">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse border border-[#e5e7eb] rounded-md ">
                    <thead>
                      <tr>
                        <th scope="col" class="px-6 py-3 text-center text-md font-semibold text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Id</th>
                        <th scope="col" class="px-6 py-3 text-center text-md font-semibold text-white bg-orange-600   border-collapse border border-[#e5e7eb]">Entity</th>
                        <th scope="col" class="px-6 py-3 text-center text-md font-semibold text-white bg-orange-600   border-collapse border border-[#e5e7eb]">Date</th>
                        <th scope="col" class="px-6 py-3 text-center text-md font-semibold text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Time</th>
                        <th scope="col" class="px-6 py-3 text-center text-md font-semibold text-white bg-orange-600   border-collapse border border-[#e5e7eb] ">Venue</th>
                        <th scope="col" class="px-6 py-3 text-center text-md font-semibold text-white bg-orange-600   border-collapse border border-[#e5e7eb] ">Actions </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                      {tempdata.map(data => (
                        <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td class="px-6 py-3 whitespace-nowrap text-center  text-sm font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Kapil Chits</td>
                          <td class="px-6 py-3 whitespace-nowrap text-center  text-sm font-medium text-gray-800 border-collapse border border-[#e5e7eb]">5,000</td>
                          <td class="px-6 py-3 whitespace-nowrap text-center  text-sm font-medium text-gray-800 border-collapse border border-[#e5e7eb]">2,000</td>
                          <td class="px-6 py-3 whitespace-nowrap text-center  text-sm font-medium text-gray-800 border-collapse border border-[#e5e7eb]">2,000</td>
                          <td class="px-6 py-3 whitespace-nowrap text-center  text-sm font-medium text-gray-800 border-collapse border border-[#e5e7eb]">1,000</td>
                          <td class="px-6 py-3 whitespace-nowrap text-center  text-sm font-medium text-gray-800  flex justify-evenly">
                            <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" />
                              </svg>
                            </button>
                            <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                              </svg>

                            </button>
                            <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" />
                              </svg>

                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpcommingTasks