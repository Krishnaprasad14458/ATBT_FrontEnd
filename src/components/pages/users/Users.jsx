import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  Link,
  useFetcher,
  useLoaderData,
  useNavigation,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';
import $ from 'jquery';
import Swal from 'sweetalert2';
import { Fragment } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import GateKeeper from '../../../rbac/GateKeeper';
import atbtApi from '../../../serviceLayer/interceptor';
import { debounce } from '../../../utils/utils';
import Skeleton from 'react-loading-skeleton';
import CustomColumn from '../../../componentLayer/tableCustomization/CustomColumn';
import CustomFilter from '../../../componentLayer/tableCustomization/CustomFilter';
import delete_gif from '../../../Images/Trash.gif'

function classNames(...classes) {
  return classes.filter(Boolean).join('');
}

const userData = JSON.parse(localStorage.getItem('data'));
const userId = userData?.user?.id;
console.log("userdata", userData)
const role = userData?.role?.name;

export async function loader({ request, params }) {
  try {
    let url = new URL(request.url);
    const [users, entityList, roleList, meetingFormData] = await Promise.all([
      atbtApi.post(`user/list${url?.search ? url?.search : ''}`, {}),
      atbtApi.post(`public/list/entity`),
      atbtApi.post(`public/list/role`),
      atbtApi.get(`form/list?name=userform`),
    ]);
    console.log(users, 'users loader');
    const combinedResponse = {
      users: users?.data,
      fieldsDropDownData: {
        role: roleList?.data?.roles?.map((item) => item.name),
        entityname: entityList?.data?.Entites?.map((item) => item.name),
      },
      tableViewData: meetingFormData?.data?.Tableview,
      customForm: meetingFormData?.data?.Data,
    };
    console.log(combinedResponse, 'entities response', request, params);
    return combinedResponse;
  } catch (error) {
    console.error('Error occurred:', error);
    throw error;
  }
}

export async function action({ request, params }) {
  switch (request.method) {
    case 'DELETE': {
      const id = (await request.json()) || null;
      console.log(id, 'json', id);
      return await atbtApi.delete(`user/delete/${id}`);
    }
    default: {
      throw new Response('', { status: 405 });
    }
  }
}

