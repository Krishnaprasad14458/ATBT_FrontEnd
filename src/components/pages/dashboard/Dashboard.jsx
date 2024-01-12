
import React, { useContext, useState } from 'react';
import './Dashboard.css';
import login_bg from '../../../Images/login_bg.jpg';
import logo from '../../../Images/logo.png';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../../../contexts/usersDataContext';
import { getDate } from '../../../utils/date';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Dashboard() {  
  const [search,setSearch] = useState("")
  const performSearch = (e) => {
    usersDispatch({
      type: "SET_SEARCH",
      payload: e.target.value
    })
    
  };
  getDate();
  const navigate = useNavigate()
  const data = [1, 2, 3, 4, 5]
  const { usersState: { users, pagination }, usersDispatch } = useContext(UserDataContext);
  console.log(pagination, 'pgnation')

// function Dashboard() {
//   const navigate = useNavigate()
//   const data = [1, 2, 3, 4, 5]
//   const { usersState: { users } } = useContext(UserDataContext);

  // --modal
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [isOpen, setIsOpen] = useState(false);
  // const [designation, setDesignation] = useState('');
  // const [selectedOption2, setSelectedOption2] = useState('');
  // const [selectedOption3, setSelectedOption3] = useState('');

  const designationOptions = ['Option 1A', 'Option 1B', 'Option 1C'];
  const departmentOptions = ['Option 2A', 'Option 2B', 'Option 2C'];
  const branchOptions = ['Option 3A', 'Option 3B', 'Option 3C'];

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [reportto, setReportto] = useState('');
  const [profile, setProfile] = useState('');
  const [branch, setBranch] = useState('');

  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullname) {
      alert("please enter the name");
      return;
    }
    if (!email) {
      alert("please  enter email id");
      return;
    } else {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailPattern.test(email)) {
        alert("Invalid Email Address");
        return;
        // errors.email = 'Invalid email address';
      }
    }
    if (!phonenumber) {
      alert("please enter mobilenumber");
      return;
    } else {
      if (phonenumber.length != 10) {
        alert("incorrect mobile number");
        return;
      }
    }
    if (!designation) {
      alert("please enter the designation");
      return;
    }
    if (!department) {
      alert("please enter the department");
      return;
    }
    if (!reportto) {
      alert("please enter the reportto");
      return;
    }
    if (!profile) {
      alert("please enter the profile");
      return;
    }
    if (!branch) {
      alert("please enter the branch");
      return;
    }

    if (Object.keys(newErrors).length === 0) {
      let user = {
        fullname,
        email,
        phonenumber,
        designation,
        department,
        reportto,
        profile,
        branch,
        // user_remarks_history,
        // user_status,
      };

      console.log("User Data:", user); // Log the user data being sent
      user = [user];
      const dataWithTitleCase = user.map((item) => {
        const newItem = {};

        for (const key in item) {
          if (Object.prototype.hasOwnProperty.call(item, key)) {
            if (typeof item[key] === "string" && key !== "email") {
              newItem[key] = item[key]
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            } else {
              newItem[key] = item[key];
            }
          }
        }

        return newItem;
      });
      user = dataWithTitleCase[0];

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/createUser`,
        {
          method: "POST",
          body: JSON.stringify(user),

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response); // Log the response from the server

      const json = await response.json();

      console.log("JSON Response:", json); // Log the parsed JSON response

      if (json.Status == "exists") {
        alert("Email already exists.");
        return false;
      }
      if (response.ok) {
        // let parseJson = json;
        // parseJson.user_remarks_history = JSON.parse(json.user_remarks_history);
        // console.log(parseJson);

        const id = json.Result.insertId;
        json.reqBody.id = id;
        // dispatch({ type: "CREATE_USER", payload: json.reqBody });

        console.log("User created successfully.", user);
        alert("User created successfully.");
        // Reset the form fields
        setFullname("");
        setEmail("");
        setPhonenumber("");
        setDesignation("");
        setDepartment("");
        setReportto("");
        setProfile("");
        setBranch("");
        navigate("/usersdata");
      }
    }
  };
  return (
    <div className="container p-2 bg-[#f8fafc] ">
      <h1 className='m-2 font-semibold text-lg'>Home</h1>
      <div className='text-center '>

        <h6 class="text-md date_time">{getDate()}</h6>

        <h4 class=" text-3xl font-normal dark:text-white welcome_user">Welcome { }</h4>

        <div className='flex flex-wrap mt-4 justify-center'>

          <div className="tota_tasks border-r-2 border-black-100 bg-gray-100 p-2 rounded-s-full">
            <h6 className='mr-4 ml-4 px-2 pt-1 text-xs text-[#929297]'>Total Tasks</h6>
            <p className='mr-4 ml-4 px-2 font-semibold'>1,000</p>
          </div>

          <div className=" completed_tasks border-r-2 border-black-100 bg-gray-100 p-2">
            <h6 className='mr-4 ml-4 px-2 pt-1 text-xs text-[#929297]'>Completed Tasks</h6>
            <p className='mr-4 ml-4 px-2 font-semibold'>1,000</p>
          </div>
          <div className=" upcoming_tasks border-r-2 border-black-100 bg-gray-100 p-2">
            <h6 className='mr-4 ml-4 px-2 pt-1 text-xs text-[#929297]'>Upcoming Tasks</h6>
            <p className='mr-4 ml-4 px-2 font-semibold'>1,000</p>
          </div>
          <div className=" overdue_tasks border-black-100 bg-gray-100 p-2 rounded-e-full">
            <h6 className='mr-4 ml-4 px-2 pt-1 text-xs text-[#929297]'>Overdue Tasks</h6>
            <p className='mr-4 ml-4 px-2 font-semibold'>1,000</p>
          </div>

        </div>

      </div>
      <div className="mt-8">
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-col-2 gap-10'>
          <div class="w-full  text-center bg-white border border-gray-200 rounded-lg shadow sm:pt-4 dark:bg-gray-800 dark:border-gray-700">
            <div className='grid1-item overflow-hidden sm:w-full' >
              <div className='p-4 sm:px-6 sm:pt-2'>
                <div class="flex items-center justify-between mb-2">
                  <h5 class="text-lg font-semibold leading-none text-gray-800 dark:text-white">Entities</h5>
                  <Link to="#" class="text-sm font-medium text-white-600 hover:underline dark:text-white-500">
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-500 text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 shrink-0 bg-orange-400 text-white gap-1">
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
                  <input onChange={performSearch} type="search" id="gsearch" name="gsearch" className='border-none focus:outline-none appearance-none focus:border-none' placeholder='Search here....' />
                </div><hr className='w-60 my-1' />
              </div>
              <hr />
              <div class="flow-root p-3 sm:px-6 sm:py-2">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                  {console.log(pagination?.paginatedUsers)}
                  {pagination?.paginatedUsers === "no data to show for this page"? (                    <li class="py-2 sm:py-2">
                      <Link>
                        <div class="flex items-center">
                          <div class="flex-shrink-0">
                            <img class="w-8 h-8 rounded-full" src={logo} alt="Neil image" />

                          </div>
                          <div class="flex-1 min-w-0 ms-4">
                            <p class="text-sm font-medium text-gray-900 text-start truncate dark:text-white">
                              no user found
                            </p>

                          </div>
                          <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                              <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                            </svg>

                          </div>
                        </div>
                      </Link>
                    </li>) : pagination?.paginatedUsers?.map(user => (
                    <li class="py-2 sm:py-2">
                      <Link>
                        <div class="flex items-center">
                          <div class="flex-shrink-0">
                            <img class="w-8 h-8 rounded-full" src={logo} alt="Neil image" />

                          </div>
                          <div class="flex-1 min-w-0 ms-4">
                            <p class="text-sm font-medium text-gray-900 text-start truncate dark:text-white">
                              {user.fullname}
                            </p>

                          </div>
                          <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                              <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                            </svg>

                          </div>
                        </div>
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
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                    <span className="font-medium">97</span> results
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a
                      onClick={() => usersDispatch({
                        type: "SET_CUSTOM_PAGE",
                        payload: --pagination.currentPage
                      })}
                      href="#"
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" aria-hidden="true">
                        <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                      </svg>
                    </a>

                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

//                     {Array.from({ length: 5 }).map((_, index) => (
//                       <a
//                         key={index}
//                         href="#"
//                         aria-current="page"
//                         className="inline-flex items-center bg-orange-500 px-4 py-2 text-sm font-semibold text-white"
//                       >
//                         {index + 1}
//                       </a>
//                     ))}

                    <a
                      href="#"
                      aria-current="page"
                      className="relative z-10 inline-flex items-center bg-orange-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                    >
                      3
                    </a>
                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                      ...
                    </span>
                    <a
                      href="#"
                      className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                    >
                      8
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      9
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      10
                    </a>
                    <a
                      onClick={() => usersDispatch({
                        type: "SET_CUSTOM_PAGE",
                        payload: ++pagination.currentPage
                      })}
                      href="#"
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" aria-hidden="true">
                        <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                      </svg>

                      {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full  text-center bg-white border border-gray-200 rounded-lg shadow sm:pt-4 dark:bg-gray-800 dark:border-gray-700">
            <div className='grid1-item overflow-hidden sm:w-full' >
              <div className='p-4 sm:px-6 sm:pt-2'>
                <div class="flex items-center justify-between mb-2">
                  <h5 class="text-lg font-semibold leading-none text-gray-800 dark:text-white">Entities</h5>
                  <Link to="#" class="text-sm font-medium text-white-600 hover:underline dark:text-white-500">
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-500 text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 shrink-0 bg-orange-400 text-white gap-1">
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
                  <input type="search" id="gsearch" name="gsearch" className='border-none focus:outline-none appearance-none focus:border-none' placeholder='Search here....' />
                </div><hr className='w-60 my-1' />
              </div>
              <hr />
              <div class="flow-root p-3 sm:px-6 sm:py-2">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                  <li class="py-2 sm:py-2">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={login_bg} alt="Neil image" />

                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 text-start truncate dark:text-white">
                          Kapil Knowledge Hub Private Limited
                        </p>

                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                        </svg>

                      </div>
                    </div>
                  </li>
                  <li class="py-2 sm:py-2">
                    <div class="flex items-center ">
                      <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={logo} alt="Neil image" />

                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 text-start truncate dark:text-white">
                          Kapil Properties
                        </p>

                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                        </svg>
                      </div>
                    </div>
                  </li>
                  <li class="py-2 sm:py-2">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={logo} alt="Neil image" />

                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-start text-gray-900 truncate dark:text-white">
                          Kapil Chits
                        </p>

                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                        </svg>
                      </div>
                    </div>
                  </li>
                  <li class="py-2 sm:py-2">
                    <div class="flex items-center ">
                      <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={logo} alt="Neil image" />
                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-start text-gray-900 truncate dark:text-white">
                          Kapil IT Solutions
                        </p>

                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                        </svg>
                      </div>
                    </div>
                  </li>
                  <li class="pt-3 pb-0 sm:pt-4">
                    <div class="flex items-center ">
                      <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={logo} alt="Neil image" />

                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 text-start truncate dark:text-white">
                          Taaza Panta
                        </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                        </svg>
                      </div>
                    </div>
                  </li>
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
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                    <span className="font-medium">97</span> results
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" aria-hidden="true">
                        <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                      </svg>


                      {/* <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" /> */}
                    </a>
                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                    <a
                      href="#"
                      aria-current="page"
                      className="relative z-10 inline-flex items-center bg-orange-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                    >
                      3
                    </a>
                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                      ...
                    </span>
                    <a
                      href="#"
                      className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                    >
                      8
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      9
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      10
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" aria-hidden="true">
                        <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
