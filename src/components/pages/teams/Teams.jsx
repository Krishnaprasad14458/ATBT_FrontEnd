import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { EntitiesDataContext } from '../../../contexts/entitiesDataContext/entitiesDataContext';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { ifStatement } from '@babel/types';
import useDebounce from '../../../hooks/debounce/useDebounce';
import GateKeeper from '../../../rbac/GateKeeper';
const tempdata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
function Teams() {
  document.title = 'ATBT | Team';
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  // -----file upload
  // const [image, SetImage] = useState('')
  // function handleImage(e) {
  //   console.log(e.target.files)
  //   SetImage(e.target.files[0])
  // }
  // function handleApi() {
  //   const formData = new FormData();
  //   formData.append('image', image)
  //   axios.post('https://localhost:3001/upload', formData)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.error('Error uploading file:', error.message);
  //     });
  // }

  const [imageSrc, SetImageSrc] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   console.log(file)
  //   const name = event.target.name;
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       axios.post('http://localhost:3001/upload', {image: reader.result})
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((error) => {
  //         console.error('Error uploading file:', error.message);
  //       });
  //       SetImageSrc(reader.result)

  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  // toggle
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((pre) => !pre);
  };
  const [file, setFile] = useState(null);
  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const handleApi = async () => {
    // Ensure a file is selected
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    // Make a POST request to your backend
    const formData = new FormData();
    formData.append('image', file);
    // console.log(formData, 'fd');
    const data = await axios.post(
      'https://atbtmain.infozit.com/upload',
      formData
    );
    // console.log(data);

    // fetch('http://localhost:3001/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    // .then(response => {
    //   if (response.ok) {
    //     // Handle successful response
    //     console.log('Image uploaded successfully.',response.data);
    //   } else {
    //     // Handle error response
    //     console.error('Failed to upload image.');
    //   }
    // })
    // .catch(error => {
    //   console.error('Error uploading image:', error);
    // });
  };
  const {
    entitiesState: { entitiesList },
    entitiesDispatch,
    deleteEntitybyId,
  } = useContext(EntitiesDataContext);
  const { debouncedSetPage, debouncedSetSearch } =
    useDebounce(entitiesDispatch);
  // const [toggle, setToggle] = useState(false)
  const handlePerPageChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    entitiesDispatch({
      type: 'SET_PER_PAGE',
      payload: {
        conext: 'ENTITES',
        data: selectedValue,
      },
    });
  };

  return (
    <div className=' p-3 bg-[#f8fafc] overflow-hidden'>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-col-3 gap-2 my-2'>
        <h1 className='font-semibold text-lg grid1-item'>Teams</h1>
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
            />
          </div>
        </div>
        <div className='grid1-item text-end filter_pagination'>
          <select className='me-3 gap-x-1.5 rounded-md bg-gray-50 px-1 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50'>
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
            <option value='250'>250</option>
            <option value='500'>500</option>
          </select>
          <Menu
            as='div'
            className='relative inline-block me-2 '
          >
            <div className=''>
              <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50'>
                Filters
                <ChevronDownIcon
                  className='-mr-1 h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to='#'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
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
                        to='#'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
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
                        to='#'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
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

      <div className='max-h-[410px] overflow-y-scroll mt-6'>
        <table className='w-full divide-gray-200 dark:divide-gray-700 rounded-md'>
          <thead>
            <tr>
              <th
                scope='col'
                className='sticky top-0 bg-orange-600 text-white text-sm text-left px-6 py-2.5 border-l-2 border-gray-200'
              >
                {' '}
                Team{' '}
              </th>
              <th
                scope='col'
                className='sticky top-0 bg-orange-600 text-white text-sm text-left px-6 py-2.5 border-l-2 border-gray-200'
              >
                Total Tasks
              </th>
              <th
                scope='col'
                className='sticky top-0 bg-orange-600 text-white text-sm text-left px-6 py-2.5 border-l-2 border-gray-200'
              >
                {' '}
                Completed Tasks
              </th>
              <th
                scope='col'
                className='sticky top-0 bg-orange-600 text-white text-sm text-left px-6 py-2.5 border-l-2 border-gray-200'
              >
                Upcoming Tasks
              </th>
              <th
                scope='col'
                className='sticky top-0 bg-orange-600 text-white text-sm text-left px-6 py-2.5 border-l-2 border-gray-200'
              >
                {' '}
                Overdue Tasks
              </th>
              <th
                scope='col'
                className='sticky top-0 bg-orange-600 text-white text-sm text-left px-6 py-2.5 border-l-2 border-gray-200'
              >
                {' '}
                Actions{' '}
              </th>
            </tr>
          </thead>
          <tbody>
            {!entitiesList?.paginatedEntities ||
            entitiesList?.paginatedEntities?.length === 0 ? (
              <p className='text-center m-auto'>no entity found</p>
            ) : (
              entitiesList?.paginatedEntities?.map((item, index) => (
                <tr
                  key={item.id}
                  className='hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                  <td className='px-6 py-2 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800'>
                    Team
                  </td>
                  <td className='px-6 py-2 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800'>
                    4000
                  </td>
                  <td className='px-6 py-2 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800'>
                    1000
                  </td>
                  <td className='px-6 py-2 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800'>
                    2000
                  </td>
                  <td className='px-6 py-2 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800'>
                    1000
                  </td>
                  <td className='px-6 py-2 text-left border border-[#e5e7eb] text-xs font-medium text-gray-800'>
                    <div className='flex justify-start'>
                      <GateKeeper
                        permissionCheck={(permission) =>
                          permission.module === 'team' && permission.canRead
                        }
                      >
                        <button
                          type='button'
                          className='me-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                        >
                          <Link to={`/teamslandingpage/${item.id}`}>
                            {' '}
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              className='w-5 h-5'
                            >
                              <path d='M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' />
                              <path
                                fill-rule='evenodd'
                                d='M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'
                                clip-rule='evenodd'
                              />
                            </svg>
                          </Link>
                        </button>
                      </GateKeeper>
                      <GateKeeper
                        permissionCheck={(permission) =>
                          permission.module === 'team' && permission.canUpdate
                        }
                      >
                        <button
                          type='button'
                          className='me-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='w-5 h-5'
                          >
                            <path d='m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z' />
                          </svg>
                        </button>
                      </GateKeeper>
                      <GateKeeper
                        permissionCheck={(permission) =>
                          permission.module === 'team' && permission.canDelete
                        }
                      >
                        <button
                          type='button'
                          onClick={() => deleteEntitybyId(item.id)}
                          className='me-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              fill-rule='evenodd'
                              d='M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z'
                              clip-rule='evenodd'
                            />
                          </svg>
                        </button>
                      </GateKeeper>
                      <GateKeeper
                        permissionCheck={(permission) =>
                          permission.module === 'team' && permission.canUpdate
                        }
                      >
                        <button
                          type='button'
                          className='me-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                        >
                          <div className='flex items-center'>
                            <input
                              id='toggle'
                              type='checkbox'
                              className='hidden'
                              checked={isChecked}
                              onChange={handleToggle}
                            />
                            <label
                              htmlFor='toggle'
                              className='flex items-center cursor-pointer'
                            >
                              <div
                                className={`w-8 h-4 rounded-full shadow-inner ${
                                  isChecked ? ' bg-[#ea580c]' : 'bg-[#c3c6ca]'
                                }`}
                              >
                                <div
                                  className={`toggle__dot w-4 h-4 rounded-full shadow ${
                                    isChecked ? 'ml-4 bg-white' : 'bg-white'
                                  }`}
                                ></div>
                              </div>
                              {/* <div className={`ml-3 text-sm font-medium ${isChecked ? 'text-gray-400' : 'text--400'}`}>
                              {isChecked ? 'Enabled' : 'Disabled'}
                             </div> */}
                            </label>
                          </div>
                        </button>
                      </GateKeeper>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className='inset-x-0 bottom-0 mt-5'>
        <div className='flex justify-between'>
          <div className=''>
            {!entitiesList?.paginatedEntities ||
            entitiesList?.paginatedEntities?.length === 0 ? (
              'no data to show'
            ) : entitiesList.loading ? (
              'Loading...'
            ) : (
              <p className='text-sm text-gray-700'>
                Showing {entitiesList.startEntity} to {entitiesList.endEntity}{' '}
                of{' '}
                <span className='font-medium'>
                  {entitiesList.totalEntities}
                </span>
                <span className='font-medium'> </span> results
              </p>
            )}
          </div>
          <section
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <button
              href='#'
              className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-orange-600 hover:text-white focus:z-20 focus:outline-offset-0'
            >
              <span className='sr-only'>Previous</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-5 h-5'
                aria-hidden='true'
              >
                <path
                  fill-rule='evenodd'
                  d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z'
                  clip-rule='evenodd'
                />
              </svg>
            </button>
            <button className='border w-8 border-gray-300'>1</button>
            <button className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-orange-600 hover:text-white focus:z-20 focus:outline-offset-0'>
              <span className='sr-only'>Next</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-5 h-5'
                aria-hidden='true'
              >
                <path
                  fill-rule='evenodd'
                  d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z'
                  clip-rule='evenodd'
                />
              </svg>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Teams;
