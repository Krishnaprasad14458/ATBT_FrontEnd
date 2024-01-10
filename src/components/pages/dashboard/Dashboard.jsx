import React from 'react';
import login_bg from '../../../Images/login_bg.jpg';
import logo from '../../../Images/logo.png';
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function Dashboard() {
  const navigate=useNavigate()
  const data = [1, 2, 3, 4, 5]
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

    <div className="container p-3">
      <h1 className='m-3 font-semibold'>Home</h1>
      <div className='text-center '>
 
        <p class="text-md">Monday, January 08</p>
 
        <h2 class=" text-4xl font-bold dark:text-white">Good Morning , Bhavitha</h2>
 
        <div className='flex flex-wrap mt-4 justify-center'>
 
          <div className="tota_tasks border-r-2 border-black-100 bg-gray-100 p-2 rounded-s-full">
 
            <h5 className='mr-4 ml-4 px-2'>Total Tasks</h5>
 
            <p className='mr-4 ml-4 px-2'>1,000</p>
 
          </div>
 
          <div className=" completed_tasks border-r-2 border-black-100 bg-gray-100 p-2">
 
            <h5 className='mr-4 ml-4 px-2'>Completed Tasks</h5>
 
            <p className='mr-4 ml-4 px-2'>1,000</p>
 
          </div>
          <div className=" upcoming_tasks border-r-2 border-black-100 bg-gray-100 p-2">
 
            <h5 className='mr-4 ml-4'>Upcoming Tasks</h5>
 
            <p className='mr-4 ml-4'>1,000</p>
 
          </div>
 
          <div className=" overdue_tasks border-r-2 border-black-100 bg-gray-100 p-2 rounded-e-full">
 
            <h5 className='mr-4 ml-4 px-2'>Overdue Tasks</h5>
 
            <p className='mr-4 ml-4 px-2'>1,000</p>
 
          </div>
 
        </div>
 
      </div>
      <div className="mt-8">
        <div className='flex flex-wrap gap-4 justify-evenly'>
          <div className='flex flex-col overflow-hidden sm:w-96' style={{ width: "28rem" }}>
            <div class="max-w-md w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div class="flex items-center justify-between mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Entities</h5>
                <button onClick={openModal} class="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 shrink-0 bg-orange-400 text-white gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 ">
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                  </svg>
                  Create</button>
                {isModalOpen && (
                  <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="z-50 bg-white p-6 rounded-md shadow-lg relative">
                      <button onClick={closeModal}
                        className="h-7 w-7 absolute top-4 right-4 text-white border border-orange-400 bg-orange-500 hover:bg-orange-600"
                      >
                        X
                      </button>
                      <div className="mt-5">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4" action="#" method="POST">
                          <div className="col-span-1">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div className="mt-2">
                              <input id="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} name="text" type="fullname" autoComplete="fullname" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                            </div>
                          </div>
                          <div className="col-span-1">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                            <div className="mt-2">
                              <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="text" autoComplete="email" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                            </div>
                          </div>
                          <div className="col-span-1">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                            <div className="mt-2">
                              <input id="phonenumber" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} name="phonenumber" type="tel" autoComplete="phonenumber" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                            </div>
                          </div>

                          <div className="relative col-span-1">
                            <label htmlFor="designation" className="block text-sm font-medium leading-6 text-gray-900">
                              Designation
                            </label>
                            <select value={designation} onChange={handleDesignationChange} className="mt-2 p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" >
                              <option value="" disabled>Select Designation</option>
                              {designationOptions.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="relative col-span-1">
                            <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
                              Department
                            </label>
                            <select value={department} onChange={handleDepartmentChange}  className="mt-2 p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6">
                              <option value="" disabled>Department</option>
                              {departmentOptions.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-1">
                            <label htmlFor="report" className="block text-sm font-medium leading-6 text-gray-900">Report To</label>
                            <div className="mt-2">
                              <input id="report" value={reportto} onChange={(e) => setReportto(e.target.value)} name="report" type="text" autoComplete="report" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                            </div>
                          </div>
                          <div className="col-span-1">
                            <label htmlFor="profile" className="block text-sm font-medium leading-6 text-gray-900">Profile</label>
                            <div className="mt-2">
                              <input id="profile" value={profile} onChange={(e) => setProfile(e.target.value)} name="profile" type="text" autoComplete="profile" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                            </div>
                          </div>
                          <div className="relative col-span-1">
                            <label htmlFor="branch" className="block text-sm font-medium  leading-6 text-gray-900700">
                              Branch
                            </label>
                            <select value={branch} onChange={handleBranchChange}  className="mt-2 p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6">
                              <option value="" disabled>Branch</option>
                              {branchOptions.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-2 flex justify-center">
                            <button type="submit" className="w-full rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className='flex gap-4'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
                </svg>
                <Link to="/entities">Search Entities</Link>

              </div><hr className='w-60 my-2' />
              <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                  {data.map(el => (
                    <li class="py-3 sm:py-4">
                      <div class="flex items-center ">
                        <div class="flex-shrink-0">
                          <img class="w-8 h-8 rounded-full" src={logo} alt="Neil image" />

                        </div>
                        <div class="flex-1 min-w-0 ms-4">
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
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
                  ))}
                </ul>
              </div>
            </div>
          </div>
         <div className='flex flex-col overflow-hidden sm:w-96' style={{ width: "28rem" }}>
            <div class="max-w-md w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div class="flex items-center justify-between mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Entities</h5>
                <button onClick={openModal} class="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 shrink-0 bg-orange-400 text-white gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 ">
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                  </svg>
                  Create</button>
                {isModalOpen && (
                  <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="z-50 bg-white p-6 rounded-md shadow-lg relative">
                      <button onClick={closeModal}
                        className="h-7 w-7 absolute top-4 right-4 text-white border border-orange-400 bg-orange-500 hover:bg-orange-600"
                      >
                        X
                      </button>
                      <div className="mt-5">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4" action="#" method="POST">
                          <div className="col-span-1">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div className="mt-2">
                              <input id="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} name="text" type="fullname" autoComplete="fullname" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                            </div>
                          </div>
                          <div className="col-span-1">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                            <div className="mt-2">
                              <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="text" autoComplete="email" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                            </div>
                          </div>
                          <div className="col-span-1">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                            <div className="mt-2">
                              <input id="phonenumber" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} name="phonenumber" type="tel" autoComplete="phonenumber" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                            </div>
                          </div>

                          <div className="relative col-span-1">
                            <label htmlFor="designation" className="block text-sm font-medium leading-6 text-gray-900">
                              Designation
                            </label>
                            <select value={designation} onChange={handleDesignationChange} className="mt-2 p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" >
                              <option value="" disabled>Select Designation</option>
                              {designationOptions.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="relative col-span-1">
                            <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
                              Department
                            </label>
                            <select value={department} onChange={handleDepartmentChange}  className="mt-2 p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6">
                              <option value="" disabled>Department</option>
                              {departmentOptions.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-1">
                            <label htmlFor="report" className="block text-sm font-medium leading-6 text-gray-900">Report To</label>
                            <div className="mt-2">
                              <input id="report" value={reportto} onChange={(e) => setReportto(e.target.value)} name="report" type="text" autoComplete="report" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                            </div>
                          </div>
                          <div className="col-span-1">
                            <label htmlFor="profile" className="block text-sm font-medium leading-6 text-gray-900">Profile</label>
                            <div className="mt-2">
                              <input id="profile" value={profile} onChange={(e) => setProfile(e.target.value)} name="profile" type="text" autoComplete="profile" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                            </div>
                          </div>
                          <div className="relative col-span-1">
                            <label htmlFor="branch" className="block text-sm font-medium  leading-6 text-gray-900700">
                              Branch
                            </label>
                            <select value={branch} onChange={handleBranchChange}  className="mt-2 p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6">
                              <option value="" disabled>Branch</option>
                              {branchOptions.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-2 flex justify-center">
                            <button type="submit" className="w-full rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className='flex gap-4'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
                </svg>
                <Link to="/entities">Search Entities</Link>

              </div><hr className='w-60 my-2' />
              <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                  {data.map(el => (
                    <li class="py-3 sm:py-4">
                      <div class="flex items-center ">
                        <div class="flex-shrink-0">
                          <img class="w-8 h-8 rounded-full" src={logo} alt="Neil image" />

                        </div>
                        <div class="flex-1 min-w-0 ms-4">
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
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
                  ))}
                </ul>
              </div>
            </div>
          </div>
       
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
