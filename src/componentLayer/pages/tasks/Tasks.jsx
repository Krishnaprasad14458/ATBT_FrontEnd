import React, { useState, useRef, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
function Tasks() {
  document.title = "ATBT | Task";
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  // for calendar
  const localizer = momentLocalizer(moment);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [events, setEvents] = useState([
    {
      title: "Event 1",
      start: new Date(2024, 0, 17, 10, 0),
      end: new Date(2024, 0, 17, 12, 0),
    },
  ]);
  useEffect(() => {
    console.log("events", events);
  }, [events]);
  const [newtask, setNewTask] = useState("");
  const [newtaskStartDate, setnewtaskStartDate] = useState("");
  const [newtaskEndDate, setnewtaskEndDate] = useState("");
  const handleSelect = ({ start, end }) => {
    setOpen(true);
    setnewtaskStartDate(start);
    setnewtaskEndDate(end);
    setNewTask("");
  };
  const handleSave = () => {
    setOpen(false);
    if (newtask) {
      const newEvent = {
        title: newtask,
        start: newtaskStartDate,
        end: newtaskEndDate,
      };
      setEvents([...events, newEvent]);
      setNewTask("");
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const [addTask, setAddTask] = useState(false);
  const toggleAddTaskDrawer = () => {
    setAddTask(!addTask);
  };
  const [overViewNewTask, setOverViewNewTask] = useState(false);
  const handleOverViewNewTask = () => {
    setOverViewNewTask(!overViewNewTask);
  };
  return (
    <div className=" p-4 bg-[#f8fafc] ">
      <h4 className=" font-semibold text-lg grid1-item">Tasks</h4>
      <div className="mt-2">
        <div className="flex overflow-x-auto">
          <div
            className={`cursor-pointer px-4 py-1 text-md font-semibold  ${
              activeTab === 1 ? "border-b-2 border-orange-600 text-black" : ""
            }`}
            onClick={() => handleTabClick(1)}
          >
            Active
          </div>

          <div
            className={`cursor-pointer px-4 py-1 text-md font-semibold  ${
              activeTab === 2 ? "border-b-2 border-orange-600 text-black" : ""
            }`}
            onClick={() => handleTabClick(2)}
          >
            Due
          </div>
          <div
            className={`cursor-pointer px-4 py-1 text-md font-semibold  ${
              activeTab === 3 ? "border-b-2 border-orange-600 text-black" : ""
            }`}
            onClick={() => handleTabClick(3)}
          >
            Completed
          </div>
          <div
            className={`cursor-pointer px-4 py-1 text-md font-semibold  ${
              activeTab === 4 ? "border-b-2 border-orange-600 text-black" : ""
            }`}
            onClick={() => handleTabClick(4)}
          >
            Master
          </div>
        </div>
        <hr />
      </div>
      {activeTab === 1 && (
        <div className="max-h-[510px] overflow-y-scroll mt-8">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md">
            <thead>
              <tr>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200 ">
                  S.No
                </th>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200 ">
                  Date of Board Meeting
                </th>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200 ">
                  Decision Taken
                </th>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200 ">
                  Person Responsible for implementation
                </th>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                  Person Responsible
                </th>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                  Update Decision - User
                </th>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                  Update Decision - Admin
                </th>
              </tr>
            </thead>
            <tbody className=" divide-gray-200 dark:divide-gray-700">
              <tr>
                <td
                  className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                  style={{ maxWidth: "160px" }}
                  title=""
                >
                  <p className="truncate text-xs"> 1</p>
                </td>
                <td
                  className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                  style={{ maxWidth: "160px" }}
                  title=""
                >
                  <p className="truncate text-xs">5/10/2023 </p>
                </td>
                <td
                  className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                  style={{ maxWidth: "160px" }}
                  title=""
                >
                  <p className="truncate text-xs">
                    {" "}
                    To have lock to avoid sale with out inventory by 12th May,
                    2023
                  </p>
                </td>
                <td
                  className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                  style={{ maxWidth: "160px" }}
                  title=""
                >
                  <p className="truncate text-xs">
                    {" "}
                    Mr. Gopi and Mr. P.V. Ramana
                  </p>
                </td>
                <td
                  className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                  style={{ maxWidth: "160px" }}
                  title=""
                >
                  <p className="truncate text-xs">
                    {" "}
                    Mr. Gopi and Mr. P.V. Ramana
                  </p>
                </td>
                <td
                  className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                  style={{ maxWidth: "160px" }}
                  title=""
                >
                  <p className="truncate text-xs"> In-Progress</p>
                </td>
                <td
                  className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                  style={{ maxWidth: "160px" }}
                  title=""
                >
                  <p className="truncate text-xs"> Complete by today EOD</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        // <div className=''>
        //   <div className='flex justify-end my-2'>
        //     <Menu
        //       as='div'
        //       className='relative inline-block ms-3 mt-1'
        //     >
        //       <div className=''>
        //         <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50'>
        //           Filters
        //           <ChevronDownIcon
        //             className='-mr-1 h-5 w-5 text-gray-400'
        //             aria-hidden='true'
        //           />
        //         </Menu.Button>
        //       </div>

        //       <Transition
        //         as={Fragment}
        //         enter='transition ease-out duration-100'
        //         enterFrom='transform opacity-0 scale-95'
        //         enterTo='transform opacity-100 scale-100'
        //         leave='transition ease-in duration-75'
        //         leaveFrom='transform opacity-100 scale-100'
        //         leaveTo='transform opacity-0 scale-95'
        //       >
        //         <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
        //           <div className='py-1'>
        //             <Menu.Item>
        //               {({ active }) => (
        //                 <Link
        //                   to='#'
        //                   className={classNames(
        //                     active
        //                       ? 'bg-gray-100 text-gray-900'
        //                       : 'text-gray-700',
        //                     'block px-4 py-2 text-sm text-left'
        //                   )}
        //                 >
        //                   Account settings
        //                 </Link>
        //               )}
        //             </Menu.Item>
        //             <Menu.Item>
        //               {({ active }) => (
        //                 <Link
        //                   to='#'
        //                   className={classNames(
        //                     active
        //                       ? 'bg-gray-100 text-gray-900'
        //                       : 'text-gray-700',
        //                     'block px-4 py-2 text-sm text-left'
        //                   )}
        //                 >
        //                   Support
        //                 </Link>
        //               )}
        //             </Menu.Item>
        //             <Menu.Item>
        //               {({ active }) => (
        //                 <Link
        //                   to='#'
        //                   className={classNames(
        //                     active
        //                       ? 'bg-gray-100 text-gray-900'
        //                       : 'text-gray-700',
        //                     'block px-4 py-2 text-sm text-left'
        //                   )}
        //                 >
        //                   License
        //                 </Link>
        //               )}
        //             </Menu.Item>
        //           </div>
        //         </Menu.Items>
        //       </Transition>
        //     </Menu>
        //     <Menu
        //       as='div'
        //       className='relative inline-block ms-3 mt-1'
        //     >
        //       <div className=''>
        //         <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50'>
        //           Sort
        //           <ChevronDownIcon
        //             className='-mr-1 h-5 w-5 text-gray-400'
        //             aria-hidden='true'
        //           />
        //         </Menu.Button>
        //       </div>

        //       <Transition
        //         as={Fragment}
        //         enter='transition ease-out duration-100'
        //         enterFrom='transform opacity-0 scale-95'
        //         enterTo='transform opacity-100 scale-100'
        //         leave='transition ease-in duration-75'
        //         leaveFrom='transform opacity-100 scale-100'
        //         leaveTo='transform opacity-0 scale-95'
        //       >
        //         <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
        //           <div className='py-1'>
        //             <Menu.Item>
        //               {({ active }) => (
        //                 <Link
        //                   to='#'
        //                   className={classNames(
        //                     active
        //                       ? 'bg-gray-100 text-gray-900'
        //                       : 'text-gray-700',
        //                     'block px-4 py-2 text-sm text-left'
        //                   )}
        //                 >
        //                   Start
        //                 </Link>
        //               )}
        //             </Menu.Item>
        //             <Menu.Item>
        //               {({ active }) => (
        //                 <Link
        //                   to='#'
        //                   className={classNames(
        //                     active
        //                       ? 'bg-gray-100 text-gray-900'
        //                       : 'text-gray-700',
        //                     'block px-4 py-2 text-sm text-left'
        //                   )}
        //                 >
        //                   Due
        //                 </Link>
        //               )}
        //             </Menu.Item>
        //             <Menu.Item>
        //               {({ active }) => (
        //                 <Link
        //                   to='#'
        //                   className={classNames(
        //                     active
        //                       ? 'bg-gray-100 text-gray-900'
        //                       : 'text-gray-700',
        //                     'block px-4 py-2 text-sm text-left'
        //                   )}
        //                 >
        //                   Assigned
        //                 </Link>
        //               )}
        //             </Menu.Item>
        //           </div>
        //         </Menu.Items>
        //       </Transition>
        //     </Menu>
        //     <div>
        //       <button className=' ms-2 create-btn mt-1 inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  text-orange-foreground shadow hover:bg-orange/90 h-9 px-3 py-1 shrink-0 bg-orange-600 text-white gap-1'>
        //         <svg
        //           xmlns='http://www.w3.org/2000/svg'
        //           viewBox='0 0 20 20'
        //           fill='currentColor'
        //           className='w-5 h-5 '
        //         >
        //           <path d='M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z' />
        //         </svg>
        //         Add Task
        //       </button>
        //     </div>
        //   </div>
        //   <div className='overflow-x-auto'>
        //     <table className='w-full border-collapse border border-slate-200 mt-1 table-auto'>
        //       <thead>
        //         <tr>
        //           <th
        //             scope='col'
        //             className='py-2 text-sm text-white bg-orange-600  border-collapse border border-[#e5e7eb] '
        //           >
        //             Task Name
        //           </th>
        //           <th
        //             scope='col'
        //             className='py-2 text-sm text-white bg-orange-600  border-collapse border border-[#e5e7eb] '
        //           >
        //             Assignee
        //           </th>
        //           <th
        //             scope='col'
        //             className='py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb]'
        //           >
        //             Due Date
        //           </th>
        //           <th
        //             scope='col'
        //             className='py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb]'
        //           >
        //             Board Meetings
        //           </th>
        //           <th
        //             scope='col'
        //             className='py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb] '
        //           >
        //             Status
        //           </th>
        //           <th
        //             scope='col'
        //             className='py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb] '
        //           >
        //             Created by Admin
        //           </th>
        //           <th
        //             scope='col'
        //             className='py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb] '
        //           >
        //             Updated by Admin{' '}
        //           </th>
        //         </tr>
        //       </thead>
        //       <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
        //         <tr className='text-center text-gray-500'>
        //           <td
        //             scope='col'
        //             onClick={toggleDrawer}
        //             className='flex justify-between py-2 text-sm border-collapse border border-[#e5e7eb]'
        //           >
        //             <div className='flex'>
        //               <svg
        //                 xmlns='http://www.w3.org/2000/svg'
        //                 fill='none'
        //                 viewBox='0 0 24 24'
        //                 stroke-width='1.5'
        //                 stroke='currentColor'
        //                 className='w-5 h-5 ms-2'
        //               >
        //                 <path
        //                   stroke-linecap='round'
        //                   stroke-linejoin='round'
        //                   d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
        //                 />
        //               </svg>
        //               <span className='text-sm ms-2'>Draft task brief</span>
        //             </div>
        //             <div className=''>
        //               <svg
        //                 xmlns='http://www.w3.org/2000/svg'
        //                 viewBox='0 0 24 24'
        //                 fill='currentColor'
        //                 className='w-5 h-5 text-end'
        //               >
        //                 <path
        //                   fillRule='evenodd'
        //                   d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
        //                   clipRule='evenodd'
        //                 />
        //               </svg>
        //             </div>
        //           </td>
        //           <td
        //             scope='col'
        //             className='py-2 text-sm border-collapse border border-[#e5e7eb]'
        //           >
        //             Assignee
        //           </td>
        //           <td
        //             scope='col'
        //             className='py-2 text-sm border-collapse border border-[#e5e7eb]'
        //           >
        //             Due Date
        //           </td>
        //           <td
        //             scope='col'
        //             className='py-2 text-sm border-collapse border border-[#e5e7eb]'
        //           >
        //             Board Meetings
        //           </td>
        //           <td
        //             scope='col'
        //             className='py-2 text-sm border-collapse border border-[#e5e7eb] '
        //           >
        //             Status
        //           </td>
        //           <td
        //             scope='col'
        //             className='py-2 text-sm border-collapse border border-[#e5e7eb] '
        //           >
        //             Created by User{' '}
        //           </td>
        //           <td
        //             scope='col'
        //             className='py-2 text-sm border-collapse border border-[#e5e7eb] '
        //           >
        //             Updated by Admin{' '}
        //           </td>
        //         </tr>

        //         {addTask && (
        //           <tr className='text-center text-gray-500'>
        //             <td
        //               scope='col'
        //               className='flex justify-between py-2 text-sm border-collapse border border-[#e5e7eb]'
        //             >
        //               <div className='flex w-full gap-2'>
        //                 <svg
        //                   xmlns='http://www.w3.org/2000/svg'
        //                   fill='none'
        //                   viewBox='0 0 24 24'
        //                   stroke-width='1.5'
        //                   stroke='currentColor'
        //                   className='w-5 h-5 ms-2'
        //                 >
        //                   <path
        //                     stroke-linecap='round'
        //                     stroke-linejoin='round'
        //                     d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
        //                   />
        //                 </svg>{' '}
        //                 <input
        //                   className='w-full bg-gray-50 border-none  focus:outline-none'
        //                   type='text'
        //                   placeholder='Write a Task Name'
        //                 />
        //               </div>

        //               <svg
        //                 onClick={handleOverViewNewTask}
        //                 xmlns='http://www.w3.org/2000/svg'
        //                 viewBox='0 0 24 24'
        //                 fill='currentColor'
        //                 className='w-5 h-5 text-end'
        //               >
        //                 <path
        //                   fillRule='evenodd'
        //                   d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
        //                   clipRule='evenodd'
        //                 />
        //               </svg>
        //             </td>
        //             <td
        //               scope='col'
        //               className='py-2 text-sm border-collapse border border-[#e5e7eb]'
        //             >
        //               Assignee
        //             </td>
        //             <td
        //               scope='col'
        //               className='py-2 text-sm border-collapse border border-[#e5e7eb]'
        //             >
        //               <input
        //                 className='w-full bg-gray-50 border-none  focus:outline-none'
        //                 type='date'
        //                 placeholder='Due Date'
        //               />
        //             </td>
        //             <td
        //               scope='col'
        //               className='py-2 text-sm border-collapse border border-[#e5e7eb]'
        //             >
        //               Board Meetings
        //             </td>
        //             <td
        //               scope='col'
        //               className='py-2 text-sm border-collapse border border-[#e5e7eb] '
        //             >
        //               Status
        //             </td>
        //             <td
        //               scope='col'
        //               className='py-2 text-sm border-collapse border border-[#e5e7eb] '
        //             >
        //               Created by Admin{' '}
        //             </td>
        //             <td
        //               scope='col'
        //               className='py-2 text-sm border-collapse border border-[#e5e7eb] '
        //             >
        //               Updated by Admin{' '}
        //             </td>
        //           </tr>
        //         )}
        //         <tr className='text-center text-gray-500'>
        //           <td className='py-2 border-slate-200 flex justify-start ms-4 text-sm'>
        //             <input
        //               className='w-full bg-gray-50 border-none focus:outline-none'
        //               type='text'
        //               placeholder='Add Task ..'
        //               onClick={toggleAddTaskDrawer}
        //             />
        //           </td>
        //           <td
        //             className='border text-sm'
        //             colspan='7'
        //           ></td>
        //         </tr>
        //         <div
        //           className={`fixed inset-0 transition-all duration-500 bg-gray-800 bg-opacity-50 z-50 ${
        //             overViewNewTask ? '' : 'hidden'
        //           }`}
        //         >
        //           <div className='p-3 fixed inset-y-0 right-0 w-1/2 bg-white shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out'>
        //             <div className='flex justify-between'>
        //               <p className='text-xs rounded-md border-2 border-gray-100 flex p-1'>
        //                 <svg
        //                   xmlns='http://www.w3.org/2000/svg'
        //                   viewBox='0 0 16 16'
        //                   fill='currentColor'
        //                   className='w-4 h-4'
        //                 >
        //                   <path
        //                     fill-rule='evenodd'
        //                     d='M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z'
        //                     clip-rule='evenodd'
        //                   />
        //                 </svg>
        //                 Mark Complete
        //               </p>
        //               <button
        //                 onClick={handleOverViewNewTask}
        //                 className=''
        //               >
        //                 <svg
        //                   xmlns='http://www.w3.org/2000/svg'
        //                   viewBox='0 0 24 24'
        //                   fill='currentColor'
        //                   className='w-5 h-5 text-gray-500'
        //                 >
        //                   <path
        //                     fillRule='evenodd'
        //                     d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
        //                     clipRule='evenodd'
        //                   />
        //                 </svg>
        //               </button>
        //             </div>
        //           </div>
        //         </div>

        //         <div
        //           className={`fixed inset-0 transition-all duration-500 bg-gray-800 bg-opacity-50 z-50 ${
        //             isOpen ? '' : 'hidden'
        //           }`}
        //         >
        //           <div className='p-3 fixed inset-y-0 right-0 w-4/12 bg-white shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out'>
        //             <div className='flex justify-start'>
        //               <div className='relative inline-block ms-2'>
        //                 <select className='block appearance-none w-full bg-white text-sm border border-gray-300 hover:border-gray-300 px-1 py-1.5 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
        //                   <option value='option1'>Select Status</option>
        //                   <option value='option2'>Completed</option>
        //                   <option value='option3'>Inprogress</option>
        //                   <option value='option4'>To Do</option>
        //                 </select>
        //                 <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
        //                   <svg
        //                     className='fill-current h-4 w-4'
        //                     xmlns='http://www.w3.org/2000/svg'
        //                     viewBox='0 0 20 20'
        //                   >
        //                     <path d='M7 7l3-3 3 3m0 6l-3 3-3-3'></path>
        //                   </svg>
        //                 </div>
        //               </div>
        //               <div className='absolute top-4 right-4 flex flex-row'>
        //                 <svg
        //                   xmlns='http://www.w3.org/2000/svg'
        //                   fill='none'
        //                   viewBox='0 0 24 24'
        //                   stroke-width='1.5'
        //                   stroke='currentColor'
        //                   className='w-5 h-5 me-4 text-gray-500'
        //                 >
        //                   <path
        //                     stroke-linecap='round'
        //                     stroke-linejoin='round'
        //                     d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
        //                   />
        //                 </svg>
        //                 <svg
        //                   xmlns='http://www.w3.org/2000/svg'
        //                   viewBox='0 0 24 24'
        //                   fill='currentColor'
        //                   className='me-4 w-5 h-5 text-gray-500'
        //                 >
        //                   <path
        //                     fill-rule='evenodd'
        //                     d='M18.97 3.659a2.25 2.25 0 0 0-3.182 0l-10.94 10.94a3.75 3.75 0 1 0 5.304 5.303l7.693-7.693a.75.75 0 0 1 1.06 1.06l-7.693 7.693a5.25 5.25 0 1 1-7.424-7.424l10.939-10.94a3.75 3.75 0 1 1 5.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 0 1 5.91 15.66l7.81-7.81a.75.75 0 0 1 1.061 1.06l-7.81 7.81a.75.75 0 0 0 1.054 1.068L18.97 6.84a2.25 2.25 0 0 0 0-3.182Z'
        //                     clip-rule='evenodd'
        //                   />
        //                 </svg>
        //                 <svg
        //                   xmlns='http://www.w3.org/2000/svg'
        //                   viewBox='0 0 24 24'
        //                   fill='currentColor'
        //                   className='w-5 h-5 me-4 text-gray-500'
        //                 >
        //                   <path
        //                     fillRule='evenodd'
        //                     d='M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z'
        //                     clipRule='evenodd'
        //                   />
        //                 </svg>
        //                 <button
        //                   onClick={toggleDrawer}
        //                   className=''
        //                 >
        //                   <svg
        //                     xmlns='http://www.w3.org/2000/svg'
        //                     viewBox='0 0 24 24'
        //                     fill='currentColor'
        //                     className='w-5 h-5 text-gray-500'
        //                   >
        //                     <path
        //                       fillRule='evenodd'
        //                       d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
        //                       clipRule='evenodd'
        //                     />
        //                   </svg>
        //                 </button>
        //               </div>
        //             </div>
        //             <div className='mt-5 ms-3'>
        //               <p className='text-xl font-semibold'>Bhavitha</p>
        //               <div className='mt-5 flex flex-row'>
        //                 <p className='basis-1/4 text-sm text-gray-600'>
        //                   Assignee
        //                 </p>
        //                 <p className='basis-1/2 text-sm  flex flex-row'>
        //                   {' '}
        //                   <p className='bg-yellow-500 text-black py-1.5 w-8 h-8  rounded-full'>
        //                     <span className='flex justify-center text-gray-800 text-sm'>
        //                       BA
        //                     </span>
        //                   </p>
        //                   <span className='ms-2 mt-1 text-sm'>
        //                     {' '}
        //                     Bhavitha Agrawal
        //                   </span>
        //                 </p>
        //               </div>
        //               <div className='mt-5 flex flex-row'>
        //                 <p className='basis-1/4 text-sm text-gray-600'>
        //                   Due Date
        //                 </p>
        //                 <p className='basis-1/2 text-sm'>24/1/2024</p>
        //               </div>
        //               <div className='mt-5 flex flex-row'>
        //                 <p className='basis-1/4 text-sm text-gray-600'>
        //                   Entity
        //                 </p>
        //                 <p className='basis-1/2 text-sm'>Entity Text</p>
        //               </div>
        //               <div className='mt-5 flex flex-row'>
        //                 <p className='basis-1/4 text-sm text-gray-600'>
        //                   Board Meeting
        //                 </p>
        //                 <p className='basis-1/2 text-sm'>Board Meeting Text</p>
        //               </div>
        //               <div className='mt-5 flex flex-row'>
        //                 <p className='basis-1/4 text-sm text-gray-600  mt-1'>
        //                   Priority
        //                 </p>
        //                 <p className='basis-1/2'>
        //                   <div className='relative inline-block'>
        //                     <select className='block appearance-none w-full bg-white border text-sm border-gray-300 hover:border-gray-300 px-1 py-1.5 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
        //                       <option value='option1'>Select Priority</option>
        //                       <option value='option2'>Low</option>
        //                       <option value='option3'>Medium</option>
        //                       <option value='option4'>High</option>
        //                     </select>
        //                     <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
        //                       <svg
        //                         className='fill-current h-4 w-4'
        //                         xmlns='http://www.w3.org/2000/svg'
        //                         viewBox='0 0 20 20'
        //                       >
        //                         <path d='M7 7l3-3 3 3m0 6l-3 3-3-3'></path>
        //                       </svg>
        //                     </div>
        //                   </div>
        //                 </p>
        //               </div>
        //               <div className='mt-5 flex flex-row'>
        //                 <p className='basis-1/4 text-sm text-gray-600'>
        //                   Description
        //                 </p>
        //                 <p className='basis-1/2'></p>
        //               </div>
        //               <div className='mt-5'>
        //                 <textarea
        //                   placeholder='What is this task about ?'
        //                   className='p-3 text-sm resize-none shadow-sm rounded-md w-full h-32 focus:outline-none focus:border-orange-400'
        //                 ></textarea>
        //               </div>
        //               <div className='flex mt-5'>
        //                 <div className='me-2'>
        //                   <p className='bg-yellow-500 text-black py-1.5 w-8 h-8  rounded-full'>
        //                     <span className='flex justify-center text-gray-800 text-sm'>
        //                       BA
        //                     </span>
        //                   </p>
        //                 </div>
        //                 <div className='flex-1 w-86'>
        //                   <textarea
        //                     placeholder='Add a comment'
        //                     className='p-2 border-2 text-sm resize-none shadow-sm rounded-md w-full h-24 focus:outline-none focus:border-orange-400'
        //                   ></textarea>
        //                   <div className='me-2 flex flex-row'>
        //                     <p className='text-sm mt-1'>Collaborators</p>
        //                     <p className='ms-2 bg-yellow-500 text-black py-1.5 w-8 h-8 rounded-full'>
        //                       <span className='flex justify-center text-gray-800 text-sm'>
        //                         BA
        //                       </span>
        //                     </p>
        //                     <p className='ms-2 bg-white border-dashed border-2 border-gray-600 text-gray-600  py-1 w-7 h-7 rounded-full'>
        //                       <svg
        //                         xmlns='http://www.w3.org/2000/svg'
        //                         fill='none'
        //                         viewBox='0 0 24 24'
        //                         stroke-width='1.5'
        //                         stroke='currentColor'
        //                         className='ms-1 w-4 h-4'
        //                       >
        //                         <path
        //                           stroke-linecap='round'
        //                           stroke-linejoin='round'
        //                           d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
        //                         />
        //                       </svg>
        //                     </p>
        //                     <p className='ms-2 bg-white border-dashed border-2 border-gray-600 text-gray-600  py-1 w-7 h-7 rounded-full'>
        //                       <svg
        //                         xmlns='http://www.w3.org/2000/svg'
        //                         fill='none'
        //                         viewBox='0 0 24 24'
        //                         stroke-width='1.5'
        //                         stroke='currentColor'
        //                         className='ms-1 w-4 h-4'
        //                       >
        //                         <path
        //                           stroke-linecap='round'
        //                           stroke-linejoin='round'
        //                           d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
        //                         />
        //                       </svg>
        //                     </p>
        //                     <p>
        //                       <svg
        //                         xmlns='http://www.w3.org/2000/svg'
        //                         fill='none'
        //                         viewBox='0 0 24 24'
        //                         strokeWidth={1.5}
        //                         stroke='currentColor'
        //                         className='w-4 h-4 mt-2 ms-2'
        //                       >
        //                         <path
        //                           strokeLinecap='round'
        //                           strokeLinejoin='round'
        //                           d='M12 4.5v15m7.5-7.5h-15'
        //                         />
        //                       </svg>
        //                     </p>
        //                   </div>
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </tbody>
        //     </table>
        //   </div>
        //   <div></div>
        // </div>
      )}
      {activeTab === 2 && (
        <div className="max-h-[510px] overflow-y-scroll mt-8">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md">
            <thead>
              <tr>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200 ">
                  Task Name
                </th>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200 ">
                  Task Name
                </th>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200 ">
                  Task Name
                </th>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200 ">
                  Task Name
                </th>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className=" divide-gray-200 dark:divide-gray-700">
              <tr>
                <td>bhavitha</td>
                <td>bhavitha</td>
                <td>bhavitha</td>
                <td>bhavitha</td>
                <td>bhavitha</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {activeTab === 3 && (
        <div className="mt-4">
          <div className="max-h-[510px] overflow-y-scroll mt-8">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md">
              <thead>
                <tr>
                  <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200 ">
                    Task Name
                  </th>
                  <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200 ">
                    Task Name
                  </th>
                  <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200 ">
                    Task Name
                  </th>
                  <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200 ">
                    Task Name
                  </th>
                  <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td>bhavitha</td>
                  <td>bhavitha</td>
                  <td>bhavitha</td>
                  <td>bhavitha</td>
                  <td>bhavitha</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeTab === 4 && <p> Master</p>}
    </div>
  );
}

export default Tasks;
