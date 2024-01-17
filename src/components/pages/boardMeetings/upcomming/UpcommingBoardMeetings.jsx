import React, { useContext, useState } from 'react'
import { items } from '../../../../utils/db'
import { Outlet, Link } from 'react-router-dom';
import { EntitiesDataContext } from '../../../../contexts/entitiesDataContext';
import { debounce } from '../../../../utils/utils';

function UpcommingBoardMeetings() {
  const { entitiesState: { entities, pagination }, entitiesDispatch } = useContext(EntitiesDataContext);
  const debouncedSetPage = debounce((newPage) => {
    entitiesDispatch({
      type: "SET_CUSTOM_PAGE",
      payload: newPage
    });
  }, 300);

  const debouncedSetSearch = debounce((e) => {
    entitiesDispatch({
      type: "SET_SEARCH",
      payload: e.target.value
    })
  }, 500);
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-col-3 gap-2'>
        <div className='grid1-item mx-3 mt-2 text-start'>
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center p-2 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input onChange={(e) => debouncedSetSearch(e)} type="search" id="default-search" class="block w-full px-4 py-2 ps-10 text-sm border-2 border-gray-200  rounded-2xl bg-gray-50  focus:outline-none " placeholder="Search here..." required />
          </div>
        </div>
      </div >
      <div class="mt-6 overflow-x-auto ">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="overflow-hidden ">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse border border-[#e5e7eb] rounded-md ">
              <thead>
                <tr>
                  <th scope="col" class="px-6 py-2 text-center text-md font-semibold text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">S.no</th>
                  <th scope="col" class="px-6 py-2 text-center text-md font-semibold text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Id</th>
                  <th scope="col" class="px-6 py-2 text-center text-md font-semibold text-white bg-orange-600   border-collapse border border-[#e5e7eb]">Entity</th>
                  <th scope="col" class="px-6 py-2 text-center text-md font-semibold text-white bg-orange-600   border-collapse border border-[#e5e7eb]">Date</th>
                  <th scope="col" class="px-6 py-2 text-center text-md font-semibold text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Time</th>
                  <th scope="col" class="px-6 py-2 text-center text-md font-semibold text-white bg-orange-600   border-collapse border border-[#e5e7eb] ">Venue</th>
                  <th scope="col" class="px-6 py-2 text-center text-md font-semibold text-white bg-orange-600   border-collapse border border-[#e5e7eb] ">Actions </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                {pagination?.paginatedEntities?.map((item, index) => (
                  <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td class="px-6 py-3 whitespace-nowrap text-center  text-sm font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{(pagination.currentPage + index)}</td>
                    <td class="px-6 py-3 whitespace-nowrap text-center  text-sm font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{item.id}</td>
                    <td class="px-6 py-3 whitespace-nowrap text-center  text-sm font-medium text-gray-800 border-collapse border border-[#e5e7eb] hover:text-orange-500 hover:underline"><Link to="/taskform">{item.entity}</Link></td>
                    <td class="px-6 py-3 whitespace-nowrap text-center  text-sm font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{item.date}</td>
                    <td class="px-6 py-3 whitespace-nowrap text-center  text-sm font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{item.time}</td>
                    <td class="px-6 py-3 whitespace-nowrap text-center  text-sm font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{item.venue}</td>
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
      <div className="flex items-center justify-between  px-4 pt-3 pb-4 sm:px-6">
        <section className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button
            disabled={pagination.currentPage == 1}
            onClick={() => debouncedSetPage(pagination.currentPage - 1)}
            href="#"
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Previous</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" aria-hidden="true">
              <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
            </svg>

          </button>
          <button className="border w-8 border-gray-300">{pagination.currentPage}</button>
          <button
            disabled={pagination.currentPage === pagination.totalPages}
            onClick={() => debouncedSetPage(pagination.currentPage + 1)}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" aria-hidden="true">
              <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </button>
        </section>
      </div>
    </>
  )
}

export default UpcommingBoardMeetings