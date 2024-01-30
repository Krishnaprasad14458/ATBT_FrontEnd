import React, { useState, useRef, useContext } from 'react';
import defprop from '../../../Images/defprof.svg';
import { Link } from 'react-router-dom';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function TaskForm() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  // for calendar
  const localizer = momentLocalizer(moment);
  const [open, setOpen] = useState(false)

  const cancelButtonRef = useRef(null)

  const [events, setEvents] = useState([
    {
      title: 'Event 1',
      start: new Date(2024, 0, 17, 10, 0),
      end: new Date(2024, 0, 17, 12, 0),
    },

  ]);



  return (
    <div className='container p-4 bg-[#f8fafc]'>
      {/* <p className="font-lg font-semibold p-3">Entity Form</p> */}
      <p className="text-lg font-semibold">New Task</p>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-3  gap-6 mt-4 ">
        <div className="col-span-1 ps-5 pe-8">
          <form className="space-y-3" method="POST" >
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Task Name</label>
              <div className="">
                <input id="name" name="Entite_Name" type="text" autoComplete="name" required className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 my-2 text-gray-900">Choose Logo</label>
              <input
                type="file"
                name="EntityPhoto"
                id="fileInput"
                className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                accept="image/*"

              />
            </div>

            <div>
              <label htmlFor="name" className=" block text-sm my-2 font-medium leading-6 text-gray-900" >Description</label>
              <div className=''>
                <textarea name='Description' class="resize-none bg-gray-50 rounded-md text-xs p-2 w-full h-20 border-2 border-gray-200 focus:outline-none focus:border-orange-400"></textarea>
              </div>
            </div>

            <div className='relative'>
              <label htmlFor="email" className="block text-sm my-2 font-medium leading-6 text-gray-900">Add Member</label>

              <div className='border border-1 flex flex-wrap gap-1 px-1 py-1 selected-users-container relative z-50 rounded-md'>

                <span className='flex gap-1 text-xs mt-1 border-2 border-gray-200 rounded-md p-0.5 focus:border-orange-600
                  '>
                  <img class="w-4 h-4 rounded-lg" src={defprop} alt="Neil image" /> dgsdfgd<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                    class="w-4 h-4 " >
                    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                  </svg>
                </span>


                <input
                  type="text"
                  tabindex="0" aria-describedby="lui_5891" aria-invalid="false"
                  style={{ border: "none" }}
                  className='bg-[#f8fafc] w-20 h-5 mt-1 focus:outline-none z-40'


                />
              </div>

            </div>
            <div className=''>
              <button type="submit"
                className="mt-6 flex w-full justify-center rounded-md bg-orange-600 px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Create Task</button>
            </div>
          </form>
        </div>

        <div className="col-span-2 h-[500px] overflow-auto shadow-md px-6 py-4 border-2 rounded-md bg-[#f8fafc]  ">
          <div className='mb-5 mt-3'>
            <div className="flex gap-4">
              <div className="group h-10 ">

                <img

                  name="EntityPhoto"
                  alt="Selected User Photo"
                  className="rounded-lg w-10 h-10 mr-4"
                />

              </div>
              <p class="text-lg font-black text-gray-800 mt-2"></p>

            </div>
            <hr className='my-3' />
            <div className='h-20 overflow-auto border border-1 border-gray-200 rounded-md p-2 bg-[#f8fafc] text-sm w-full  '>
              {/* <textarea className="resize-none h-20 border border-1 border-gray-200 focus:outline-none "> */}

              {/* </textarea> */}
            </div>


            <p className='text-md font-semibold my-3' > Members</p>

            <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-5'>


              {/* {entityform && entityform.entitymembers && entityform.entitymembers.length > 0 && entityform.entitymembers.map((member) => {
              let mail = member.split("@")[0]
              let first = "";
              let second = "";
              let firstLetter;
              let secondLetter;
              if (mail.includes(".")) {
                console.log("mail", mail)
                first = mail.split(".")[0]
                second = mail.split(".")[1]
                firstLetter = first[0]
                secondLetter = second[0]
                console.log("maivvvl", mail, first[0], second[0])
              }
              else {
                firstLetter = mail[0]
              }

              return (
                <div className='col-span-1 flex justify-start gap-3'>
                  <h5 className='bg-[#f87171] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'> {firstLetter.toUpperCase()}&nbsp;{secondLetter && secondLetter.toUpperCase()}</h5>
                  <p className='mt-1.5 font-thin  text-sm'>{mail}</p>
                </div>
              )

            })} */}

            </div>
          </div>
        </div>

      </div>
    </div>
    //   <div className='p-2 bg-[#f8fafc] overflow-hidden'>

    //     <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-col-3 gap-2 mt-2'>
    //       <h1 className='mx-3 font-semibold text-lg grid1-item'>Tasks</h1>
    //       <div className=' grid1-item w-96'>
    //         <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    //         <div className="relative">
    //           <div className="absolute inset-y-0 start-0 flex items-center p-2 pointer-events-none">
    //             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    //               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
    //             </svg>
    //           </div>
    //           <input type="search" id="default-search" className="block w-full px-4 py-2 ps-10 text-sm border-2 border-gray-200  rounded-full bg-gray-50  focus:outline-none " placeholder="Search here..." required />
    //         </div>
    //       </div>
    //       <div className='grid1-item text-end'>
    //         <Menu as="div" className="relative inline-block ">
    //           <div className=''>
    //             <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50">
    //               Filters
    //               <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
    //             </Menu.Button>
    //           </div>

    //           <Transition
    //             as={Fragment}
    //             enter="transition ease-out duration-100"
    //             enterFrom="transform opacity-0 scale-95"
    //             enterTo="transform opacity-100 scale-100"
    //             leave="transition ease-in duration-75"
    //             leaveFrom="transform opacity-100 scale-100"
    //             leaveTo="transform opacity-0 scale-95"
    //           >
    //             <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    //               <div className="py-1">
    //                 <Menu.Item>
    //                   {({ active }) => (
    //                     <Link
    //                       to="#"
    //                       className={classNames(
    //                         active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
    //                         'block px-4 py-2 text-sm'
    //                       )}
    //                     >
    //                       Account settings
    //                     </Link>
    //                   )}
    //                 </Menu.Item>
    //                 <Menu.Item>
    //                   {({ active }) => (
    //                     <Link
    //                       to="#"
    //                       className={classNames(
    //                         active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
    //                         'block px-4 py-2 text-sm'
    //                       )}
    //                     >
    //                       Support
    //                     </Link>
    //                   )}
    //                 </Menu.Item>
    //                 <Menu.Item>
    //                   {({ active }) => (
    //                     <Link
    //                       to="#"
    //                       className={classNames(
    //                         active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
    //                         'block px-4 py-2 text-sm'
    //                       )}
    //                     >
    //                       License
    //                     </Link>
    //                   )}
    //                 </Menu.Item>
    //                 <form method="POST" action="#">
    //                   <Menu.Item>
    //                     {({ active }) => (
    //                       <button
    //                         type="submit"
    //                         className={classNames(
    //                           active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
    //                           'block w-full px-4 py-2 text-left text-sm'
    //                         )}
    //                       >
    //                         Sign out
    //                       </button>
    //                     )}
    //                   </Menu.Item>
    //                 </form>
    //               </div>
    //             </Menu.Items>
    //           </Transition>
    //         </Menu>

    //       </div>
    //     </div>
    //     {/* tabs */}
    //     <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl-grid-col-2 mt-3'>
    //       <div className='grid1-item '>
    //         <Link to=""
    //           className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 1 ? 'border-b-4 border-orange-600  text-black' : ""
    //             }`}
    //           onClick={() => handleTabClick(1)}>List
    //         </Link>
    //         <Link to=""
    //           className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 2 ? 'border-b-4 border-orange-600  text-black' : ""
    //             }`}
    //           onClick={() => handleTabClick(2)}>Calendar
    //         </Link>
    //       </div>
    //       <div className='grid1-item'>
    //         <div className='text-end'>

    //           <button className="create-btn px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1">
    //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ">
    //               <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
    //             </svg>
    //             Add Task</button>
    //         </div>
    //       </div>

    //     </div>
    //   \
    //     {activeTab === 1 && <div className='mt-5'> dsjfmsjdn jdsmfjd </div>}
    //  \
    //     {activeTab === 2 && <div>

    //       <Calendar
    //         className='mt-2 focus:outline-none'
    //         localizer={localizer}
    //         events={events}
    //         startAccessor="start"
    //         endAccessor="end"
    //         style={{ height: 500 }}
    //         selectable
    //         onSelectSlot={handleSelect}
    //       />


    //       <Transition.Root show={open} as={Fragment}>
    //         <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
    //           <Transition.Child
    //             as={Fragment}
    //             enter="ease-out duration-300"
    //             enterFrom="opacity-0"
    //             enterTo="opacity-100"
    //             leave="ease-in duration-200"
    //             leaveFrom="opacity-100"
    //             leaveTo="opacity-0"
    //           >
    //             <div className="fixed  bg-gray-500 bg-opacity-75 transition-opacity" />
    //           </Transition.Child>

    //           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    //             <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
    //               <Transition.Child
    //                 as={Fragment}
    //                 enter="ease-out duration-300"
    //                 enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //                 enterTo="opacity-100 translate-y-0 sm:scale-100"
    //                 leave="ease-in duration-200"
    //                 leaveFrom="opacity-100 translate-y-0 sm:scale-100"
    //                 leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //               >
    //                 <Dialog.Panel className="relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
    //                   <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
    //                     <div className="sm:flex sm:items-start">
    //                       <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-orange-600 sm:mx-0 sm:h-10 sm:w-10">
    //                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white" aria-hidden="true">
    //                           <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
    //                         </svg>

    //                       </div>
    //                       <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
    //                         <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
    //                           Create New Task
    //                         </Dialog.Title>
    //                         <div className="mt-2">
    //                           <input placeholder='Enter Task Here' className=' focus:outline-none ps-2 mt-2 border-b-2 border-gray-200' onChange={(e) => setNewTask(e.target.value)} />
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4">
    //                     <button
    //                       type="button"
    //                       className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
    //                       onClick={() => setOpen(false)}
    //                       ref={cancelButtonRef}
    //                     >
    //                       Cancel
    //                     </button>
    //                     <button
    //                       type="button"
    //                       className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm  text-white shadow-sm  sm:ml-3 sm:w-auto"
    //                       onClick={handleSave}
    //                     >
    //                       Save
    //                     </button>

    //                   </div>
    //                 </Dialog.Panel>
    //               </Transition.Child>
    //             </div>
    //           </div>
    //         </Dialog>
    //       </Transition.Root>

    //     </div>}
    //   </div>
  );
}


export default TaskForm;
