import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { EntitiesDataContext } from '../../../contexts/entitiesDataContext/entitiesDataContext';
import { debounce, formatDate } from '../../../utils/utils';
import './BoardMeetings.css';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import GateKeeper from '../../../rbac/GateKeeper';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function BoardMeetings() {
  const { entitiesState: { entitiesList }, entitiesDispatch, deleteEntitybyId } = useContext(EntitiesDataContext);
  const debouncedSetPage = debounce((newPage) => {
    entitiesDispatch({
      type: "SET_CUSTOM_PAGE",
      payload: newPage
    });
  }, 300);
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className='p-3'>
      {/* name, search, filter */}
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-col-3 gap-2 my-2'>
        <h1 className=' font-semibold text-lg grid1-item'>Board Meetings</h1>
        <div className='grid1-item  text-start'>
          <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center p-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full px-4 py-2 ps-10 text-sm border-2 border-gray-200  rounded-full bg-gray-50  focus:outline-none " placeholder="Search here..." required />
          </div>
        </div>
        <div className='grid1-item text-end filter_pagination'>
          <select className="me-3 gap-x-1.5 focus:outline-none rounded-md bg-gray-50 px-1 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="250">250</option>
            <option value="500">500</option>
          </select>
          <Menu as="div" className="relative inline-block me-2 ">
            <div className=''>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50">
                Filters
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm text-left'
                        )}
                      >
                        Account settings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm text-left'
                        )}
                      >
                        Support
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm text-left'
                        )}
                      >
                        License
                      </Link>
                    )}
                  </Menu.Item>

                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="">
        <div className="flex justify-start mt-2">
          <div
            className={`cursor-pointer px-5 py-1 font-semibold ${activeTab === 1 ? 'border-b-2 border-orange-600  text-black' : ''
              }`}
            onClick={() => handleTabClick(1)}>Completed
          </div>
          <div
            className={`cursor-pointer px-5 py-1 font-semibold ${activeTab === 2 ? 'border-b-2 border-orange-600  text-black' : ""
              }`}
            onClick={() => handleTabClick(2)}>Upcoming
          </div>
        </div>
        {activeTab === 1 && <div className="mt-4 overflow-x-auto">
          <div className="overflow-y-scroll max-h-[410px]">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md">
              <thead className='sticky top-0 bg-orange-600'>
                <tr>
                  <th scope="col" className="px-6 py-2.5 text-left text-sm  border border-[#e5e7eb] text-white bg-orange-600">ID</th>
                  <th scope="col" className="px-6 py-2.5 text-left text-sm  border border-[#e5e7eb] text-white bg-orange-600">Entity</th>
                  <th scope="col" className="px-6 py-2.5 text-left text-sm  border border-[#e5e7eb] text-white bg-orange-600">Date</th>
                  <th scope="col" className="px-6 py-2.5 text-left text-sm  border border-[#e5e7eb] text-white bg-orange-600">Time</th>
                  <th scope="col" className="px-6 py-2.5 text-left text-sm  border border-[#e5e7eb] text-white bg-orange-600">Venue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {entitiesList?.paginatedEntities?.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="px-6 py-2.5 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800">{item.id}</td>
                    <td className="px-6 py-2.5 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800">{item.Entite_Name}</td>
                    <td className="px-6 py-2.5 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800">{formatDate(item.createdAt)}</td>
                    <td className="px-6 py-2.5 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800">10:30 PM</td>
                    <td className="px-6 py-2.5 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800">Kapil Towers</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>}
        {
          activeTab === 2 && <div className="mt-4 overflow-x-auto">
            <div className="overflow-y-scroll max-h-[410px]">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md">
                <thead className='sticky top-0 bg-orange-600'>
                  <tr>
                    <th scope="col" className="px-6 py-2.5 text-left text-sm  border border-[#e5e7eb] text-white bg-orange-600">ID</th>
                    <th scope="col" className="px-6 py-2.5 text-left text-sm  border border-[#e5e7eb] text-white bg-orange-600">Entity</th>
                    <th scope="col" className="px-6 py-2.5 text-left text-sm  border border-[#e5e7eb] text-white bg-orange-600">Date</th>
                    <th scope="col" className="px-6 py-2.5 text-left text-sm  border border-[#e5e7eb] text-white bg-orange-600">Time</th>
                    <th scope="col" className="px-6 py-2.5 text-left text-sm  border border-[#e5e7eb] text-white bg-orange-600">Venue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {entitiesList?.paginatedEntities?.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="px-6 py-2 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{item.id}</td>
                      <td className="px-6 py-2 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb] hover:text-orange-500 "><Link to="/taskform" className='text-xs'>{item.Entite_Name}</Link></td>
                      <td className="px-6 py-2 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{item?.Description ?? "none"}</td>
                      <td className="px-6 py-2 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{formatDate(item.createdAt)}</td>
                      <td className="px-6 py-2 whitespace-nowrap text-center  text-xs font-medium text-gray-800  flex justify-evenly">
                        <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" />
                          </svg>
                        </button>
                        <GateKeeper permissionCheck={(permission) => permission.module === "meeting" && permission.edit}>
                        <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                          </svg>
                        </button>
                        </GateKeeper>
                        <GateKeeper permissionCheck={(permission) => permission.module === "meeting" && permission.delete}>
                        <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" />
                          </svg>
                        </button>
                        </GateKeeper>
                        <GateKeeper permissionCheck={(permission) => permission.module === "meeting" && permission.edit}>
                        <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-7 h-4 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>
                          </label>
                        </button>
                        </GateKeeper>
                      </td>
//                       <td className="px-6 py-2.5 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800">{item.id}</td>
//                       <td className="px-6 py-2.5 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800">{item.Entite_Name}</td>
//                       <td className="px-6 py-2.5 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800">{formatDate(item.createdAt)}</td>
//                       <td className="px-6 py-2.5 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800">11:30 PM</td>
//                       <td className="px-6 py-2.5 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800">Kapil Towers</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        }
      </div >
      <div className='inset-x-0 bottom-0 mt-5'>
        <div className="flex justify-between">
          <div className=''>
            {!entitiesList?.paginatedEntities || entitiesList?.paginatedEntities?.length === 0 ? "no data to show" : entitiesList.loading ? "Loading..." : <p className="text-sm text-gray-700">
              Showing {entitiesList.startEntity} to {entitiesList.endEntity} of <span className="font-medium">{entitiesList.totalEntities}</span>
              <span className="font-medium"> </span> results
            </p>}
          </div>
          <section className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              disabled={entitiesList.currentPage === 1}
              onClick={() => debouncedSetPage(entitiesList.currentPage - 1)}
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-orange-600 hover:text-white focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
              </svg>

            </button>
            <button className="border w-8 border-gray-300">{entitiesList.currentPage}</button>
            <button
              disabled={entitiesList.currentPage === entitiesList.totalPages}
              onClick={() => debouncedSetPage(entitiesList.currentPage + 1)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-orange-600 hover:text-white focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
              </svg>
            </button>
          </section>
        </div>
      </div>
    </div >
  )
}

export default BoardMeetings

