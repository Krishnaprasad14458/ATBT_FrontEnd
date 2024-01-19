import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import EntityList from '../../../list/entityList/EntityList';
import useDebounce from '../../../../hooks/debounce/useDebounce';
import { EntitiesDataContext } from '../../../../contexts/entitiesDataContext';
import useInitializePerPage from '../../../../hooks/initializePerPage/useInitializePerPage';

function EntityDashboard() {
  const { entitiesState: { entities, pagination }, entitiesDispatch } = useContext(EntitiesDataContext);
  useInitializePerPage(entitiesDispatch, 5);
  const {debouncedSetPage, debouncedSetSearch} = useDebounce(entitiesDispatch);

  return (
    <div class="w-full text-center bg-slate-50 border border-gray-200 rounded-md shadow sm:pt-4 dark:bg-gray-800 dark:border-gray-700">
      <div className='grid1-item overflow-hidden sm:w-full'>
        <div className='p-4 sm:px-6 sm:pt-2'>
          <div class="flex items-center justify-between mb-2">
            <h5 class="text-lg font-semibold leading-none text-gray-800 dark:text-white">Entities {pagination.loading ? '...' : null}</h5>
            <Link to="/entities/new" class="text-sm font-medium text-white-600 hover:underline dark:text-white-500">
              <button class="inline-flex px-3 py-2 items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow hover:bg-primary/90 shrink-0 bg-orange-600 text-white gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 ">
                  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                </svg>
                Create</button>
            </Link>
          </div>
          <div className='flex gap-4'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
            </svg>
            <input onChange={(e) => debouncedSetSearch(e)} type="search" id="gsearch" name="gsearch" className='bg-slate-50 border-none focus:outline-none appearance-none focus:border-none' placeholder='Search here....' />
          </div><hr className='w-60 my-1' />
        </div>
        <hr />
        <div class="flow-root p-3 sm:px-6 sm:py-2">

          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            {pagination?.paginatedEntities === "no data to show for this page" ? (
              <li class="py-2 sm:py-2">
                <p>No user found</p>
              </li>) : pagination?.paginatedEntities?.map(entity => (
                <li class="py-2 sm:py-2" key={entity.id}>
                  <Link>
                    <EntityList entity={entity} />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <hr />
      </div>
      <div className="flex items-center justify-between  px-4 py-3  sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            {pagination?.paginatedEntities === "no data to show for this page" ? null : <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{pagination?.currentPage}</span> of
              <span className="font-medium"> {pagination?.totalPages}</span> pages
            </p>}
          </div>
          <div>
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
        </div>
      </div>
    </div>
  )
}

export default EntityDashboard