import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import defprop from '../../../Images/defprof.svg';
import useDebounce from '../../../hooks/debounce/useDebounce';
import './BoardMeetingForm.css';
import { UserDataContext } from '../../../contexts/usersDataContext/usersDataContext';
import { BoardMeetingsDataContext } from '../../../contexts/boardmeetingsDataContext/boardmeetingsDataContext';
import $ from 'jquery';
import {
  Navigate,
  redirect,
  useSubmit,
  useNavigate,
  useLoaderData,
  useParams,
} from 'react-router-dom';

const userData = JSON.parse(localStorage.getItem('data'));
let createdBy = userData?.user?.id;
const token = userData?.token;
const role = userData?.role?.name;
export async function boardmeetingFormLoader({ params }) {
  try {
    const formApi =
      'https://atbtbeta.infozit.com/form/list?name=boardmeetingform';
    const boardmeetingApi = `https://atbtbeta.infozit.com/boardmeeting/list/${params.id}`;
    let boardmeetingData = null;
    if (params && params.id) {
      const boardmeetingResponse = await axios.get(boardmeetingApi, {
        headers: {
          Authorization: token,
        },
      });
      console.log(boardmeetingResponse, 'loader boardmeeting data');
      boardmeetingData = boardmeetingResponse?.data;
    }
    const formResponse = await axios.get(formApi);
    const formData = formResponse.data.Data;
    console.log('formData', formData, 'boardmeetingData', boardmeetingData);

    return { boardmeetingData, formData };
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed to fetch data: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('Request made but no response received');
    } else {
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
}
function BoardMeetingForm() {
  const [showPassword, setShowPassword] = useState(false);

  document.title = 'ATBT | Meeting';
  let { id } = useParams();
  const boardmeeting = useLoaderData();
  console.log(boardmeeting, 'cmp loader data');
  useEffect(() => {
    if (id && boardmeeting?.boardmeetingData?.members) {
      setSelected(boardmeeting.boardmeetingData.members);
    }
  }, [id, boardmeeting]);
  function setInitialForm() {
    console.log('boardmeeting', boardmeeting);

    let response = boardmeeting?.formData;
    if (!!id && !!boardmeeting?.boardmeetingData) {
      let boardmeetingData = boardmeeting?.boardmeetingData;
      response.forEach((input) => {
        if (boardmeetingData.hasOwnProperty(input.inputname)) {
          if (boardmeetingData[input.inputname] !== null) {
            input.value = boardmeetingData[input.inputname];
          }
        }
      });
    }
    return response;
  }
  const navigate = useNavigate();
  const {
    usersState: { users, dashboard },
    usersDispatch,
  } = useContext(UserDataContext);
  const { createBoardMeeting, updateBoardMeeting } = useContext(
    BoardMeetingsDataContext
  );
  const usersEmails = dashboard.paginatedUsers;
  // const usersEmails = dashboard.paginatedUsers?.map((user) => user.email);
  const { debouncedSetPage, debouncedSetSearch } = useDebounce(usersDispatch);

  let [openOptions, setopenOptions] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  let [customFormFields, setCustomFormFields] = useState(() =>
    setInitialForm()
  );
  useEffect(() => {
    setCustomFormFields(setInitialForm());
    if (!id) {
      setSelected([]);
    }
  }, [id]);
  useEffect(() => {
    console.log(customFormFields, 'cfff');
    console.log('errors', errors);
  });
  const handleInputChange = (e) => {
    setShowUsers(true);
    setSearchTerm(e.target.value);
    debouncedSetSearch({
      context: 'DASHBOARD',
      data: e.target.value,
    });
  };
  const handleOpenOptions = (name) => {
    if (openOptions == name) {
      setopenOptions('');
    }
    if (openOptions != name) {
      setopenOptions(name);
    }
  };
  const handleClick = (value, index) => {
    setSelected((e) => [...e, value]);
    const updatedFormData = [...customFormFields];
    let members = updatedFormData[index].value;
    members.push(value);
    updatedFormData[index].value = members;
    setCustomFormFields(updatedFormData);
    setSearchTerm('');
    setShowUsers(false);
  };
  useEffect(() => {
    console.log(searchTerm, 'clear');
  }, [searchTerm]);
  const handleRemove = (selectedIndex, index) => {
    const updatedSelected = [
      ...selected.slice(0, selectedIndex),
      ...selected.slice(selectedIndex + 1),
    ];
    setSelected(updatedSelected);
    const updatedMembers = [
      ...customFormFields[index].value.slice(0, selectedIndex),
      ...customFormFields[index].value.slice(selectedIndex + 1),
    ];
    const updatedFormData = [...customFormFields];
    updatedFormData[index].value = updatedMembers;
    setCustomFormFields(updatedFormData);
  };

  const handleChange = (index, newValue) => {
    const updatedFormData = [...customFormFields];
    if (updatedFormData[index].type != 'multiselect') {
      updatedFormData[index].value = newValue;
      setCustomFormFields(updatedFormData);
    }
    if (updatedFormData[index].type == 'multiselect') {
      // { item.value.includes(option) }
      let selectedoptions = updatedFormData[index].value;
      if (selectedoptions.includes(newValue)) {
        selectedoptions = selectedoptions.filter(
          (option) => option != newValue
        );
      } else {
        selectedoptions.push(newValue);
      }
      updatedFormData[index].value = selectedoptions;
      setCustomFormFields(updatedFormData);
    }
  };
  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    const updatedFormData = [...customFormFields];
    updatedFormData[index].value = event.target.files[0];
    setCustomFormFields(updatedFormData);
    const name = event.target.name;
  };

  console.log('customFormFields', customFormFields);
  /////
  const [errors, setErrors] = useState({});

  /////
  const [isErrorspresent, setIsErrorspresent] = useState(false);
  const checkValidation = () => {
    let isErrorspresent = false;
    for (let i = 0; i < customFormFields.length > 0; i++) {
      if (customFormFields[i].type == 'text' && customFormFields[i].mandatory) {
        if (customFormFields[i].value.length == 0) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i]
              .inputname]: `Please Enter ${customFormFields[i].label}`,
          }));
          isErrorspresent = true;
        } else if (customFormFields[i].value.length < 3) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]:
              'Name should contain atleast 3 characters',
          }));
          isErrorspresent = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: '',
          }));
        }
      }
      if (customFormFields[i].type == 'file' && customFormFields[i].mandatory) {
        if (!customFormFields[i].value) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i]
              .inputname]: `Please Upload ${customFormFields[i].label}`,
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: '',
          }));
        }
      }
      if (
        customFormFields[i].type == 'textarea' &&
        customFormFields[i].mandatory
      ) {
        if (customFormFields[i].value.length == 0) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: 'Please Enter Text',
          }));
          isErrorspresent = true;
        } else if (customFormFields[i].value.length < 3) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]:
              'Name should contain atleast 3 characters',
          }));
          isErrorspresent = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: '',
          }));
        }
      }
      if (
        customFormFields[i].type == 'email' &&
        customFormFields[i].mandatory
      ) {
        if (customFormFields[i].value.length < 1) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i]
              .inputname]: `Please Enter ${customFormFields[i].label}`,
          }));
          isErrorspresent = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: '',
          }));
        }
      }
      if (
        customFormFields[i].type == 'number' &&
        customFormFields[i].mandatory
      ) {
        if (customFormFields[i].value.length < 1) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i]
              .inputname]: `Please Enter ${customFormFields[i].label}`,
          }));
          isErrorspresent = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: '',
          }));
        }
      }
      if (
        customFormFields[i].type == 'phonenumber' &&
        customFormFields[i].mandatory
      ) {
        if (customFormFields[i].value.length !== 10) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i]
              .inputname]: `Please Enter 10 Digits ${customFormFields[i].label}`,
          }));
          isErrorspresent = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: '',
          }));
        }
      }
      if (
        customFormFields[i].type == 'select' &&
        customFormFields[i].mandatory
      ) {
        if (customFormFields[i].value.length < 1) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i]
              .inputname]: `Please Enter ${customFormFields[i].label}`,
          }));
          isErrorspresent = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: '',
          }));
        }
      }
      if (
        customFormFields[i].type == 'multiselect' &&
        customFormFields[i].mandatory
      ) {
        if (customFormFields[i].value.length < 1) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i]
              .inputname]: `Please Enter ${customFormFields[i].label}`,
          }));
          isErrorspresent = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: '',
          }));
        }
      }
      if (customFormFields[i].type == 'date' && customFormFields[i].mandatory) {
        if (!customFormFields[i].value) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i]
              .inputname]: `Please Enter ${customFormFields[i].label}`,
          }));
          isErrorspresent = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: '',
          }));
        }
      }
      if (
        customFormFields[i].type == 'checkbox' &&
        customFormFields[i].mandatory
      ) {
        if (!customFormFields[i].value) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i]
              .inputname]: `Please Enter ${customFormFields[i].label}`,
          }));
          isErrorspresent = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: '',
          }));
        }
      }
      if (
        customFormFields[i].type == 'range' &&
        customFormFields[i].mandatory
      ) {
        if (!customFormFields[i].value) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i]
              .inputname]: `Please Enter ${customFormFields[i].label}`,
          }));
          isErrorspresent = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: '',
          }));
        }
      }
      if (customFormFields[i].type == 'time' && customFormFields[i].mandatory) {
        if (!customFormFields[i].value) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i]
              .inputname]: `Please Enter ${customFormFields[i].label}`,
          }));
          isErrorspresent = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: '',
          }));
        }
      }
      if (
        customFormFields[i].type == 'password' &&
        customFormFields[i].mandatory
      ) {
        if (customFormFields[i].value.length < 1) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i]
              .inputname]: `Please Enter ${customFormFields[i].label}`,
          }));
          isErrorspresent = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: '',
          }));
        }
      }
    }
    if (isErrorspresent) {
      setIsErrorspresent(true);
    }
    if (!isErrorspresent) {
      setIsErrorspresent(false);
    }
    return isErrorspresent;
  };
  useEffect(() => {
    if (isErrorspresent && customFormFields && customFormFields.length > 0) {
      checkValidation();
    }
  }, [customFormFields]);

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!checkValidation()) {
      console.log(customFormFields, 'submitcustomFormFields');

      const formData = new FormData(e.target);
      for (let i = 0; i < customFormFields.length; i++) {
        if (Array.isArray(customFormFields[i].value)) {
          formData.set(
            customFormFields[i].inputname,
            JSON.stringify(customFormFields[i].value)
          );
        }
      }

      formData.set('customFieldsData', JSON.stringify(customFormFields));
      formData.set('createdBy', createdBy);
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      // Log form data

      console.log(formDataObj, 'foj');

      let response;
      if (!!id && !!boardmeeting?.boardmeetingData) {
        console.log('updating');
        response = await updateBoardMeeting(formData, id);
      } else {
        console.log('creating');
        response = await createBoardMeeting(formData);
      }
      console.log('jsonData submitted', response);
      if (response?.status === 201) {
        console.log('data is 201');
        navigate(`/boardmeetings/${response.data}`);
      }
    }
  }
  //for number scrolling stop
  $('input[type=number]').on('mousewheel', function (e) {
    $(e.target).blur();
  });

  // to set the time in 12hours
  function formatTime(timeString) {
    // Splitting the timeString to extract hours and minutes
    const [hourStr, minuteStr] = timeString.split(':');

    // Parsing hours and minutes as integers
    const hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    // Checking if hours and minutes are valid numbers
    if (isNaN(hours) || isNaN(minutes)) {
      return 'Invalid time';
    }

    // Converting hours to 12-hour format and determining AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Handles midnight
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Ensures minutes are two digits

    // Constructing the formatted time string
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    return formattedTime;
  }

  // end the time function

  return (
    <div className='container p-4 bg-[#f8fafc]'>
      {/* <p className="font-lg font-semibold p-3">Entity Form</p> */}
      <p className='text-lg font-semibold'>Board Meeting Form</p>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3  gap-4 mt-2  '>
        <div className='col-span-1'>
          <form
            method='POST'
            onSubmit={handleFormSubmit}
          >
            {customFormFields &&
              customFormFields.length > 0 &&
              customFormFields.map((item, index) => (
                <div key={index}>
                  {/* predefined fields */}
                  {item.type === 'text' &&
                    item.inputname == 'name' &&
                    item.field === 'predefined' && (
                      <div>
                        <label
                          htmlFor={item.label}
                          className='block text-sm font-medium leading-6 mt-2 text-gray-900'
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                          {item.mandatory ? (
                            <span className='text-red-600'>*</span>
                          ) : (
                            <span> </span>
                          )}
                        </label>
                        <input
                          type='text'
                          name={item.inputname}
                          id={item.inputname}
                          placeholder='Enter boardmeeting name'
                          value={customFormFields[index].value || ''}
                          style={{ fontSize: '0.8rem' }}
                          className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                          onChange={(e) => handleChange(index, e.target.value)}
                        />
                        <div className='h-2 text-[#dc2626]'>
                          {errors[item.inputname] && (
                            <span className='text-xs'>
                              {errors[item.inputname]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  {item.type === 'date' &&
                    item.inputname === 'date' &&
                    item.field === 'predefined' && (
                      <div>
                        <label
                          htmlFor={item.label}
                          className='block text-sm font-medium leading-6 mt-2 text-gray-900'
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                          {item.mandatory ? (
                            <span className='text-red-600'>*</span>
                          ) : (
                            <span> </span>
                          )}
                        </label>
                        <input
                          type='date'
                          name={item.inputname}
                          id={item.inputname}
                          style={{ fontSize: '0.8rem' }}
                          className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                          // Add this inline style to decrease the font size
                          value={customFormFields[index].value || ''}
                          onChange={(e) => handleChange(index, e.target.value)}
                        />
                        <div className='h-2 text-[#dc2626]'>
                          {errors[item.inputname] && (
                            <span className='text-xs'>
                              {errors[item.inputname]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                  {item.type === 'time' &&
                    item.inputname == 'time' &&
                    item.field == 'predefined' && (
                      <div>
                        <label
                          htmlFor={item.label}
                          className='block text-sm font-medium leading-6 mt-2 text-gray-900'
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                          {item.mandatory ? (
                            <span className='text-red-600'>*</span>
                          ) : (
                            <span> </span>
                          )}
                        </label>
                        <input
                          type='time'
                          name={item.inputname}
                          style={{ fontSize: '0.8rem' }}
                          className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                          id={item.inputname}
                          value={customFormFields[index].value || ''}
                          onChange={(e) => handleChange(index, e.target.value)}
                        />
                        <div className='h-2 text-[#dc2626]'>
                          {errors[item.inputname] && (
                            <span className='text-xs'>
                              {errors[item.inputname]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  {item.type === 'select' &&
                    item.inputname == 'venue' &&
                    item.field == 'predefined' && (
                      <div>
                        <label
                          htmlFor={item.label}
                          className='block text-sm font-medium leading-6 mt-2 text-gray-900'
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                          {item.mandatory ? (
                            <span className='text-red-600'>*</span>
                          ) : (
                            <span> </span>
                          )}
                        </label>
                        <select
                          id={item.inputname}
                          name={item.inputname}
                          className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                          onChange={(e) => handleChange(index, e.target.value)}
                          value={customFormFields[index].value || ''}
                          style={{ fontSize: '0.8rem' }}
                        >
                          <option
                            value=''
                            disabled
                            defaultValue
                          >
                            Please select
                          </option>
                          {item.options &&
                            item.options.value &&
                            item.options.value.length > 0 &&
                            item.options.value.map((option, index) => (
                              <option value={option}>{option}</option>
                            ))}
                        </select>
                        <div className='h-2 text-[#dc2626]'>
                          {errors[item.inputname] && (
                            <span className='text-xs'>
                              {errors[item.inputname]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  {item.type === 'textarea' &&
                    item.inputname == 'description' &&
                    item.field == 'predefined' && (
                      <div>
                        <label
                          htmlFor={item.label}
                          className='block text-sm font-medium leading-6 mt-2 text-gray-900'
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                          {item.mandatory ? (
                            <span className='text-red-600'>*</span>
                          ) : (
                            <span> </span>
                          )}
                        </label>
                        <textarea
                          name={item.inputname}
                          placeholder='Type here...'
                          id={item.inputname}
                          value={customFormFields[index].value || ''}
                          className='bg-gray-50 rounded-md text-xs p-2 w-full h-20 border-2 border-gray-200 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                          onChange={(e) => handleChange(index, e.target.value)}
                          style={{ fontSize: '0.8rem' }}
                        />
                        <div className='h-2 text-[#dc2626]'>
                          {errors[item.inputname] && (
                            <span className='text-xs'>
                              {errors[item.inputname]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  {item.type === 'multiselect' &&
                    item.inputname == 'members' &&
                    item.field == 'predefined' && (
                      <div className='relative'>
                        <label
                          htmlFor='email'
                          className='block text-sm  font-medium leading-6 mt-2 text-gray-900'
                        >
                          {item.label}
                          {item.mandatory ? (
                            <span className='text-red-600'>*</span>
                          ) : (
                            <span> </span>
                          )}
                        </label>
                        <div
                          className=' 
                       flex flex-wrap gap-1 px-2 py-2 text-sm  w-full  bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 selected-users-container relative  rounded-md'
                        >
                          {selected &&
                            selected.length > 0 &&
                            selected.map((result, selectedIndex) => {
                              let mail = result.email.split('@')[0];
                              return (
                                <span className='flex gap-1 text-xs mt-1 border-2 border-gray-200 rounded-md  focus:border-orange-600'>
                                  {result.image ? (
                                    <img
                                      src={
                                        typeof result.image === 'string'
                                          ? result.image
                                          : URL.createObjectURL(result.image)
                                      }
                                      name='EntityPhoto'
                                      alt='Entity Photo'
                                      className='rounded-lg w-4 h-4 '
                                    />
                                  ) : (
                                    <img
                                      className='w-4 h-4 rounded-lg '
                                      src={defprop}
                                      alt='default image'
                                    />
                                  )}
                                  {mail}
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 16 16'
                                    fill='currentColor'
                                    className='w-4 h-4 '
                                    onClick={() =>
                                      handleRemove(selectedIndex, index)
                                    }
                                  >
                                    <path d='M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z' />
                                  </svg>
                                </span>
                              );
                            })}
                          <input
                            type='text'
                            placeholder='Type email id'
                            tabindex='0'
                            aria-describedby='lui_5891'
                            aria-invalid='false'
                            style={{ border: 'none' }}
                            className='bg-[#f8fafc]   focus:outline-none  placeholder:text-xs'
                            value={searchTerm}
                            onChange={handleInputChange}
                          />
                        </div>

                        {showUsers && searchTerm.length > 0 && (
                          <ul className='user-list z-10 absolute top-full left-0 bg-gray-50 border border-1 border-gray-200 w-full'>
                            {usersEmails
                              .filter(
                                (mainObj) =>
                                  !selected.some(
                                    (selectedObj) =>
                                      selectedObj.id === mainObj.id
                                  )
                              )
                              .map((user, ind) => (
                                <li
                                  key={ind}
                                  className='px-3 py-1 text-sm hover:bg-gray-200'
                                  onClick={() => handleClick(user, index)}
                                >
                                  {user.email}
                                </li>
                              ))}
                          </ul>
                        )}

                        <div className='h-2 text-[#dc2626]'>
                          {errors[item.inputname] && (
                            <span className='text-xs'>
                              {errors[item.inputname]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  {/* custom fields */}
                  {item.type === 'text' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className='text-red-600'>*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type='text'
                        name={item.inputname}
                        placeholder={`Enter ${item.inputname}`}
                        id={item.inputname}
                        value={customFormFields[index].value || ''}
                        className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={{ fontSize: '0.8rem' }}
                      />
                      <div className='h-2 text-[#dc2626]'>
                        {errors[item.inputname] && (
                          <span className='text-xs'>
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === 'email' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className='text-red-600'>*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type='email'
                        placeholder={`Enter ${item.inputname}`}
                        name={item.inputname}
                        id={item.inputname}
                        value={customFormFields[index].value || ''}
                        className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={{ fontSize: '0.8rem' }}
                      />
                      <div className='h-2 text-[#dc2626]'>
                        {errors[item.inputname] && (
                          <span className='text-xs'>
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === 'password' && item.field === 'custom' && (
                    <div className='relative'>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className='text-red-600'>*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={`Enter ${item.inputname}`}
                        name={item.inputname}
                        id={item.inputname}
                        value={customFormFields[index].value || ''}
                        className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={{ fontSize: '0.8rem' }}
                      />
                      <div className='absolute inset-y-0 right-0 top-[28px] flex items-center pr-3'>
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='text-gray-600 focus:outline-none'
                        >
                          {showPassword ? (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              class='w-4 h-4 text-gray-400'
                            >
                              <path d='M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' />
                              <path
                                fill-rule='evenodd'
                                d='M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'
                                clip-rule='evenodd'
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              class='w-4 h-4 text-gray-400'
                            >
                              <path
                                fill-rule='evenodd'
                                d='M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z'
                                clip-rule='evenodd'
                              />
                              <path d='m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z' />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className='h-2 text-[#dc2626]'>
                        {errors[item.inputname] && (
                          <span className='text-xs'>
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === 'number' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className='text-red-600'>*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type='number'
                        name={item.inputname}
                        placeholder={`Enter ${item.inputname}`}
                        id={item.inputname}
                        value={customFormFields[index].value || ''}
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={{ fontSize: '0.8rem' }}
                        className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                      />
                      <div className='h-2 text-[#dc2626]'>
                        {errors[item.inputname] && (
                          <span className='text-xs'>
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === 'phonenumber' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className='text-red-600'>*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type='number'
                        name={item.inputname}
                        placeholder={`Enter ${item.inputname}`}
                        id={item.inputname}
                        value={customFormFields[index].value || ''}
                        style={{ fontSize: '0.8rem' }}
                        onChange={(e) => {
                          const value = e.target.value.slice(0, 10); // Limiting to maximum 10 digits
                          handleChange(index, value);
                        }}
                        className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                      />
                      <div className='h-2 text-[#dc2626]'>
                        {errors[item.inputname] && (
                          <span className='text-xs'>
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === 'checkbox' && item.field == 'custom' && (
                    <div>
                      <div className='flex gap-2 mt-3'>
                        <input
                          type='checkbox'
                          placeholder={`Enter ${item.inputname}`}
                          name={item.inputname}
                          id={item.inputname}
                          className='my-1'
                          style={{ fontSize: '0.8rem' }}
                          checked={!!customFormFields[index].value}
                          onChange={(e) =>
                            handleChange(index, e.target.checked)
                          }
                        />
                        <label
                          htmlFor={item.inputname}
                          className='block text-sm font-medium leading-6 my-1 text-gray-900'
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                          {item.mandatory ? (
                            <span className='text-red-600'>*</span>
                          ) : (
                            <span> </span>
                          )}
                        </label>
                      </div>
                      <div className='h-2 text-[#dc2626]'>
                        {errors[item.inputname] && (
                          <span className='text-xs'>
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === 'date' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className='text-red-600'>*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type='date'
                        name={item.inputname}
                        className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                        id={item.inputname}
                        value={customFormFields[index].value || ''}
                        s
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={{ fontSize: '0.8rem' }}
                      />
                      <div className='h-2 text-[#dc2626]'>
                        {errors[item.inputname] && (
                          <span className='text-xs'>
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === 'time' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className='text-red-600'>*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type='time'
                        name={item.inputname}
                        className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                        id={item.inputname}
                        value={customFormFields[index].value || ''}
                        s
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={{ fontSize: '0.8rem' }}
                      />
                      <div className='h-2 text-[#dc2626]'>
                        {errors[item.inputname] && (
                          <span className='text-xs'>
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === 'file' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className='text-red-600'>*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type='file'
                        name={item.inputname}
                        id={item.inputname}
                        style={{ fontSize: '0.8rem' }}
                        className='px-2 py-1 md:py-1 lg:py-1 xl:py-1 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                        onChange={(event) => handleFileChange(event, index)}
                        accept='image/*'
                      />
                      <div className='h-2 text-[#dc2626]'>
                        {errors[item.inputname] && (
                          <span className='text-xs'>
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === 'range' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className='text-red-600'>*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type='range'
                        name={item.inputname}
                        id={item.inputname}
                        value={customFormFields[index].value || 0}
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={{ fontSize: '0.8rem' }}
                      />
                      <div className='h-2 text-[#dc2626]'>
                        {errors[item.inputname] && (
                          <span className='text-xs'>
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === 'textarea' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className='text-red-600'>*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <textarea
                        name={item.inputname}
                        placeholder={`Enter ${item.inputname}`}
                        id={item.inputname}
                        value={customFormFields[index].value || ''}
                        className='bg-gray-50 rounded-md text-xs p-2 w-full h-20 border-2 border-gray-200 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={{ fontSize: '0.8rem' }}
                      />
                      <div className='h-2 text-[#dc2626]'>
                        {errors[item.inputname] && (
                          <span className='text-xs'>
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === 'select' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className='text-red-600'>*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <select
                        id={item.inputname}
                        name={item.inputname}
                        className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                        onChange={(e) => handleChange(index, e.target.value)}
                        value={customFormFields[index].value || ''}
                        style={{ fontSize: '0.8rem' }}
                      >
                        <option
                          value=''
                          disabled
                          defaultValue
                        >
                          Please select
                        </option>
                        {item.options &&
                          item.options.value &&
                          item.options.value.map((option, index) => (
                            <option value={option}>{option}</option>
                          ))}
                      </select>
                      <div className='h-2 text-[#dc2626]'>
                        {errors[item.inputname] && (
                          <span className='text-xs'>
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === 'multiselect' && item.field === 'custom' && (
                    <div className='relative'>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className='text-red-600'>*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <div className='ps-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'>
                        <span className='flex justify-between'>
                          <p className='text-sm text-gray-400'>
                            {item.value.length > 0 ? (
                              <span className='text-xs'>
                                {item.value.join(', ')}
                              </span>
                            ) : (
                              <span className='text-xs'>Please select</span>
                            )}
                          </p>
                          <span
                            onClick={() => handleOpenOptions(item.inputname)}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              className='w-5 h-5'
                            >
                              <path
                                fillRule='evenodd'
                                d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </span>
                        </span>
                      </div>
                      {openOptions === item.inputname && (
                        <ul className='h-[100px] overflow-auto z-[3] absolute top-full left-0  bg-gray-50 border border-1 border-gray-200 w-full'>
                          {item.options.value.map((option, subindex) => (
                            <li
                              key={subindex}
                              className='px-3 py-1 text-sm'
                            >
                              <input
                                type='checkbox'
                                id={option}
                                checked={item.value.includes(option)}
                                onChange={(e) => handleChange(index, option)}
                                className='mr-1'
                              />
                              <label
                                htmlFor={option}
                                className='select-none'
                              >
                                {option}
                              </label>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className='h-2 text-[#dc2626] mb-2'>
                        {errors[item.inputname] && (
                          <span className='text-xs'>
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            <div className=''>
              <button
                type='submit'
                className='mt-4 flex w-full justify-center rounded-md bg-orange-600 px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
              >
                Create Board Meeting
              </button>
            </div>
          </form>
        </div>
        {/* preview */}
        <div className='col-span-2 hidden sm:block md:block'>
          <div className=' shadow-md px-6 py-4 mt-4 border-2 rounded-md bg-[#f8fafc] '>
            {customFormFields &&
              customFormFields.length > 0 &&
              customFormFields.map((item) => {
                return (
                  <div className='relative'>
                    {/* predefined fields*/}
                    <div className='flex justify-between flex-wrap'>
                      <span>
                        {item.type === 'text' &&
                          item.inputname === 'name' &&
                          item.field === 'predefined' && (
                            <div className='absolute mt-2'>
                              {item.value ? (
                                <p className='text-lg'>
                                  {item.value.toUpperCase()}
                                </p>
                              ) : (
                                <p className='text-lg text-gray-400'>Name</p>
                              )}
                            </div>
                          )}
                      </span>
                      <span>
                        {item.type === 'date' &&
                          item.inputname === 'date' &&
                          item.field === 'predefined' && (
                            <div className='mt-3'>
                              {item.value ? (
                                <p className='text-sm mt-1'>
                                  Date : {item.value}
                                </p>
                              ) : (
                                <p className='text-sm text-gray-400 mt-1'>
                                  Date : YYYY-MM-DD
                                </p>
                              )}
                            </div>
                          )}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='flex-1 mr-4'>
                        {item.type === 'select' &&
                          item.inputname === 'venue' &&
                          item.field === 'predefined' && (
                            <div className='relative w-5/6 bottom-5'>
                              {item.value ? (
                                <p className='text-sm'>
                                  Venue :{' '}
                                  <span className='text-xs'> {item.value}</span>
                                </p>
                              ) : (
                                <p className='text-sm text-gray-400'>
                                  Venue :{' '}
                                  <span className='text-xs'>
                                    abc building, xyz street , worldwide.{' '}
                                  </span>
                                </p>
                              )}
                            </div>
                          )}
                      </span>
                      <span className=''>
                        {item.type === 'time' &&
                          item.inputname === 'time' &&
                          item.field === 'predefined' && (
                            <div>
                              {item.value ? (
                                <p className='text-sm'>Time : {item.value}</p>
                              ) : (
                                <p className='text-sm text-gray-400 '>
                                  Time : 00:00 AM
                                </p>
                              )}
                            </div>
                          )}
                      </span>
                    </div>
                    {item.type === 'textarea' &&
                      item.inputname == 'description' &&
                      item.field == 'predefined' && (
                        <div className='  h-28 overflow-auto border border-1 border-gray-200 rounded-md p-2 bg-[#f8fafc] text-sm w-full '>
                          {item.value}
                        </div>
                      )}
                    {item.type === 'multiselect' &&
                      item.inputname == 'members' &&
                      item.field == 'predefined' && (
                        <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 mt-5'>
                          {item.value &&
                            Array.from({ length: 12 }).map((_, index) => {
                              let first = '';
                              let second = '';
                              let firstLetter;
                              let secondLetter;
                              let mail = '';
                              if (index < item.value.length) {
                                mail = item.value[index].email.split('@')[0];
                                if (mail.includes('.')) {
                                  first = mail.split('.')[0];
                                  second = mail.split('.')[1];
                                  firstLetter = first[0];
                                  secondLetter = second[0];
                                } else {
                                  firstLetter = mail[0];
                                }
                              }
                              if (mail.includes('.')) {
                                first = mail.split('.')[0];
                                second = mail.split('.')[1];
                                firstLetter = first[0];
                                secondLetter = second[0];
                              } else {
                                firstLetter = mail[0];
                              }
                              const colors = [
                                '#818cf8',
                                '#fb923c',
                                '#f87171',
                                '#0891b2',
                                '#db2777',
                                '#f87171',
                                '#854d0e',
                                '#166534',
                              ];
                              const getRandomColor = (firstLetter) => {
                                const randomIndex =
                                  firstLetter?.charCodeAt(0) % colors.length;
                                return colors[randomIndex];
                              };
                              return (
                                <div
                                  className='col-span-1 flex justify-start gap-3'
                                  key={index}
                                >
                                  {index + 1 <= item.value.length && (
                                    <>
                                      <h5
                                        style={{
                                          backgroundColor: item.value[index]
                                            .image
                                            ? 'transparent'
                                            : getRandomColor(firstLetter),
                                        }}
                                        className=' rounded-full w-10 h-10  md:h-8 xl:h-10 flex justify-center  text-xs items-center text-white'
                                      >
                                        {(item.value[index].image &&
                                          index < 11) ||
                                        (index === 11 &&
                                          item.value.length === 12) ? (
                                          <img
                                            src={
                                              typeof item.value[index].image ===
                                              'string'
                                                ? item.value[index].image
                                                : URL.createObjectURL(
                                                    item.value[index].image
                                                  )
                                            }
                                            name='EntityPhoto'
                                            alt='Entity Photo'
                                            className=' rounded-full w-10 h-10   flex justify-center  text-xs items-center text-white'
                                          />
                                        ) : (
                                          <span>
                                            {firstLetter?.toUpperCase()}
                                            {secondLetter &&
                                              secondLetter?.toUpperCase()}
                                          </span>
                                        )}

                                        {index == 11 &&
                                          item.value.length > 12 && (
                                            <span>
                                              <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                stroke-width='1.5'
                                                stroke='currentColor'
                                                className='w-6 h-6'
                                              >
                                                <path
                                                  stroke-linecap='round'
                                                  stroke-linejoin='round'
                                                  d='M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z'
                                                />
                                              </svg>
                                            </span>
                                          )}
                                      </h5>
                                      <div
                                        className=' flex items-center md:items-start xl:items-center  overflow-hidden'
                                        style={{ width: '150px' }}
                                      >
                                        <div
                                          className=' md:w-28 lg:w-48  truncate'
                                          title={mail}
                                        >
                                          {index < 11 && mail}
                                          {index == 11 &&
                                            item.value.length == 12 &&
                                            mail}
                                          {index == 11 &&
                                            item.value.length > 12 && (
                                              <span>
                                                +{item.value.length - 11} more
                                              </span>
                                            )}
                                        </div>
                                      </div>
                                    </>
                                  )}
                                  {index + 1 > item.value.length && (
                                    <>
                                      <h5 className='bg-[#e5e7eb] rounded-full w-10 h-10  flex justify-center text-xs items-center text-white'></h5>
                                      <div className=' flex items-center'>
                                        <div className=' rounded-md  bg-[#e5e7eb] h-2 w-28'></div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      )}
                    {/* customfields */}
                    {item.type === 'text' && item.field == 'custom' && (
                      <div className='my-2 mx-2 '>
                        {item.value && item.value.length > 0 && (
                          <p className='flex  gap-2'>
                            <span className='w-2/6 truncate text-[#727a85] '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=' flex gap-2 w-4/6'>
                              <span> : </span>{' '}
                              <span className='text-md font-[600]  '>
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className='mt-2' />}{' '}
                      </div>
                    )}
                    {item.type === 'email' && item.field == 'custom' && (
                      <div className='my-2 mx-2 '>
                        {item.value && item.value.length > 0 && (
                          <p className='flex  gap-2'>
                            <span className='w-2/6 truncate text-[#727a85] '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className='  flex gap-2 w-4/6 '>
                              <span> : </span>{' '}
                              <span className='text-md font-[600] break-all'>
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className='mt-2' />}
                      </div>
                    )}

                    {item.type === 'phonenumber' && item.field == 'custom' && (
                      <div className='my-2 mx-2  flex-wrap'>
                        {item.value && item.value.length > 0 && (
                          <p className='flex  gap-2'>
                            <span className='w-2/6 truncate text-[#727a85] '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className='  flex gap-2 w-4/6'>
                              <span> : </span>{' '}
                              <span className='text-md font-[600] '>
                                {item.value.slice(0, 3)}&nbsp;
                                {item.value.slice(3, 6)}&nbsp;
                                {item.value.slice(6, 10)}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className='mt-2' />}{' '}
                      </div>
                    )}
                    {item.type === 'number' && item.field == 'custom' && (
                      <div className='my-2 mx-2  flex-wrap'>
                        {item.value && item.value.length > 0 && (
                          <p className='flex  gap-2'>
                            <span className='w-2/6 truncate text-[#727a85] '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className='  flex gap-2 w-4/6'>
                              <span> : </span>{' '}
                              <span className='text-md font-[600]  break-all'>
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className='mt-2' />}{' '}
                      </div>
                    )}
                    {item.type === 'textarea' && item.field == 'custom' && (
                      <div className='my-2 mx-2  '>
                        {item.value && item.value.length > 0 && (
                          <p className='flex  gap-2'>
                            <span className='w-2/6 text-[#727a85] truncate '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=' flex gap-2 w-4/6'>
                              <span> : </span>{' '}
                              <span className='text-md font-[600]  '>
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className='mt-2' />}{' '}
                      </div>
                    )}
                    {item.type === 'date' &&
                      item.field === 'custom' &&
                      (() => {
                        let date = new Date(item.value);
                        const day = date.getUTCDate();
                        const monthIndex = date.getUTCMonth();
                        const year = date.getUTCFullYear();

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
                        date = `${day < 10 ? '0' : ''}${day}-${
                          monthAbbreviations[monthIndex]
                        }-${year}`;

                        return (
                          <div className='my-2 mx-2'>
                            {item.value && item.value.length > 0 && (
                              <p className='flex gap-2'>
                                <span className='w-2/6 text-[#727a85] truncate'>
                                  {item.label.charAt(0).toUpperCase() +
                                    item.label.slice(1)}
                                </span>
                                <span className='flex gap-2 w-4/6'>
                                  <span> : </span>{' '}
                                  <span className='text-md font-[600]'>
                                    {date ? date : 'No Date'}
                                  </span>
                                </span>
                              </p>
                            )}
                            {date && <hr className='mt-2' />}
                          </div>
                        );
                      })()}

                    {item.type === 'select' && item.field == 'custom' && (
                      <div className='my-2 mx-2 '>
                        {item.value && item.value.length > 0 && (
                          <p className='flex  gap-2'>
                            <span className='w-2/6 text-[#727a85] truncate  '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className='  flex gap-2 w-4/6'>
                              <span> : </span>{' '}
                              <span className='text-md font-[600] '>
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className='mt-2' />}{' '}
                      </div>
                    )}
                    {item.type === 'multiselect' && item.field == 'custom' && (
                      <div className='my-2 mx-2 '>
                        {item.value && item.value.length > 0 && (
                          <p className='flex  gap-2'>
                            <span className='w-2/6 text-[#727a85]  truncate '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className='  flex gap-2 w-4/6'>
                              <span> : </span>{' '}
                              <span className='text-md font-[600] '>
                                {item.value.join(', ')}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value.join(', ') && <hr className='mt-2' />}{' '}
                      </div>
                    )}
                    {item.type === 'range' && item.field == 'custom' && (
                      <div className='my-2 mx-2 '>
                        {item.value && item.value.length > 0 && (
                          <p className='flex  gap-2'>
                            <span className='w-2/6 text-[#727a85] truncate '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className='  flex gap-2 w-4/6'>
                              <span> : </span>{' '}
                              <span className='text-md font-[600] '>
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className='mt-2' />}{' '}
                      </div>
                    )}
                    {item.type === 'time' && item.field == 'custom' && (
                      <div className='my-2 mx-2 '>
                        {item.value && item.value.length > 0 && (
                          <p className='flex gap-2'>
                            <span className='w-2/6 text-[#727a85] truncate  '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className='  flex gap-2 w-4/6'>
                              <span> : </span>{' '}
                              <span className='text-md font-[600] '>
                                {formatTime(item.value)}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className='mt-2' />}{' '}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardMeetingForm;

// import React, { useState } from 'react';
// import defprop from '../../../Images/defprof.svg';
// import { Link } from 'react-router-dom'

// function BoardMeetingForm() {
//   //  for binding data
//   const [boardMeetingForm, setBoardMeetingForm] = useState({
//     boardMeetingName: "",
//     boardMeetingAddress: "",
//     boardMeetingDate: "",
//     boardMeetingTime: "",
//     boardMeetingVenue: "",
//     boardMeetingDescription: "",
//     boardMeetingMembers: ""
//   });

//   const handleBoardMeetingData = (e) => {
//     const { name, value } = e.target;
//     setBoardMeetingForm((e) => ({
//       ...e, [name]: value
//     }))

//   }

//   return (

//     <div className='container p-3 bg-[#f8fafc] '>
//       <p className="text-lg font-semibold">Board Meeting</p>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4  mt-4">
//         <div className="col-span-1 ps-5 pe-8">
//           <form className="space-y-3 " method="POST">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Name</label>
//               <div className="">
//                 <input id="name" name="boardMeetingName" value={boardMeetingForm.boardMeetingName} onChange={handleBoardMeetingData} type="text" autoComplete="name" required className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
//               </div>
//             </div>
//             <div className="max-w-md mx-auto flex gap-2">
//               <span className='flex-1 '>
//                 <label for="datepicker" className="block text-sm my-1  font-medium text-gray-700">Select a Date:</label>
//                 <input type="date" id="datepicker" name="boardMeetingDate" value={boardMeetingForm.boardMeetingDate} onChange={handleBoardMeetingData} className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
//               </span>
//               <span className='flex-1 '>
//                 <label for="timepicker" className="block text-sm my-1  font-medium text-gray-700">Select a Time:</label>
//                 <input type="time" id="timepicker" name="boardMeetingTime" value={boardMeetingForm.boardMeetingTime} onChange={handleBoardMeetingData} className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
//               </span>
//             </div>

//             <div>
//               <label htmlFor="venue" className="block text-sm my-2  font-medium text-gray-700">Venue</label>
//               <div className="relative inline-block text-left w-full">
//                 <select className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6">
//                   <option value="selected" className="hover:bg-orange-600">Select Venue</option>
//                   <option value="hi-teccity">Hi-Tec City</option>
//                   <option value="gachibowli">Gachibowli</option>
//                   <option value="miyapur">Miyapur</option>
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
//                   </svg>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <label htmlFor="name" className=" block text-sm my-2 font-medium  text-gray-900" >Description</label>
//               <div className=''>
//                 <textarea name='boardMeetingDescription' value={boardMeetingForm.boardMeetingDescription} onChange={handleBoardMeetingData} className="resize-none bg-gray-50 rounded-md text-xs p-2 w-full h-20 border-2 border-gray-200 focus:outline-none focus:border-orange-400"></textarea>
//               </div>
//             </div>
//             <div className='relative'>
//               <label htmlFor="email" className="block text-sm my-2 font-medium leading-6 text-gray-900">Add Member(Entity/Team/User)</label>
//               <div className='border border-1 flex flex-wrap gap-1 px-1 py-1 selected-users-container relative z-50 rounded-md'>
//                 <span className='flex gap-1 text-xs mt-1 border-2 border-gray-200 rounded-md p-0.5 focus:border-orange-600
//                     '>
//                   dfgfdgf
//                 </span>
//                 <input
//                   type="text"
//                   tabindex="0" aria-describedby="lui_5891" aria-invalid="false"
//                   style={{ border: "none" }}
//                   className='bg-[#f8fafc] w-20 h-5 mt-1 focus:outline-none z-40'
//                 />
//               </div>
//             </div>
//             {/*
//             <div>
//               <label htmlFor="venue" className="block text-sm my-2  font-medium text-gray-700">Members(Entity/Team/User)</label>
//               <div className="relative inline-block text-left w-full">
//                 <select className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6
//                " >
//                   <option value="selected" className="hover:bg-orange-600">Entity/Team/User</option>
//                   <option value="infoz" className="hover:bg-orange-600">Infoz</option>
//                   <option value="bhavitha">Bhavitha</option>
//                   <option value="development">Development</option>
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
//                   </svg>
//                 </div>
//               </div>
//             </div> */}
//             <div className=''>
//               <button type="submit"
//                 className="mt-6 flex w-full justify-center rounded-md bg-orange-600 px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Create Board Meeting</button>
//             </div>
//           </form>
//         </div>
//         <div className="col-span-2 h-[500px] overflow-auto shadow-md px-6 py-4 border-2 rounded-md bg-[#f8fafc]  ">
//           <div className='mb-5 mt-3'>
//             <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 gap-4">
//               {/* <div className="group h-10 ">
//                 <img className="w-10 h-10 rounded-lg " src={defprop} alt="Neil image" />
//               </div> */}
//               <div className='col-span-2 '>
//                 <p className="text-lg font-black text-gray-800 ">{boardMeetingForm.boardMeetingName}</p>
//                 <p className='text-xs  text-gray-500'><span className='text-xs font-semi-bold text-gray-700'> Address:</span> Pista House Opposite, secunderabad , HYD</p>
//               </div>
//               <div className='col-span-1 text-end'>
//                 <p className='text-xs text-gray-60 '>Date : {boardMeetingForm.boardMeetingDate}</p>
//                 <p className='text-xs text-gray-60 my-1'>Time : {boardMeetingForm.boardMeetingTime}</p>
//               </div>
//             </div>
//             <hr className='my-3' />
//             <div className='h-20 overflow-auto border border-1 border-gray-200 rounded-md p-2 bg-[#f8fafc] text-sm w-full  '>
//               {/* <textarea className="resize-none h-20 border border-1 border-gray-200 focus:outline-none "> */}
//               {boardMeetingForm.boardMeetingDescription}
//               {/* </textarea> */}
//             </div>

//             <p className='text-md font-semibold my-3' > Members</p>

//             <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-5'>
//               <div className='col-span-1 flex justify-start gap-3'>
//                 <h5 className=' rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'>

//                 </h5>
//                 <div className=' flex items-center'>

//                 </div>

//                 <h5 className='bg-[#e5e7eb] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'>

//                 </h5>
//                 <div className=' flex items-center'>
//                   <div className=' rounded-md  bg-[#e5e7eb] h-2 w-28'> </div>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div >
//   );
// }

// export default BoardMeetingForm;
