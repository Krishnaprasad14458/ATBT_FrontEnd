import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useSubmit } from 'react-router-dom';
import $ from 'jquery';
import './User.css';
import Swal from 'sweetalert2';
import { Fragment } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { UserDataContext } from '../../../contexts/usersDataContext/usersDataContext';
import useDebounce from '../../../hooks/debounce/useDebounce';
import * as actions from '../../../contexts/usersDataContext/utils/usersActions';
import GateKeeper from '../../../rbac/GateKeeper';
import axios from 'axios';
import { EntitiesDataContext } from '../../../contexts/entitiesDataContext/entitiesDataContext';
import { AuthContext } from '../../../contexts/authContext/authContext';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const userData = JSON.parse(localStorage.getItem('data'));
const token = userData?.token;
const role = userData?.role?.name;
const userId = userData?.user?.id;
function Users() {
  const {
    entitiesState: { entitiesList },
  } = useContext(EntitiesDataContext);
  document.title = 'ATBT | User';
  const [hoveredOption, setHoveredOption] = useState(4);
  useEffect(() => {
    console.log('hoveredOption', hoveredOption);
  });
  const handleMouseEnter = () => {
    setHoveredOption('hi');
  };

  const handleMouseLeave = () => {
    setHoveredOption('heloo');
  };
  const submit = useSubmit();
  const {
    usersState: { settings },
    usersDispatch,
    deleteUser,
    setSortBy,
    setFilters,
    toggleUser,
  } = useContext(UserDataContext);
  useEffect(() => {
    console.log('settingss', settings);
  });
  const { debouncedSetPage, debouncedSetSearch } = useDebounce(usersDispatch);
  const handlePerPageChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    usersDispatch({
      type: 'SET_PER_PAGE',
      payload: {
        conext: 'SETTINGS',
        data: selectedValue,
      },
    });
  };
  function handlefilters() {
    usersDispatch(setFilters(selectedFilters, 'SETTINGS'));
    setFilterDrawerOpen(!filterDrawerOpen);
  }
  const handleFilterReset = () => {
    setSelectedFilters({});
    usersDispatch(setFilters({}, 'SETTINGS'));
    setFilterDrawerOpen(!filterDrawerOpen);
  };
  useEffect(() => {
    // usersDispatch(actions.setPerPage(10))
    return () => {
      usersDispatch({
        type: 'SET_SEARCH',
        payload: {
          data: '',
          context: 'SEIINGS',
        },
      });
      //   usersDispatch(actions.setPerPage(5))
    };
  }, []);
  const [open, setOpen] = useState(false);
  // const [opening, setOpening] = useState(false);
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
        userstatus,
        user_remarks_history,
      };
      await toggleUser(id, updatedData);
      setText('');
    } else {
      alert('enter remarks');
    }
  };

  const [columnsDrawerOpen, setColumnsDrawerOpen] = useState(false);

  const columnsDrawer = () => {
    setColumnsDrawerOpen(!columnsDrawerOpen);
  };
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const filterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
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
        const result = await deleteUser(id);
      } catch (error) {
        Swal.fire('Error', 'Unable to delete user 🤯', 'error');
      }
    }
  };

  /////////////////////////////////////////////// Irshad
  const [customForm, setCustomForm] = useState([]);
  let [fieldsDropDownData, setFieldsDropDownData] = useState({
    role: [],
    entityname: [],
  });
  useEffect(() => {
    setFieldsDropDownData((prevState) => ({
      ...prevState,
      entityname: entitiesList.paginatedEntities.map((item) => item.name),
    }));
  }, [entitiesList]);
  useEffect(() => {
    axios
      .get(`https://atbtmain.infozit.com/form/list?name=userform`)
      .then((response) => {
        // Handle the successful response
        setCustomForm(response.data.Data);
        setTableView(response.data.Tableview);
        setDupTableView(response.data.Tableview);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching data:', error);
      });

    axios
      .get(`https://atbtmain.infozit.com/rbac/getroles`)
      .then((response) => {
        setFieldsDropDownData((prevState) => ({
          ...prevState,
          role: response.data.roles.map((item) => item.name),
        }));
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  }, []);

  ////////filters start
  const [filterableInputsInBox, setFilterableInputsInBox] = useState();
  const [filterableInputsInSearch, setFilterableInputsInSearch] = useState();

  useEffect(() => {
    const filterableInputsInBox = customForm
      .filter(
        (obj) =>
          obj.filterable &&
          (obj.type === 'select' ||
            obj.type === 'date' ||
            obj.type === 'multiselect')
      )
      .map((obj) => ({
        inputname: obj.inputname,
        label: obj.label,
        ...(obj.options && { options: obj.options }),
      }));
    const filterableInputsInSearch = customForm
      .filter(
        (obj) =>
          (obj.filterable && obj.type === 'text') ||
          obj.type === 'email' ||
          obj.type === 'number' ||
          obj.type === 'textarea'
      )
      .map((obj) => ({
        inputname: obj.inputname,
        label: obj.label,
      }));

    setFilterableInputsInBox(filterableInputsInBox);
    setFilterableInputsInSearch(filterableInputsInSearch);
  }, [customForm]);

  useEffect(() => {
    console.log('filterableInputsInBox', filterableInputsInBox);
  });

  ////////filters end

  const [tableView, setTableView] = useState();
  const [dupTableView, setDupTableView] = useState();
  const handleColumnsCheckboxChange = (columnName) => {
    setDupTableView((prevColumns) => ({
      ...prevColumns,
      [columnName]: {
        ...prevColumns[columnName],
        value: !prevColumns[columnName].value,
      },
    }));
  };
  const handleColumnsApply = () => {
    setTableView(dupTableView);
    return columnsDrawer();
  };
  const handleColumnsSave = () => {
    if (role === 'admin') {
      try {
        axios
          .put(
            `https://atbtmain.infozit.com/form/tableUpdate?name=userform`,
            dupTableView
          )
          .then((response) => {
            console.log('Update successful:', response.data);
            axios
              .get(`https://atbtmain.infozit.com/form/list?name=userform`)
              .then((response) => {
                setCustomForm(response.data.Data);
                setTableView(response.data.Tableview);
                setDupTableView(response.data.Tableview);
              })
              .catch((error) => {
                throw new Error('Error fetching data:', error);
              });
          })
          .catch((error) => {
            throw new Error('Error fetching data:', error);
          });
      } catch (error) {
        console.error('Update failed:', error);
      }
    }
    return columnsDrawer();
  };

  const [visibleColumns, setvisibleColumns] = useState();
  useEffect(() => {
    let visibleColumns = Object.keys(tableView || {}).filter(
      (key) => tableView[key]?.value
    );
    setvisibleColumns(visibleColumns);
  }, [tableView]);

  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (filterName, selectedValue) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [filterName]: selectedValue,
    }));
  };
  useEffect(() => {
    console.log("irshad", tableView, visibleColumns)
  })



  function formatTime(timeString) {
    const [hourStr, minuteStr] = timeString.split(':');
    const hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);
    if (isNaN(hours) || isNaN(minutes)) {
      return "Invalid time";
    }
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Handles midnight
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Ensures minutes are two digits
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    return formattedTime;
  }


  return (
    <div className='overflow-x-auto p-3'>
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
              onChange={(e) =>
                debouncedSetSearch({
                  context: 'SETTINGS',
                  data: e.target.value,
                })
              }
              type='search'
              id='default-search'
              className='block w-full px-4 py-2 ps-10 text-sm border-2 border-gray-200  rounded-2xl bg-gray-50  focus:outline-none '
              placeholder='Search here...'
              required
            />
          </div>
        </div>
        <div className='grid1-item text-end md:flex md:justify-end filter_pagination'>
          <select
            defaultValue='10'
            onChange={handlePerPageChange}
            className='focus:outline-none me-3 gap-x-1.5 rounded-md bg-gray-50 px-1 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50'
          >
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
            <option value='250'>250</option>
            <option value='500'>500</option>
          </select>

          <button
            onClick={columnsDrawer}
            className=' focus:outline-none me-3 gap-x-1.5 rounded-md bg-orange-600 px-4 py-2 text-sm font-[500] text-white shadow-md  hover:shadow-lg'
          >
            Columns
          </button>

          {/* for coloumns open */}
          <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 ${columnsDrawerOpen ? '' : 'opacity-0 pointer-events-none'
              }`}
            style={{ transition: 'opacity 0.3s ease-in-out' }}
          >
            <div
              className='fixed inset-y-0 right-0 w-11/12 md:w-4/12 lg:w-1/5 xl:w-1/5 bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out h-screen overflow-scroll'
              style={{
                transform: `translateX(${columnsDrawerOpen ? '0%' : '100%'})`,
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              <div className='flex justify-between px-5 py-4 bg-gray-100 '>
                <h5 className='font-[500]'>Columns</h5>
                <button
                  onClick={columnsDrawer}
                  className=''
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-5 h-5 text-gray-500'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>
              <hr className='h-1 w-full' />

              <div className='px-4 py-2.5 h-[615px] overflow-auto flex-wrap'>
                {dupTableView &&
                  Object.keys(dupTableView).map((columnName) => (
                    <div
                      key={columnName}
                      className='flex items-center gap-2'
                    >
                      <input
                        className={classNames(
                          tableView[columnName].value
                            ? 'bg-gray-100 text-gray-700 hover:text-black'
                            : 'text-gray-700 bg-gray-100 hover:text-black',
                          'appearance-none border border-gray-300 hover:border-gray-900 checked:hover:border-white rounded-md checked:bg-orange-600 checked:border-transparent w-4 h-4 cursor-pointer hover:text-black relative' // added 'relative' class
                        )}
                        type='checkbox'
                        id={columnName}
                        checked={dupTableView[columnName].value}
                        onChange={() => handleColumnsCheckboxChange(columnName)}
                      />

                      <label
                        htmlFor={columnName}
                        className='cursor-pointer text-md py-1 text-left'
                      >
                        {dupTableView[columnName].label}
                      </label>
                    </div>
                  ))}
              </div>

              <div className='bg-gray-100 flex justify-between px-3 pt-3 pb-2 w-full'>
                <button
                  className='mr-3 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white '
                  onClick={handleColumnsApply}
                >
                  Apply
                </button>
                {role === 'admin' && (
                  <button
                    className='mr-3 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white'
                    onClick={handleColumnsSave}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={filterDrawer}
            className='transition-opacity duration-500 focus:outline-none me-3 gap-x-1.5 mt-1 md:mt-0 rounded-md bg-orange-600 px-4 py-2 text-sm font-[500] text-white shadow-md  hover:shadow-lg'
          >
            Filters
          </button>

          {/* for filter open */}
          <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 ${filterDrawerOpen ? '' : 'opacity-0 pointer-events-none'
              }`}
            style={{ transition: 'opacity 0.3s ease-in-out' }}
          >
            <div
              className='fixed inset-y-0 right-0 w-11/12 md:w-4/12 lg:w-1/5 xl:w-w-1/5   bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out h-screen overflow-scroll'
              style={{
                transform: `translateX(${filterDrawerOpen ? '0%' : '100%'})`,
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              <div className=' flex justify-between px-5 py-4 bg-gray-100'>
                <h5 className='font-[500] '> Filters</h5>
                <button
                  onClick={filterDrawer}
                  className=''
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-5 h-5 text-gray-500'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>
              <div className='h-[615px] overflow-auto'>
                <div className='text-start p-3 '>
                  {/* {filter.label} */}
                  {filterableInputsInBox?.map((filter, index) => (
                    <div
                      key={index}
                      className=''
                    >
                      {filter.options && (
                        <div>
                          <label className='mb-4 text-sm text-[#878a99] font-medium'>
                            {' '}
                            {filter.label.charAt(0).toUpperCase() +
                              filter.label.slice(1)}
                          </label>

                          <select
                            id={filter.inputname}
                            name={filter.inputname}
                            className='px-3 py-2 my-2 text-xs block w-full bg-gray-50 rounded-md text-gray-900 border border-1 border-[#e9ebec] placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6'
                            onChange={(e) =>
                              handleFilterChange(
                                filter.inputname,
                                e.target.value
                              )
                            }
                            value={selectedFilters[filter.inputname] || ''}
                          >
                            <option
                              value=''
                              disabled
                              defaultValue
                            >
                              Please select
                            </option>
                            {filter.options &&
                              filter.options.type === 'custom' &&
                              filter.options.value &&
                              filter.options.value.map((option, index) => (
                                <option
                                  key={index}
                                  value={option}
                                >
                                  {option}
                                </option>
                              ))}
                            {filter.options &&
                              filter.options.type === 'predefined' &&
                              filter.options.value &&
                              fieldsDropDownData[filter.options.value]?.map(
                                (option, index) => (
                                  <option
                                    key={index}
                                    value={option}
                                  >
                                    {option}
                                  </option>
                                )
                              )}
                          </select>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className='bg-gray-100 flex justify-between px-3 pt-3 pb-2 w-full'>
                <button
                  onClick={handleFilterReset}
                  className='mr-3 px-3 py-2 inline-flex  whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white '
                >
                  Clear
                </button>
                <button
                  onClick={handlefilters}
                  className='mr-3 px-3 py-2 inline-flex  whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white '
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* table */}
      <div className='max-h-[510px] overflow-y-scroll mt-8'>
        {visibleColumns && tableView && settings?.paginatedUsers && (
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
              {settings?.paginatedUsers &&
                settings?.paginatedUsers?.map((row) => (

                  <tr key={row.id}>
                    {visibleColumns.map((key) => {
                      let value = row[key]

                      if (tableView[key].type === "time" && row[key]) {
                        value = formatTime(row[key])
                      }
                      if (tableView[key].type === "date" && row[key]) {
                        value = new Date(row[key]);
                        const day = value.getUTCDate();
                        const monthIndex = value.getUTCMonth();
                        const year = value.getUTCFullYear();

                        const monthAbbreviations = [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ];

                        // Formatting the date
                        value = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]}-${year}`;

                      }
                      return (
                        <td
                          key={key}
                          className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium overflow-hidden  ${row.userstatus
                            ? 'text-gray-800 '
                            : 'bg-gray-100 text-gray-300'
                            }`}
                          style={{ maxWidth: '160px' }}
                          title={row[key]}
                        >
                          <p className='truncate text-xs '> {value}</p>
                        </td>
                      )

                    })}

                    <td
                      className={`px-2 py-2  border border-[#e5e7eb] text-xs font-medium  ${row.userstatus
                        ? 'text-gray-800 '
                        : 'bg-gray-100 text-gray-300'
                        }`}
                      style={{ maxWidth: '160px' }}
                    >
                      <div className='flex justify-start gap-3'>
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === 'user' && permission.canCreate
                          }
                        >
                          <button
                            type='button'
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
                            permission.module === 'user' && permission.canUpdate
                          }
                        >
                          <button
                            type='button'
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
                            permission.module === 'user' && permission.canUpdate
                          }
                        >
                          {(
                            <button
                              type='button'
                              onClick={() => handleDeleteUser(row.id)}
                              disabled={userId == row.id ? true : false}
                              className={` ${userId == row.id
                                ? 'text-gray-500 bg-gray-50 cursor-not-allowed'
                                : 'bg-gray-50 text-[#475569] hover:text-orange-500'
                                } inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] disabled:opacity-50   dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 `}
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
                          )}
                        </GateKeeper>
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === 'user' && permission.canUpdate
                          }
                        >
                          {/* className='items-center  text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600' */}
                          {(
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
                          )}
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
        <div className='flex justify-between'>
          <div className=''>
            {!settings?.paginatedUsers ||
              settings?.paginatedUsers?.length === 0 ? (
              'no data to show'
            ) : settings.loading ? (
              'Loading...'
            ) : (
              <p className='text-sm text-gray-700'>
                Showing {settings.startUser} to {settings.endUser} of{' '}
                <span className='font-medium'>{settings.totalUsers}</span>
                <span className='font-medium'> </span> results
              </p>
            )}
          </div>
          <section
            className='isolate inline-flex rounded-md shadow-sm ms-4'
            aria-label='Pagination'
          >
            {/* previos button */}
            <button
              disabled={
                settings.loading ? true : false || settings.currentPage === 1
              }
              onClick={() =>
                debouncedSetPage({
                  context: 'SETTINGS',
                  data: settings.currentPage - 1,
                })
              }
              href='#'
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${settings.loading
                ? 'cursor-wait'
                : settings.currentPage === 1
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
                settings.loading
                  ? true
                  : false || settings.currentPage === settings.totalPages
              }
              onClick={() =>
                debouncedSetPage({
                  context: 'SETTINGS',
                  data: settings.currentPage + 1,
                })
              }
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${settings.loading
                ? 'cursor-wait'
                : settings.currentPage === settings.totalPages
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
