import axios from 'axios';
import React, { useContext } from 'react';
import {
  Form,
  Link,
  useFetcher,
  useLoaderData,
  useSubmit,
} from 'react-router-dom';
import GateKeeper from '../../../../../rbac/GateKeeper';
import { AuthContext } from '../../../../../contexts/authContext/authContext';
import Swal from 'sweetalert2';
import { debounce } from '../../../../../utils/utils';
function deleteRole(id) {
  return axios.delete(`https://atbtbeta.infozit.com/rbac/deleteRole/${id}`);
}

export async function action() { }

const Roles = () => {
  const { data } = useLoaderData();
  console.log(data, 'data');
  const submit = useSubmit();
  let params = useSubmit();
  const { userLogout, authState } = useContext(AuthContext);
  const userRoleId = authState?.user?.RoleId;
  const debouncedSearchParams = debounce((search) => {
    console.log(search);
    params(search);
    // Call the function to rerender the component with the latest results
  }, 500);
  const fetcher = useFetcher();
  const onDelete = async (data) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this role!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ea580c',
      cancelButtonColor: '#fff',
      confirmButtonText: 'Delete',
      customClass: {
        popup: 'custom-swal2-popup',
        title: 'custom-swal2-title',
        content: 'custom-swal2-content',
      },
    });
    if (confirmDelete.isConfirmed) {
      try {
        fetcher.submit(
          {
            // You can implement any custom serialization logic here
            serialized: JSON.stringify(data),
          },
          { method: 'delete' }
        );
      } catch (error) {
        Swal.fire('Error', 'Unable to delete role 🤯', 'error');
      }
    }
  };
  function handleSearch(event) {
    debouncedSearchParams(`search=${event.target.value}`);
  }
  return (
    <div className=' p-3 bg-[#f8fafc] overflow-hidden'>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-col-3 gap-2 mt-2'>
        <h1 className='font-semibold text-lg grid1-item'>Roles</h1>
        <div className='grid1-item  text-start'>
          <label
            for='default-search'
            className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
          >
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center p-2 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              type='search'
              id='default-search'
              className='block w-full px-4 py-2 ps-10 text-sm border-2 border-gray-200  rounded-2xl bg-gray-50  focus:outline-none '
              placeholder='Search here...'
              required
              // onChange={(event) => {
              //   console.log(event.target.value);
              //   params(`search=${event.target.value}`);
              // }}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className='grid1-item  sm:text-start md:text-end lg:text-end xl:text-end flex justify-end'>
          {/* <div className='mt-2'>
            <select
              defaultValue='10'
              // onChange={handlePerPageChange}
              className='focus:outline-none me-3 gap-x-1.5 rounded-md bg-gray-50 px-1 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50'
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
              <option value='250'>250</option>
              <option value='500'>500</option>
            </select></div> */}

          <Link to='upsert'>
            <button className='mt-1 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-5 h-5 '
              >
                <path d='M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z' />
              </svg>
              Add Roles
            </button>
          </Link>
        </div>
      </div>
      {/* table */}
      <div className='mt-8'>
        <div className='max-h-[457px] overflow-y-scroll'>
          <table className='w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md'>
            <thead>
              <tr>
                <th className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'>
                  S.No
                </th>
                <th className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'>
                  Name
                </th>
                <th className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'>
                  Description
                </th>
                <th className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200 '>
                  Actions{' '}
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
              {!data?.roles || data?.roles?.length === 0 ? (
                <tr>no roles found</tr>
              ) : (
                data?.roles?.map((role, index) => (
                  <tr
                    key={role.id}
                    className='hover:bg-slate-100 dark:hover:bg-gray-700'
                  >
                    <td className='px-3 py-2 whitespace-nowrap  text-left text-xs font-[600] text-gray-800 border-collapse border border-[#e5e7eb]'>
                      {++index}
                    </td>
                    <td
                      className='px-3 py-2 whitespace-nowrap text-left  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb] hover:text-orange-500  overflow-hidden'
                      style={{ maxWidth: '160px' }}
                    >
                      {/* <Link
                      to='/taskform'
                      className='text-xs truncate'
                      title={role.name}
                    > */}
                      {role.name}
                      {/* </Link> */}
                    </td>

                    <td
                      className='px-3 py-2 whitespace-nowrap text-left text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb] overflow-hidden'
                      style={{ maxWidth: '160px' }}
                    >
                      <div
                        className='truncate text-xs'
                        title={role.description}
                      >
                        {role.description}
                      </div>
                    </td>

                    {/* <td className='px-5 py-2 whitespace-nowrap text-left  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                    {role.createdAt}
                  </td> */}
                    {
                      <td className='px-3 py-2 whitespace-nowrap text-left  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]  '>
                        <button
                          type='submit'
                          disabled={userRoleId == role.id ? true : false}
                          className={` ${userRoleId == role.id
                              ? 'text-gray-500 bg-gray-50 cursor-not-allowed'
                              : 'bg-gray-50 text-[#475569] hover:text-orange-500'
                            } mr-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent   disabled:opacity-40  dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 `}
                          // className='mr-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                          onClick={() =>
                            submit(
                              { id: `${role.id}` },
                              {
                                method: 'get',
                                action: 'upsert',
                              }
                            )
                          }
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='w-4 h-4'
                          >
                            <path d='m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z' />
                          </svg>
                        </button>
                        <button
                          type='button'
                          disabled={userRoleId == role.id ? true : false}
                          className={` ${userRoleId == role.id
                              ? 'text-gray-500 bg-gray-50 cursor-not-allowed'
                              : 'bg-gray-50 text-[#475569] hover:text-orange-500'
                            } mr-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent   disabled:opacity-40  dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 `}
                          onClick={() => onDelete({ roleId: `${role.id}` })}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='w-4 h-4'
                          >
                            <path
                              fill-rule='evenodd'
                              d='M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z'
                              clip-rule='evenodd'
                            />
                          </svg>
                        </button>
                      </td>
                    }
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Roles;
