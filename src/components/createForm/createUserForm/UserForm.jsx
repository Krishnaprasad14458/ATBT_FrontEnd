import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import defprop from '../../../Images/Avatar_new_02.svg';
import { UserDataContext } from '../../../contexts/usersDataContext/usersDataContext';
import { EntitiesDataContext } from '../../../contexts/entitiesDataContext/entitiesDataContext';
import $ from 'jquery';
import linesimage from '../../../Images/lines_10.svg';
import {
  Navigate,
  redirect,
  useSubmit,
  useNavigate,
  useLoaderData,
  useParams,
} from 'react-router-dom';

// import axios from 'axios';
const userData = JSON.parse(localStorage.getItem('data'));
const token = userData?.token;

export async function userFormLoader({ params }) {
  try {
    const formApi = 'https://atbtmain.teksacademy.com/form/list?name=userform';
    const userApi = `https://atbtmain.teksacademy.com/user/list/${params.id}`;
    let userData = null;
    if (params && params.id) {
      const userResponse = await axios.get(userApi, {
        headers: {
          Authorization: token,
        },
      });
      userData = userResponse?.data?.user;
    }
    const formResponse = await axios.get(formApi);
    const formData = formResponse.data.Data;
    return { userData, formData };
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

function UserForm() {
  let { id } = useParams();
  const userData = JSON.parse(localStorage.getItem('data'));
  let createdBy = userData.user.id;
  const token = userData?.token;
  const navigate = useNavigate();
  const user = useLoaderData();
  let submit = useSubmit();
  function setInitialForm() {
    let response = user?.formData ?? [];
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
  let [fieldsDropDownData, setFieldsDropDownData] = useState({
    role: [],
    entityname: ['infosys', 'relid'],
  });
  useEffect(() => {
    axios
      .get(`https://atbtmain.teksacademy.com/rbac/getroles`)
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
    const updatedFormData = [...customFormFields];
    updatedFormData[index].value = event.target.files[0];
    setCustomFormFields(updatedFormData);
    // setCustomFormFields(event.target.files[0]);
    const name = event.target.name;
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     const updatedFormData = [...customFormFields];
    //     updatedFormData[index].value = reader.result;
    //     setCustomFormFields(updatedFormData);
    //   };
    //   reader.readAsDataURL(file);
    // }
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
        console.log('updating');
        response = await updateUser(formData, id);
      } else {
        console.log('creating');
        response = await createUser(formData);
      }
      console.log('jsonData submitted', response);
      if (response.status === 201) {
        console.log('data is 201');
        navigate(`/users/${response.data}`);
      }
    }
  }

  ////for number scrolling stop
  $('input[type=number]').on('mousewheel', function (e) {
    $(e.target).blur();
  });
  return (
    <div className='container p-4 bg-[#f8fafc]'>
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
                    item.inputname == 'name' &&
                    item.field === 'predefined' && (
                      <div>
                        <label
                          htmlFor={item.label}
                          className='block text-sm font-medium leading-6 mt-2 text-gray-900'
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                        </label>
                        <input
                          type='text'
                          placeholder='Enter name'
                          name={item.inputname}
                          id={item.inputname}
                          // value={formData[item.label] || ''}
                          value={customFormFields[index].value || ''}
                          className='px-2 py-1 block w-full rounded-md bg-gray-50 border-2 border-gray-200 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                        placeholder:text-xs'
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
                  {item.type === 'file' &&
                    item.inputname == 'image' &&
                    item.field === 'predefined' && (
                      <div>
                        <label
                          htmlFor={item.label}
                          className='block text-sm font-medium leading-6 mt-2 text-gray-900'
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                        </label>
                        <input
                          type='file'
                          name={item.inputname}
                          id={item.inputname}
                          className='px-2 py-1 md:py-0.5 lg:py-0.5 xl:py-0.5 text-xs  block w-full rounded-md bg-gray-50 border-2 border-gray-200    text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6'
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
                        </label>
                        <input
                          type='email'
                          name={item.inputname}
                          id={item.inputname}
                          placeholder='Enter email'
                          value={customFormFields[index].value || ''}
                          className='px-2 py-1 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                        placeholder:text-xs'
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
                        </label>
                        <input
                          type='number'
                          name={item.inputname}
                          placeholder='Enter number'
                          id={item.inputname}
                          // value={formData[item.label] || ''}
                          value={customFormFields[index].value || ''}
                          // onChange={(e) => handleChange(index, e.target.value)}
                          onChange={(e) => {
                            const value = e.target.value.slice(0, 10); // Limiting to maximum 10 digits
                            handleChange(index, value);
                          }}
                          className='px-2 py-1 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900 appearance-none hover:appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                        placeholder:text-xs'
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
                    item.inputname == 'entityname' &&
                    item.field == 'predefined' && (
                      <div>
                        <label
                          htmlFor={item.label}
                          className='block text-sm font-medium leading-6 mt-2 text-gray-900'
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                        </label>

                        <select
                          id={item.inputname}
                          name={item.inputname}
                          className='px-2 py-1.5 text-xs block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900  shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400  placeholder:text-xs sm:leading-6'
                          onChange={(e) => handleChange(index, e.target.value)}
                          value={customFormFields[index].value || ''}
                        >
                          <option value=''>--select--</option>
                          {item.options.value &&
                            fieldsDropDownData.entityname &&
                            fieldsDropDownData.entityname.map(
                              (option, index) => (
                                <option value={option}>{option}</option>
                              )
                            )}
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
                    item.inputname == 'designation' &&
                    item.field == 'predefined' && (
                      <div>
                        <label
                          htmlFor={item.label}
                          className='block text-sm font-medium leading-6 mt-2 text-gray-900'
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                        </label>
                        <select
                          id={item.inputname}
                          name={item.inputname}
                          className='px-2 py-1.5 text-xs block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900  shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400  placeholder:text-xs sm:leading-6'
                          onChange={(e) => handleChange(index, e.target.value)}
                          value={customFormFields[index].value || ''}
                        >
                          <option value=''>--select--</option>
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
                        </label>
                        <select
                          id={item.inputname}
                          name={item.inputname}
                          className='px-2 text-xs py-1.5 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900  shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400  sm:leading-6'
                          onChange={(e) => handleChange(index, e.target.value)}
                          value={customFormFields[index].value || ''}
                        >
                          <option value=''>--select--</option>
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
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                      </label>
                      <input
                        type='text'
                        name={item.inputname}
                        placeholder={`Enter ${item.inputname}`}
                        id={item.inputname}
                        value={customFormFields[index].value || ''}
                        className='px-2  py-1 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                        placeholder:text-xs'
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
                  {item.type === 'email' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                      </label>
                      <input
                        type='email'
                        placeholder={`Enter ${item.inputname}`}
                        name={item.inputname}
                        id={item.inputname}
                        value={customFormFields[index].value || ''}
                        className='px-2 py-1 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                        placeholder:text-xs'
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
                  {item.type === 'password' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                      </label>
                      <input
                        type='password'
                        placeholder={`Enter ${item.inputname}`}
                        name={item.inputname}
                        id={item.inputname}
                        value={customFormFields[index].value || ''}
                        className='p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                        placeholder:text-xs'
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
                  {item.type === 'number' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                      </label>
                      <input
                        type='number'
                        name={item.inputname}
                        id={item.inputname}
                        value={customFormFields[index].value || ''}
                        onChange={(e) => handleChange(index, e.target.value)}
                        className='p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                        placeholder:text-xs'
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
                      </label>
                      <input
                        type='number'
                        name={item.inputname}
                        id={item.inputname}
                        value={customFormFields[index].value || ''}
                        onChange={(e) => {
                          const value = e.target.value.slice(0, 10); // Limiting to maximum 10 digits
                          handleChange(index, value);
                        }}
                        className='p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                        placeholder:text-xs'
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
                      <div className='flex gap-2'>
                        <input
                          type='checkbox'
                          placeholder={`Enter ${item.inputname}`}
                          name={item.inputname}
                          id={item.inputname}
                          className='my-1'
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
                      </label>
                      <input
                        type='date'
                        name={item.inputname}
                        id={item.inputname}
                        className='p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 text-xs sm:leading-6
                        placeholder:text-xs'
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
                  {item.type === 'time' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                      </label>
                      <input
                        type='time'
                        name={item.inputname}
                        className='px-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none text-xs focus:border-orange-400 sm:text-sm sm:leading-6
                        placeholder:text-xs'
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
                  {item.type === 'file' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                      </label>
                      <input
                        type='file'
                        name={item.inputname}
                        id={item.inputname}
                        className='px-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-0.5 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6'
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
                      </label>
                      <input
                        type='range'
                        name={item.inputname}
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
                  {item.type === 'textarea' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                      </label>
                      <textarea
                        name={item.inputname}
                        placeholder={`Enter ${item.inputname}`}
                        id={item.inputname}
                        value={customFormFields[index].value || ''}
                        className='bg-gray-50 rounded-md text-xs p-2 w-full h-20 border-2 border-gray-200 focus:outline-none focus:border-orange-400'
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
                  {item.type === 'select' && item.field == 'custom' && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className='block text-sm font-medium leading-6 my-2 text-gray-900'
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                      </label>
                      <select
                        id={item.inputname}
                        name={item.inputname}
                        className='px-2 py-1.5 text-xs block w-full bg-gray-50  rounded-md  text-gray-900   border-2 border-gray-200 shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6'
                        onChange={(e) => handleChange(index, e.target.value)}
                        value={customFormFields[index].value || ''}
                      >
                        <option value=''>--select--</option>

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
                      </label>
                      <div className='px-2 py-1.5 text-xs block w-full bg-gray-50   rounded-md  text-gray-900   border-2 border-gray-200 shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6'>
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
                                className='mr-1 '
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
                className='mt-6 flex w-full justify-center rounded-md bg-orange-600 px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
              >
                {id ? 'Edit User' : 'Create User'}
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
            <div className='relative  flex flex-col text-gray-700 shadow-md bg-clip-border  rounded-xl w-8/12 justify-center mx-auto  bg-[#fafaf9] border-2 border-gray-200 '>
              {customFormFields &&
                customFormFields.length > 0 &&
                customFormFields.map((item) => (
                  <div className=''>
                    {/* predefined fields*/}
                    <div className='bg-[#fff7ed] rounded-xl'>
                      {item.type === 'file' &&
                        item.inputname == 'image' &&
                        item.field === 'predefined' && (
                          <div>
                            {console.log(item.value, 'item.value')}
                            {item.value ? (
                              <img
                                // src={item.value}
                                src={
                                  typeof item.value === 'string'
                                    ? item.value
                                    : URL.createObjectURL(item.value)
                                }
                                // src={
                                //   media
                                //     ? URL.createObjectURL(media)
                                //     : updatedPost?.mediaURL
                                // }
                                name='EntityPhoto'
                                alt='User Photo'
                                className=' h-36 w-36 relative mx-auto bottom-20 rounded-full shadow-md'
                              />
                            ) : (
                              <img
                                className=' h-36 w-36 relative mx-auto bottom-20 rounded-full shadow-md'
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
                            <p className='absolute top-16 my-3 text-md antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
                              {' '}
                              {item.value.toUpperCase()}
                            </p>
                          ) : (
                            <p className=' absolute top-16 my-3 text-md antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
                              {' '}
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
                            <p className=' absolute top-20 mt-8   text-sm antialiased  leading-snug tracking-normal text-blue-gray-900 '>
                              {item.value}{' '}
                            </p>
                          ) : (
                            <p className=' absolute top-20 mt-8   text-sm antialiased  leading-snug tracking-normal text-blue-gray-900 '>
                              XYZ company
                            </p>
                          )}
                        </div>
                      )}
                    <div className=' '>
                      {item.type === 'email' &&
                        item.inputname == 'email' &&
                        item.field == 'predefined' && (
                          <div className='my-2 ms-5'>
                            {item.value ? (
                              <p className='flex flex-wrap gap-2'>
                                <span className='w-2/6 text-[#727a85]'>
                                  {item.label.charAt(0).toUpperCase() +
                                    item.label.slice(1)}{' '}
                                </span>
                                <span className='text-md font-[600]'>
                                  {' '}
                                  : {item.value}
                                </span>
                              </p>
                            ) : (
                              <p className='flex flex-wrap gap-2'>
                                <span className='w-2/6 text-[#727a85]'>
                                  {item.label.charAt(0).toUpperCase() +
                                    item.label.slice(1)}{' '}
                                </span>
                                <span className='text-md font-[600]'>
                                  {' '}
                                  : Email
                                </span>
                              </p>
                            )}
                          </div>
                        )}
                      {item.type === 'phonenumber' &&
                        item.inputname == 'phonenumber' &&
                        item.field == 'predefined' && (
                          <div className='my-2 ms-5'>
                            {item.value ? (
                              <p className='flex flex-wrap gap-2'>
                                <span className='w-2/6 text-[#727a85]'>
                                  {item.label.charAt(0).toUpperCase() +
                                    item.label.slice(1)}{' '}
                                </span>
                                <span className='text-md font-[600]'>
                                  {' '}
                                  : {item.value}
                                </span>
                              </p>
                            ) : (
                              <p className='flex flex-wrap gap-2'>
                                <span className='w-2/6 text-[#727a85]'>
                                  {item.label.charAt(0).toUpperCase() +
                                    item.label.slice(1)}{' '}
                                </span>
                                <span className='text-md font-[600]'>
                                  {' '}
                                  : Phone Number
                                </span>
                              </p>
                            )}
                          </div>
                        )}
                      {item.type === 'select' &&
                        item.inputname == 'designation' &&
                        item.field == 'predefined' && (
                          <div className='my-2 ms-5 '>
                            {item.value ? (
                              <p className='flex flex-wrap gap-2'>
                                <span className='w-2/6 text-[#727a85]'>
                                  {item.label.charAt(0).toUpperCase() +
                                    item.label.slice(1)}{' '}
                                </span>
                                <span className='text-md font-[600]'>
                                  {' '}
                                  : {item.value}
                                </span>
                              </p>
                            ) : (
                              <p className='flex flex-wrap gap-2'>
                                <span className='w-2/6 text-[#727a85]'>
                                  {item.label.charAt(0).toUpperCase() +
                                    item.label.slice(1)}{' '}
                                </span>
                                <span className='text-md font-[600]'>
                                  {' '}
                                  : Designation
                                </span>
                              </p>
                            )}
                          </div>
                        )}
                    </div>
                    {/* custom fields */}
                    {item.type === 'text' && item.field == 'custom' && (
                      <div className='my-2 ms-5'>
                        {item.value && item.value.length > 0 && (
                          <p className='flex flex-wrap gap-2'>
                            <span className=' w-2/6 text-[#727a85]'>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=' w-1/2 text-md font-[600]'>
                              {' '}
                              : {item.value}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    {item.type === 'email' && item.field == 'custom' && (
                      <div className='my-2 ms-5'>
                        {item.value && item.value.length > 0 && (
                          <p className='flex flex-wrap gap-2'>
                            <span className=' w-2/6 text-[#727a85]'>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=' w-1/2 text-md font-[600]'>
                              {' '}
                              : {item.value}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    {/* {
                    item.type === "password" && item.field == "custom" &&
                    <div className='my-2 ms-5'>
                      {item.value && item.value.length > 0 &&
                        <p className='flex flex-wrap gap-2'>
                          <span className=' w-2/6 text-[#727a85]'>{item.label.charAt(0).toUpperCase() + item.label.slice(1)}</span>
                          <span className=' w-1/2 text-md font-[600]'> : {item.value}</span>
                        </p>
                      }
                    </div>
                  } */}
                    {(item.type === 'number' || item.type === 'phonenumber') &&
                      item.field == 'custom' && (
                        <div className='my-2 ms-5'>
                          {item.value && item.value.length > 0 && (
                            <p className='flex flex-wrap gap-2'>
                              <span className=' w-2/6 text-[#727a85]'>
                                {item.label.charAt(0).toUpperCase() +
                                  item.label.slice(1)}
                              </span>
                              <span className=' w-1/2 text-md font-[600]'>
                                {' '}
                                : {item.value}
                              </span>
                            </p>
                          )}
                        </div>
                      )}
                    {item.type === 'textarea' && item.field == 'custom' && (
                      // mb-1 ps-6 flex flex-wrap
                      <div className='my-2 ms-5'>
                        {item.value && item.value.length > 0 && (
                          <p className='flex flex-wrap gap-2'>
                            <span className=' w-2/6 text-[#727a85]'>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=' w-1/2 text-md font-[600]'>
                              {' '}
                              : {item.value}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    {item.type === 'file' && item.field == 'custom' && (
                      <div className=" 'my-2 ms-5 ">
                        {item.value && item.value.length > 0 && (
                          <p className='flex flex-wrap gap-2'>
                            <span className='w-2/6 text-[#727a85]'>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=' w-1/2 text-md font-[600] flex gap-5'>
                              {' '}
                              :
                              <img
                                src={item.value}
                                // name="EntityPhoto"
                                alt='file'
                                className='rounded-lg w-20 h-20 '
                              />
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    {item.type === 'date' && item.field == 'custom' && (
                      <div className='my-2 ms-5'>
                        {item.value && item.value.length > 0 && (
                          <p className='flex flex-wrap gap-2'>
                            <span className=' w-2/6 text-[#727a85]'>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=' w-1/2 text-md font-[600]'>
                              {' '}
                              : {item.value}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    {item.type === 'select' && item.field == 'custom' && (
                      <div className='my-2 ms-5'>
                        {item.value && item.value.length > 0 && (
                          <p className='flex flex-wrap gap-2'>
                            <span className=' w-2/6 text-[#727a85]'>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=' w-1/2 text-md font-[600]'>
                              {' '}
                              : {item.value}
                            </span>
                          </p>
                        )}
                      </div>
                    )}

                    {item.type === 'multiselect' && item.field == 'custom' && (
                      <div className='my-2 ms-5'>
                        {item.value && item.value.length > 0 && (
                          <p className='flex flex-wrap gap-2'>
                            <span className=' w-2/6 text-[#727a85]'>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>

                            <span className=' w-1/2 text-md font-[600]'>
                              {' '}
                              : {item.value.join(', ')}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    
                    {item.type === 'range' && item.field == 'custom' && (
                      <div className='my-2 ms-5'>
                        {item.value && item.value.length > 0 && (
                          <p className='flex flex-wrap gap-2'>
                            <span className=' w-2/6 text-[#727a85]'>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=' w-1/2 text-md font-[600]'>
                              {' '}
                              : {item.value}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    {item.type === 'time' && item.field == 'custom' && (
                      <div className='my-2 ms-5'>
                        {item.value && item.value.length > 0 && (
                          <p className='flex flex-wrap gap-2'>
                            <span className=' w-2/6 text-[#727a85]'>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=' w-1/2 text-md font-[600]'>
                              {' '}
                              : {item.value}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;

// const array = [
//   {
//     "label": "Full Name",
//     "inputname": "name",
//     "type": "text",
//     "value": "",
//     "field": "predefined",
//     "mandatory": true,
//     "filterable": true
//   },
//   {
//     "label": "Image",
//     "inputname": "image",
//     "type": "file",
//     "value": "",
//     "field": "predefined",
//     "mandatory": false,
//     "filterable": false
//   },
//   {
//     "label": "Entity Name",
//     "type": "select",
//     "inputname": "entityname",
//     "value": "",
//     "filterable": true,
//     "mandatory": true,
//     "field": "predefined",
//     "options": [
//       "Reliace",
//       "Infosys",
//       "Tata consultancy",
//       "Reliace"
//     ]
//   },
//   {
//     "label": "Email Id",
//     "inputname": "email",
//     "type": "email",
//     "value": "",
//     "field": "predefined",
//     "mandatory": true,
//     "filterable": true
//   },
//   {
//     "label": "Phone Number",
//     "inputname": "phonenumber",
//     "type": "phonenumber",
//     "value": "",
//     "field": "predefined",
//     "mandatory": true,
//     "filterable": true
//   },
//   {
//     "label": "Designation",
//     "type": "select",
//     "inputname": "designation",
//     "value": "",
//     "filterable": true,
//     "mandatory": true,
//     "field": "predefined",
//     "options": [
//       "Developer",
//       "Quality Analyst",
//       "Data Analyst"
//     ]
//   },
//   {
//     "label": "Role",
//     "type": "select",
//     "inputname": "role",
//     "value": "",
//     "filterable": true,
//     "mandatory": true,
//     "field": "predefined",
//     "options": [
//       "admin",
//       "associate",
//       "Accountant",
//       "Manager"
//     ]
//   }, {
//     "label": "Role",
//     "type": "select",
//     "inputname": "sunny",
//     "value": "",
//     "filterable": true,
//     "mandatory": true,
//     "field": "predefined",
//     "options": [
//       "admin",
//       "associate",
//       "Accountant",
//       "Manager"
//     ]
//   }
// ];

// const values = {name: "irshad", entityname: "infisys", email: "irshad@gmail.com", phonenumber: 12345, designation: "djlkdja", role: "manager",sunny:"uiouiui"};

// array.forEach(input => {
//   if (values.hasOwnProperty(input.inputname)) {
//     input.value = values[input.inputname];
//   }
// });

// console.log(array);