function Users() {
  document.title = 'ATBT | User';
  const navigation = useNavigation();
  let submit = useSubmit();
  let fetcher = useFetcher();
  const data = useLoaderData();
  const { users, tableViewData, fieldsDropDownData, customForm } = data;
  const [Qparams, setQParams] = useState({
    search: '',
    page: 1,
    pageSize: 10,
  });
  useEffect(() => {
    debouncedParams(Qparams);
  }, [Qparams]);
  const debouncedParams = useCallback(
    debounce((param) => {
      console.log(param);
      submit(param, { method: 'get', action: '.' });
    }, 500),
    []
  );
  console.log('Qparams', Qparams);
  function handleSearch(event) {
    setQParams({
      ...Qparams,
      search: event.target.value,
    });
  }
  function handlePage(page) {
    setQParams({
      ...Qparams,
      page,
    });
  }
  const handlePerPageChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    console.log(selectedValue, 'sv');
    setQParams({
      ...Qparams,
      pageSize: selectedValue,
    });
  };

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('.');
    }
  }, [fetcher, navigation]);
  // active - inactive
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [user_status, setUser_Status] = useState(false);
  const [userremarkshistory, setuser_remarks_history] = useState([]);
  const [text, setText] = useState('');
  const [id, setId] = useState('');

  const handleClickOpen = (id, userStatus, userRemarksHistory) => {
    setId(id);
    setUser_Status(userStatus);
    setuser_remarks_history(userRemarksHistory);
    setOpen(true);
  };

  const handleClosed = () => {
    setOpen(false);
  };
  const handleUserStatus = async () => {
    setOpen(false);
    if (text) {
      let userstatus = !user_status;
      let user_remarks_history = userremarkshistory;
      let newObject;
      if (!user_status) {
        newObject = {
          Activate_remarks: text,
          date: new Date(),
        };
      }
      if (user_status) {
        newObject = {
          Inactivate_remarks: text,
          date: new Date(),
        };
      }

      user_remarks_history.push(newObject);
      const updatedData = {
        user_remarks_history,
        userstatus,
        id,
      };
      console.log('updatedData', updatedData, user_remarks_history);
      fetcher.submit(updatedData, {
        method: 'PUT',
        encType: 'application/json',
      });
      setText('');
    } else {
      alert('enter remarks');
    }
  };
  const buttonRef = useRef(null);
  const handleDeleteUser = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this user!',
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
        // const result = await deleteUser(id);
        fetcher.submit(id, { method: 'DELETE', encType: 'application/json' });
      } catch (error) {
        Swal.fire('Error', 'Unable to delete user 🤯', 'error');
      }
    }


  };

  const [tableView, setTableView] = useState(tableViewData);

  const [visibleColumns, setvisibleColumns] = useState();
  useEffect(() => {
    let visibleColumns = Object.keys(tableView || {}).filter(
      (key) => tableView[key]?.value
    );
    setvisibleColumns(visibleColumns);
  }, [tableView]);

  useEffect(() => {
    console.log('irshad', tableView, visibleColumns);
  });

  function formatTime(timeString) {
    const [hourStr, minuteStr] = timeString.split(':');
    const hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);
    if (isNaN(hours) || isNaN(minutes)) {
      return 'Invalid time';
    }
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Handles midnight
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Ensures minutes are two digits
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    return formattedTime;
  }
  console.log(navigation, 'navigation fetcher', fetcher);

  return (

    <div className='overflow-x-auto p-4'>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-col-3 gap-2 mt-2'>
        <h1 className='font-semibold text-lg grid1-item'>Users</h1>
        <div className='grid1-item text-start'>
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
              onChange={handleSearch}
              value={Qparams?.search}
              type='search'
              id='default-search'
              className='block w-full px-4 py-2 ps-10 text-sm border-2 border-gray-200  rounded-2xl bg-gray-50  focus:outline-none '
              placeholder='Search here...'
              required
            />
          </div>
        </div>
        <div className='grid1-item text-end flex justify-end filter_pagination divide-x-2 h-7 mt-2'>


          <CustomColumn
            tableView={tableView}
            setTableView={setTableView}
            form='userform'
          />

          <CustomFilter
            fieldsDropDownData={fieldsDropDownData}
            Qparams={Qparams}
            setQParams={setQParams}
            customForm={customForm}
          />

          {/* for filter open */}
        </div>
      </div>
      {/* table */}
      <div className='max-h-[510px] overflow-y-scroll mt-5'>
        {visibleColumns && tableView && users?.users && (
          <table className='w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md'>
            <thead>
              <tr>
                {visibleColumns.map((key) => (
                  <th
                    key={key}
                    className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200 '
                  >
                    {tableView[key].label}
                  </th>
                ))}
                <th className='sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className=' divide-gray-200 dark:divide-gray-700'>
              {users?.users &&
                users?.users?.map((row) => (
                  <tr key={row.id} className='hover:bg-slate-100 dark:hover:bg-gray-700'>
                    {visibleColumns.map((key) => {
                      let value = row[key];

                      if (tableView[key].type === 'multiselect' && row[key]) {
                        value = row[key].join(', ');
                      }
                      if (tableView[key].type === 'time' && row[key]) {
                        value = formatTime(row[key]);
                      }
                      if (tableView[key].type === 'date' && row[key]) {
                        value = new Date(row[key]);
                        const day = value.getUTCDate();
                        const monthIndex = value.getUTCMonth();
                        const year = value.getUTCFullYear();

                        const monthAbbreviations = [
                          'Jan',
                          'Feb',
                          'Mar',
                          'Apr',
                          'May',
                          'Jun',
                          'Jul',
                          'Aug',
                          'Sep',
                          'Oct',
                          'Nov',
                          'Dec',
                        ];

                        // Formatting the date
                        value = `${day < 10 ? '0' : ''}${day}-${monthAbbreviations[monthIndex]
                          }-${year}`;
                      }

                      if (key === 'name') {
                        return (
                          <td
                            key={key}
                            className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
                            style={{ maxWidth: '160px' }}
                            title={row[key]}
                          >
                            <GateKeeper
                              permissionCheck={(permission) =>
                                permission.module === 'user' &&
                                permission.canRead
                              }
                            >
                              <Link to={`${row.id}/task`}>
                                <p className='truncate text-xs'> {value}</p>
                              </Link>
                            </GateKeeper>
                          </td>
                        );
                      } else {
                        return (
                          <td
                            key={key}
                            className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                            style={{ maxWidth: '160px' }}
                            title={row[key]}
                          >
                            <p className='truncate text-xs'> {value}</p>
                          </td>
                        );
                      }
                    })}

                    <td
                      className={`px-2 py-2  border border-[#e5e7eb] text-xs font-medium text-center ${row.userstatus
                        ? 'text-gray-800 '
                        : 'bg-gray-100 text-gray-300'
                        }`}
                      style={{ maxWidth: '160px' }}
                    >
                      <div className='flex justify-start gap-5'>
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === 'user' &&
                            permission.canCreate
                          }
                        >
                          <button
                            type='button'
                            title='View'
                            className=' inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                          >
                            <Link to={`${row.id}`}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                className='w-4 h-4'
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
                            permission.module === 'user' &&
                            permission.canUpdate
                          }
                        >
                          <button
                            type='button'
                            title='Edit'
                            className=' inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                          >
                            <Link to={`${row.id}/edit`}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                className='w-4 h-4'
                              >
                                <path d='m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z' />
                              </svg>
                            </Link>
                          </button>
                        </GateKeeper>
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === 'user' &&
                            permission.canUpdate
                          }
                        >
                          {
                            // <button
                            //   type='button'
                            //   title='Delete'
                            //   onClick={() => handleDeleteUser(row.id)}
                            //   disabled={userId == row.id ? true : false}
                            //   className={` ${userId == row.id
                            //     ? 'text-gray-500 bg-gray-50 cursor-not-allowed'
                            //     : 'bg-gray-50 text-[#475569] hover:text-red-500 '
                            //     } inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] disabled:opacity-50   dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 `}
                            // // style={{
                            // //   transition: 'transform 0.3s ease-in-out',
                            // // }}
                            // >

                            //   <svg
                            //     xmlns='http://www.w3.org/2000/svg'
                            //     viewBox='0 0 20 20'
                            //     fill='currentColor'
                            //     className='w-4 h-4'
                            //   >
                            //     <path
                            //       fill-rule='evenodd'
                            //       d='M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z'
                            //       clip-rule='evenodd'
                            //     />
                            //   </svg>
                            // </button>
                            <button 
                            type='button'
                             title='Delete'
                             onClick={() => handleDeleteUser(row.id)}
                             disabled={userId == row.id ? true : false}
                             className={` ${userId == row.id
                                  ? 'text-gray-500 bg-gray-50 cursor-not-allowed'
                                   : 'bg-gray-50 text-[#475569] hover:text-red-500 '
                                   } inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569]  disabled:opacity-50   dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 delete-button hover:text-red-500`}
                             >
                              <span class="icon">
                                <span class="lid"></span>
                                <span class="can"></span>
                                <span class="trash"></span></span>
                            </button>
                          }
                        </GateKeeper>
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === 'user' &&
                            permission.canUpdate
                          }
                        >
                          {/* className='items-center  text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' */}
                          {
                            <button
                              disabled={userId == row.id ? true : false}
                              className={` ${userId == row.id
                                ? 'text-gray-500 bg-gray-50 cursor-not-allowed'
                                : 'bg-gray-50 text-[#475569] hover:text-orange-500'
                                } items-center  text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50  dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 `}
                            >
                              {row.userstatus !== undefined && (
                                <label
                                  htmlFor='toggle'
                                  // className='flex items-center cursor-pointer'
                                  disabled={userId == row.id ? true : false}
                                  className={` ${userId == row.id
                                    ? 'cursor-not-allowed'
                                    : ''
                                    } flex items-center`}
                                  onClick={(e) =>
                                    handleClickOpen(
                                      row.id,
                                      row.userstatus,
                                      row.userremarkshistory
                                    )
                                  }
                                >
                                  <div
                                    className={`w-6 h-3 rounded-full shadow-inner ${row.userstatus
                                      ? ' bg-[#ea580c]'
                                      : 'bg-[#c3c6ca]'
                                      }`}
                                  >
                                    <div
                                      className={`toggle__dot w-3 h-3 rounded-full shadow ${row.userstatus
                                        ? 'ml-4 bg-white'
                                        : 'bg-white'
                                        }`}
                                    ></div>
                                  </div>
                                </label>
                              )}
                            </button>
                          }
                        </GateKeeper>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      <Transition.Root
        show={open}
        as={Fragment}
      >
        <Dialog
          as='div'
          className='relative z-10'
          initialFocus={cancelButtonRef}
          onClose={handleClosed}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 px-4 py-6 sm:max-w-lg'>
                  <div className='flex justify-between items-center mb-4'>
                    <p className='text-md font-semibold'>
                      Enter Remarks<span className='text-red-600'> *</span>
                    </p>
                    <button
                      onClick={handleClosed}
                      className='text-gray-500 hover:text-gray-700 focus:outline-none'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          fillRule='evenodd'
                          d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z'
                        />
                      </svg>
                    </button>
                  </div>
                  <textarea
                    className='resize-y w-60 md:w-96 rounded-md bg-gray-50 mb-2 text-sm p-2 border-2 border-gray-200 focus:outline-none focus:border-orange-400'
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    rows={4} // Adjust as needed
                  ></textarea>
                  <div className='w-full flex justify-end '>
                    <button
                      onClick={(e) => handleUserStatus()}
                      className='mr-3 px-3 py-2 inline-flex  whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white'
                    >
                      {user_status ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* pagination */}
      <div className='inset-x-0 bottom-0 mt-5'>
        <div className='md:flex md:justify-between block text-end'>
          <div className=''>
            {!users?.users || users?.users?.length === 0 ? (
              'no data to show'
            ) : users.loading ? (
              'Loading...'
            ) : (
              <p className='text-sm text-gray-700'>
                Showing {users.startUser} to {users.endUser} of{' '}
                <span className='font-medium'>{users.totalUsers}</span>
                <span className='font-medium'> </span> results
              </p>
            )}
          </div>

          <section
            className='isolate inline-flex rounded-md  ms-4 mt-2 md:mt-0'
            aria-label='Pagination'
          >
            <select
              value={Qparams?.pageSize}
              onChange={handlePerPageChange}
              className='focus:outline-none me-3 rounded-md bg-[#f8fafc]  px-1 py-1.5 text-sm font-semibold  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 shadow-sm  text-gray-500'
            >
              <option value='10' >10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
              <option value='250'>250</option>
              <option value='500'>500</option>
            </select>
            {/* previos button */}
            <button
              disabled={
                navigation?.state === 'loading'
                  ? true
                  : false || users.currentPage === 1
              }
              onClick={() => handlePage(users.currentPage - 1)}
              href='#'
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${navigation?.state === 'loading'
                ? 'cursor-wait'
                : users.currentPage === 1
                  ? 'cursor-not-allowed'
                  : 'cursor-auto'
                }`}
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
            {/* next button */}
            <button
              disabled={
                navigation?.state === 'loading'
                  ? true
                  : false || users.currentPage === users.totalPages
              }
              onClick={() => handlePage(users.currentPage + 1)}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${navigation?.state === 'loading'
                ? 'cursor-wait'
                : users.currentPage === users.totalPages
                  ? 'cursor-not-allowed'
                  : 'cursor-auto'
                }`}
            >
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

export default Users;
