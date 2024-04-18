import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import defprop from '../../../../assets/Images/Avatar_new_02.svg'
import { UserDataContext } from '../../../../contexts/usersDataContext/usersDataContext';
import { EntitiesDataContext } from '../../../../contexts/entitiesDataContext/entitiesDataContext';
import $ from 'jquery';
import linesimage from '../../../../assets/Images/lines_10.svg';
import {
  Navigate,
  redirect,
  useSubmit,
  useNavigate,
  useLoaderData,
  useParams,
} from 'react-router-dom';
const userData = JSON.parse(localStorage.getItem('data'));
const loggedInUser = userData?.user?.id;
const token = userData?.token;
export async function userFormLoader({ params }) {
  try {
    const formApi = 'https://atbtbeta.infozit.com/form/list?name=userform';
    const userApi = `https://atbtbeta.infozit.com/user/list/${params.id}`;
    // const userApi = `http://localhost:3000/user/list/${params.id}`;
    let userData = null;
    if (params && params.id) {
      const userResponse = await axios.get(userApi, {
        headers: {
          Authorization: token,
        },
      });
      userData = userResponse?.data?.user;
      console.log('bahvvuu', userData);
    }
    const formResponse = await axios.get(formApi);
    const formData = formResponse.data.Data;
    return { userData, formData };
  } catch (error) {
    console.log(error, 'which error');
    if (error.response) {
      throw new Error(`Failed to fetch data: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('Request made but no response received');
    } else {
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
}
function UserForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    entitiesState: { entitiesList },
  } = useContext(EntitiesDataContext);

  document.title = 'ATBT | User';
  let { id } = useParams();

  const userData = JSON.parse(localStorage.getItem('data'));
  let createdBy = userData.user.id;
  const token = userData?.token;
  const navigate = useNavigate();
  const user = useLoaderData();
  let submit = useSubmit();
  function setInitialForm() {
    let response = user?.formData;
    if (!!id && !!user?.userData) {
      let userData = user?.userData;
      response.forEach((input) => {
        if (userData.hasOwnProperty(input.inputname)) {
          if (userData[input.inputname] !== null) {
            input.value = userData[input.inputname];
          }
        }
      });
    }
    return response;
  }
  const {
    usersState: { users, dashboard },
    usersDispatch,
    createUser,
    updateUser,
  } = useContext(UserDataContext);
  let [openOptions, setopenOptions] = useState('');
  let [customFormFields, setCustomFormFields] = useState(() =>
    setInitialForm()
  );
  useEffect(() => {
    setCustomFormFields(setInitialForm());
  }, [id]);
  let [fieldsDropDownData, setFieldsDropDownData] = useState({
    role: [],
    entityname: [],
  });
  // useEffect(() => {
  //   setFieldsDropDownData((prevState) => ({
  //     ...prevState,
  //     entityname: entitiesList.paginatedEntities?.map((item) => item?.name),
  //   }));
  // }, [entitiesList]);
  useEffect(() => {
    axios
      .get(`https://atbtbeta.infozit.com/rbac/getroles`)
      .then((response) => {
        setFieldsDropDownData((prevState) => ({
          ...prevState,
          role: response?.data?.roles?.map((item) => item?.name),
        }));
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
    axios
      .post(`https://atbtbeta.infozit.com/public/list/entity`)
      .then((response) => {
        console.log("responseresponse",response)
        setFieldsDropDownData((prevState) => ({
          ...prevState,
          // entityname: response?.data?.Entites.map((item) => item?.name),
          entityname: response?.data?.Entites?.map((item) => ({
            name: item?.name || "",
            id: item?.id || ""
          })) || []

        }));
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleOpenOptions = (name) => {
    if (openOptions == name) {
      setopenOptions('');
    }
    if (openOptions != name) {
      setopenOptions(name);
    }
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
    if (file?.size > 1000000) {
      alert('file size too large');
      return null;
    }
    const updatedFormData = [...customFormFields];
    updatedFormData[index].value = event.target.files[0];
    setCustomFormFields(updatedFormData);
    const name = event.target.name;
  };
  /////
  const [errors, setErrors] = useState({});

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
      const formData = new FormData(e.target);
      for (let i = 0; i < customFormFields.length; i++) {
        if (Array.isArray(customFormFields[i].value)) {
          formData.set(
            customFormFields[i].inputname,
            JSON.stringify(customFormFields[i].value)
          );
        }
      }
      formData.set('userremarkshistory', JSON.stringify([]));
      formData.set('customFieldsData', JSON.stringify(customFormFields));
      formData.set('createdBy', createdBy);
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      // Log form data
      console.log(formDataObj, 'foj');
      let response;
      if (!!id && !!user?.userData) {
        // formData.set('role', user?.userData?.role);
        // formData.set('email', user?.userData?.email);
        console.log('updating');
        response = await updateUser(formData, id);
      } else {
        console.log('creating');
        response = await createUser(formData);
      }
      response?.status === 201 && navigate(`/users/${response.data}`);
      console.log('jsonData submitted', response);
    }
  }
  ////for number scrolling stop
  $('input[type=number]').on('mousewheel', function (e) {
    $(e.target).blur();
  });
  const handleKeyDown = (event) => {
    if (event.keyCode === 38 || event.keyCode === 40) {
      event.preventDefault();
    }
  };
  // end

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
  useEffect(() => {
    console.log('cus', customFormFields);
  });
  return (
    <div className=' p-4 bg-[#f8fafc]'>
      {/* <p className="font-lg font-semibold p-3">Entity Form</p> */}
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3  gap-4 mt-2 '>
        <div className='col-span-1 '>
          <p className='text-lg font-semibold'>User Form</p>
          <form
            className=''
            method='POST'
            onSubmit={handleFormSubmit}
          >
            {customFormFields &&
              customFormFields.length > 0 &&
              customFormFields.map((item, index) => (
                <div key={index}>
                  {/* predefined fields */}
                  {item.type === 'text' &&
                    item.inputname === 'name' &&
                    item.field === 'predefined' && (
                      <div>
                        <label
                          htmlFor={item.label}
                          className='block text-sm font-medium leading-6 mt-2 text-gray-900'
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}{' '}
                          {item.mandatory ? (
                            <span className='text-red-600'>*</span>
                          ) : (
                            <span> </span>
                          )}
                        </label>
                        <input
                          type='text'
                          placeholder='Enter name'
                          name={item.inputname}
                          id={item.inputname}
                          value={customFormFields[index].value || ''}
                          className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                          onChange={(e) => handleChange(index, e.target.value)}
                          style={{ fontSize: '0.8rem' }}
                        />
                        <div className='h-2 text-red-500'>
                          {errors[item.inputname] && (
                            <span className='text-xs'>
                              {errors[item.inputname]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  {item.type === 'file' &&
                    item.inputname === 'image' &&
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
                          type='file'
                          name={item.inputname}
                          id={item.inputname}
                          className='px-2 py-1 md:py-1 lg:py-1 xl:py-1 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'
                          onChange={(event) => handleFileChange(event, index)}
                          accept='image/*'
                          style={{ fontSize: '0.8rem' }}
                        />
                        <div className='h-2 text-red-500'>
                          {errors[item.inputname] && (
                            <span className='text-xs'>
                              {errors[item.inputname]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  {item.type === 'select' &&
                    item.inputname === 'entityname' &&
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
                          {item.options.value &&
                            fieldsDropDownData.entityname &&
                            fieldsDropDownData.entityname.map(
                              (option, index) => (
                                <option
                                  key={index}
                                  value={option.id}
                                >
                                  {option.name}
                                </option>
                              )
                            )}
                        </select>
                        <div className='h-2 text-red-500'>
                          {errors[item.inputname] && (
                            <span className='text-xs'>
                              {errors[item.inputname]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  {item.type === 'email' &&
                    item.inputname == 'email' &&
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
                          type='email'
                          name={item.inputname}
                          id={item.inputname}
                          placeholder='Enter email'
                          value={customFormFields[index].value || ''}
                          style={{ fontSize: '0.8rem' }}
                          onChange={(e) => handleChange(index, e.target.value)}
                          disabled={!!id && !!user?.userData ? true : false}
                          className={` ${!!id && !!user?.userData
                            ? 'text-[#d4d4d8] bg-gray-50 cursor-not-allowed'
                            : 'bg-gray-50 text-gray-900'
                            } px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300  focus:outline-none  focus:border-orange-400 placeholder:text-xs `}
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
                  {item.type === 'phonenumber' &&
                    item.inputname == 'phonenumber' &&
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
                          type='number'
                          name={item.inputname}
                          onKeyDown={handleKeyDown}
                          placeholder='Enter number'
                          id={item.inputname}
                          style={{ fontSize: '0.8rem' }}
                          value={customFormFields[index].value || ''}
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

                  {item.type === 'select' &&
                    item.inputname == 'designation' &&
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
                          className='p-2 text-sm block w-full rounded-md bg-gray-50 border custom-select border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'
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
                  {item.type === 'select' &&
                    item.inputname == 'role' &&
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
                          // className={` ${!!id && !!user?.userData
                          //   ? 'text-[##d4d4d8] bg-gray-50 '
                          //   : 'bg-gray-50 text-gray-900 '
                          //   } px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300  focus:outline-none  focus:border-orange-400 placeholder:text-xs `}
                          className={` ${!!id &&
                            !!user?.userData &&
                            parseInt(id) === loggedInUser
                            ? 'text-[##d4d4d8] bg-gray-50 cursor-not-allowed'
                            : 'bg-gray-50 text-gray-900 '
                            } px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300  focus:outline-none  focus:border-orange-400 placeholder:text-xs `}
                          onChange={(e) => handleChange(index, e.target.value)}
                          value={customFormFields[index].value || ''}
                          style={{ fontSize: '0.8rem' }}
                          disabled={
                            id &&
                              user?.userData &&
                              parseInt(id) === loggedInUser
                              ? true
                              : false
                          }
                        >
                          <option
                            value=''
                            disabled
                            defaultValue
                          >
                            Please select
                          </option>
                          {item.options.value &&
                            fieldsDropDownData.role &&
                            fieldsDropDownData.role.map((option, index) => (
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
                  {/* custom fields */}
                  {item.type === 'text' && item.field == 'custom' && (
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
                {id ? 'Update User' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
        {/* preview */}
        <div
          className='col-span-2  hidden sm:block md:block bg-cover  bg-no-repeat rounded-xl'
          style={{
            backgroundImage: `url(${linesimage}) `,
          }}
        >
          <div className='mt-32 pt-10 pb-20'>
            <div className='relative  flex flex-col text-gray-700 shadow-md bg-clip-border  rounded-xl w-8/12 md:w-full lg:w-9/12 xl:w-9/12 justify-center mx-auto  bg-[#fafaf9] border-2 border-gray-200 '>
              {customFormFields &&
                customFormFields.length > 0 &&
                customFormFields.map((item) => {
                  return (
                    // Updating the state with the formatted date
                    <div className=''>
                      {/* predefined fields*/}
                      <div>
                        <div className='bg-[#fff7ed] rounded-xl'>
                          {item.type === 'file' &&
                            item.inputname == 'image' &&
                            item.field === 'predefined' && (
                              <div>
                                {item.value ? (
                                  <img
                                    src={
                                      typeof item.value === 'string'
                                        ? item.value
                                        : URL.createObjectURL(item.value)
                                    }
                                    name='UserPhoto'
                                    alt='User Photo'
                                    className=' h-36 w-36 relative mx-auto bottom-20 rounded-md border-2 border-gray-200 shadow-md'
                                  />
                                ) : (
                                  <img
                                    className=' h-36 w-36 relative mx-auto bottom-20 rounded-md border-2 border-gray-200 shadow-md'
                                    src={defprop}
                                    alt='photo'
                                  />
                                )}
                              </div>
                            )}
                        </div>
                        {item.type === 'text' &&
                          item.inputname == 'name' &&
                          item.field === 'predefined' && (
                            <div className=' flex justify-center'>
                              {item.value ? (
                                <p
                                  className='absolute top-16 my-3 text-md antialiased font-semibold leading-snug tracking-normal  text-center  text-blue-gray-900 w-3/6 truncate md:w-5/6'
                                  title={item.value.toUpperCase()}
                                >
                                  {item.value.toUpperCase()}
                                </p>
                              ) : (
                                <p className=' absolute top-16 my-3 text-md antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
                                  USER NAME
                                </p>
                              )}
                            </div>
                          )}
                        {item.type === 'select' &&
                          item.inputname == 'entityname' &&
                          item.field == 'predefined' && (
                            <div className='flex  justify-center   border-t-2 border-gray-300 '>
                              {item.value ? (
                                <p
                                  className='absolute top-20 mt-8 text-sm antialiased  leading-snug tracking-normal text-blue-gray-90 w-3/6 truncate md:w-5/6 text-center'
                                  title={item.value}
                                >
                                  {item.value}
                                </p>
                              ) : (
                                <p className='absolute top-20 mt-8 text-sm antialiased  leading-snug tracking-normal text-blue-gray-900'>
                                  XYZ company
                                </p>
                              )}
                            </div>
                          )}

                        {item.type === 'email' &&
                          item.inputname == 'email' &&
                          item.field == 'predefined' && (
                            <div className='my-2 mx-5 '>
                              {item.value ? (
                                <p className='flex   gap-2'>
                                  <span className='w-2/6 text-[#727a85]  truncate '>
                                    {item.label.charAt(0).toUpperCase() +
                                      item.label.slice(1)}
                                  </span>
                                  <span className='  flex gap-2 w-4/6 '>
                                    <span> : </span>{' '}
                                    <span
                                      className='text-md font-[600] break-all w-5/6 truncate'
                                      title={item.value}
                                    >
                                      {item.value}
                                    </span>
                                  </span>
                                </p>
                              ) : (
                                <p className='flex  gap-2'>
                                  <span className='w-2/6 text-[#727a85]'>
                                    {item.label.charAt(0).toUpperCase() +
                                      item.label.slice(1)}{' '}
                                  </span>
                                  <span className='  flex gap-2 w-4/6'>
                                    <span> : </span>{' '}
                                    <span className='text-md font-[600] '>
                                      abc@gmail.com
                                    </span>
                                  </span>
                                </p>
                              )}
                            </div>
                          )}
                        {item.type === 'phonenumber' &&
                          item.inputname == 'phonenumber' &&
                          item.field == 'predefined' && (
                            <div className='my-2 mx-5 '>
                              <p className='flex  gap-2'>
                                <span
                                  className='w-2/6 text-[#727a85]  truncate'
                                  title={
                                    item.label.charAt(0).toUpperCase() +
                                    item.label.slice(1)
                                  }
                                >
                                  {item.label.charAt(0).toUpperCase() +
                                    item.label.slice(1)}
                                </span>
                                <span className='  flex gap-2 w-4/6'>
                                  <span> : </span>{' '}
                                  {item.value && (
                                    <span className='text-md font-[600] '>
                                      {item.value.slice(0, 3)}&nbsp;
                                      {item.value.slice(3, 6)}&nbsp;
                                      {item.value.slice(6, 10)}
                                    </span>
                                  )}
                                  {!item.value && (
                                    <span className='text-md font-[600] '>
                                      000 000 0000{' '}
                                    </span>
                                  )}
                                </span>
                              </p>
                            </div>
                          )}
                        {item.type === 'select' &&
                          item.inputname == 'designation' &&
                          item.field == 'predefined' && (
                            <div className='my-2 mx-5 '>
                              {item.value ? (
                                <p className='flex  gap-2'>
                                  <span
                                    className='w-2/6  truncate text-[#727a85] '
                                    title={
                                      item.label.charAt(0).toUpperCase() +
                                      item.label.slice(1)
                                    }
                                  >
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
                              ) : (
                                <p className='flex  gap-2'>
                                  <span className='w-2/6 text-[#727a85]'>
                                    {item.label.charAt(0).toUpperCase() +
                                      item.label.slice(1)}{' '}
                                  </span>
                                  <span className='  flex gap-2 w-4/6'>
                                    <span> : </span>{' '}
                                    <span className='text-md font-[600] '>
                                      Designation
                                    </span>
                                  </span>
                                </p>
                              )}
                            </div>
                          )}
                      </div>
                      {/* custom fields */}
                      {item.type === 'text' && item.field == 'custom' && (
                        <div>
                          {item.value && item.value.length > 0 && (
                            <div className='my-2 mx-5 '>
                              <p className='flex  gap-2'>
                                <span
                                  className='w-2/6  truncate text-[#727a85] '
                                  title={
                                    item.label.charAt(0).toUpperCase() +
                                    item.label.slice(1)
                                  }
                                >
                                  {item.label.charAt(0).toUpperCase() +
                                    item.label.slice(1)}
                                </span>
                                <span className=' flex gap-2 w-4/6'>
                                  <span> : </span>
                                  <span className='text-md font-[600]  '>
                                    {item.value}
                                  </span>
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                      {item.type === 'email' && item.field == 'custom' && (
                        <div className=' '>
                          {item.value && item.value.length > 0 && (
                            <p className='flex  gap-2 my-2 mx-5'>
                              <span
                                className='w-2/6  truncate text-[#727a85] '
                                title={
                                  item.label.charAt(0).toUpperCase() +
                                  item.label.slice(1)
                                }
                              >
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
                        </div>
                      )}
                      {item.type === 'phonenumber' &&
                        item.field == 'custom' && (
                          <div className='flex-wrap'>
                            {item.value && item.value.length > 0 && (
                              <p className='flex  gap-2 my-2 mx-5 '>
                                <span
                                  className='w-2/6  truncate text-[#727a85] '
                                  title={
                                    item.label.charAt(0).toUpperCase() +
                                    item.label.slice(1)
                                  }
                                >
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
                          </div>
                        )}
                      {item.type === 'number' && item.field == 'custom' && (
                        <div className='flex-wrap'>
                          {item.value && item.value.length > 0 && (
                            <p className='flex  gap-2 my-2 mx-5 '>
                              <span
                                className='w-2/6  truncate text-[#727a85] '
                                title={
                                  item.label.charAt(0).toUpperCase() +
                                  item.label.slice(1)
                                }
                              >
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
                        </div>
                      )}
                      {item.type === 'textarea' && item.field == 'custom' && (
                        // mb-1 ps-6 flex flex-wrap
                        <div className=' '>
                          {item.value && item.value.length > 0 && (
                            <p className='flex  gap-2 my-2 mx-5'>
                              <span
                                className='w-2/6 text-[#727a85]  truncate '
                                title={
                                  item.label.charAt(0).toUpperCase() +
                                  item.label.slice(1)
                                }
                              >
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
                          date = `${day < 10 ? '0' : ''}${day}-${monthAbbreviations[monthIndex]
                            }-${year}`;

                          return (
                            <div className=''>
                              {item.value && item.value.length > 0 && (
                                <p className='flex gap-2 my-2 mx-5'>
                                  <span
                                    className='w-2/6 text-[#727a85]  truncate '
                                    title={
                                      item.label.charAt(0).toUpperCase() +
                                      item.label.slice(1)
                                    }
                                  >
                                    {item.label.charAt(0).toUpperCase() +
                                      item.label.slice(1)}
                                  </span>
                                  <span className='flex gap-2 w-4/6'>
                                    <span> : </span>
                                    <span className='text-md font-[600] '>
                                      {date ? date : 'No Date'}
                                    </span>
                                  </span>
                                </p>
                              )}
                            </div>
                          );
                        })()}
                      {item.type === 'select' && item.field == 'custom' && (
                        <div className=' '>
                          {item.value && item.value.length > 0 && (
                            <p className='flex  gap-2 my-2 mx-5'>
                              <span
                                className='w-2/6 text-[#727a85]  truncate  '
                                title={
                                  item.label.charAt(0).toUpperCase() +
                                  item.label.slice(1)
                                }
                              >
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
                        </div>
                      )}
                      {item.type === 'multiselect' &&
                        item.field == 'custom' && (
                          <div className=''>
                            {item.value && item.value.length > 0 && (
                              <p className='flex  gap-2 my-2 mx-5 '>
                                <span
                                  className='w-2/6 text-[#727a85]   truncate '
                                  title={
                                    item.label.charAt(0).toUpperCase() +
                                    item.label.slice(1)
                                  }
                                >
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
                          </div>
                        )}
                      {item.type === 'range' && item.field == 'custom' && (
                        <div className=''>
                          {item.value && item.value.length > 0 && (
                            <p className='flex  gap-2 my-2 mx-5 '>
                              <span
                                className='w-2/6 text-[#727a85]  truncate '
                                title={
                                  item.label.charAt(0).toUpperCase() +
                                  item.label.slice(1)
                                }
                              >
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
                        </div>
                      )}
                      {item.type === 'time' && item.field == 'custom' && (
                        <div className=''>
                          {item.value && item.value.length > 0 && (
                            <p className='flex gap-2 my-2 mx-5 '>
                              <span
                                className='w-2/6 text-[#727a85]  truncate  '
                                title={
                                  item.label.charAt(0).toUpperCase() +
                                  item.label.slice(1)
                                }
                              >
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
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
