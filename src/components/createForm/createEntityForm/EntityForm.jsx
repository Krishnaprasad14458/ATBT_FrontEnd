import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './EntityForm.css';
import defprop from '../../../Images/defprof.svg';
import useDebounce from '../../../hooks/debounce/useDebounce';
import { UserDataContext } from '../../../contexts/usersDataContext/usersDataContext';
import { EntitiesDataContext } from '../../../contexts/entitiesDataContext/entitiesDataContext';
function EntityForm() {
  const { usersState: { users, dashboard }, usersDispatch } = useContext(UserDataContext);
  const { createEntity } = useContext(EntitiesDataContext);
  const usersEmails = dashboard.paginatedUsers?.map(user => user.email);
  const { debouncedSetPage, debouncedSetSearch } = useDebounce(usersDispatch);
  const [errors, setErrors] = useState({})
  let [openOptions, setopenOptions] = useState("")
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  let [customFormFields, setCustomFormFields] = useState()
  const handleInputChange = (e) => {
    setShowUsers(true)
    const value = e.target.value;
    setSearchTerm(() => {
      debouncedSetSearch(value);
      return value;
    });
  };
  const handleOpenOptions = (name) => {
    if (openOptions == name) {
      setopenOptions("")
    }
    if (openOptions != name) {
      setopenOptions(name)
    }
  }
  const handleClick = (value, index) => {
    setSelected((e) => [...e, value])
    const updatedFormData = [...customFormFields];
    let members = updatedFormData[index].value
    members.push(value)
    updatedFormData[index].value = members
    setCustomFormFields(updatedFormData);
    setSearchTerm('');
    setShowUsers(false);
  };

  const handleRemove = (user, index) => {
    const updatedSelected = selected.filter((selectedUser) => selectedUser !== user);
    setSelected(updatedSelected);
    const updatedMembers = customFormFields[index].value.filter((selectedUser) => selectedUser !== user);
    const updatedFormData = [...customFormFields];
    updatedFormData[index].value = updatedMembers;
    setCustomFormFields(updatedFormData);
  };

  useEffect(() => {
    axios.get(`https://atbtmain.teksacademy.com/form/list?name=entityform`)
      .then(response => {
        // Handle the successful response
        setCustomFormFields(response.data.array)
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  }, [])
  const handleChange = (index, newValue) => {

    const updatedFormData = [...customFormFields];
    if (updatedFormData[index].type != "multiselect") {
      updatedFormData[index].value = newValue;
      setCustomFormFields(updatedFormData);
    }
    if (updatedFormData[index].type == "multiselect") {
      // { item.value.includes(option) }
      let selectedoptions = updatedFormData[index].value;
      if (selectedoptions.includes(newValue)) {
        selectedoptions = selectedoptions.filter((option) => option != newValue)
      }
      else {
        selectedoptions.push(newValue);

      }
      updatedFormData[index].value = selectedoptions;
      setCustomFormFields(updatedFormData);

    }

  };
  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    const name = event.target.name;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedFormData = [...customFormFields];
        updatedFormData[index].value = reader.result;
        setCustomFormFields(updatedFormData);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log("customFormFields", customFormFields)
  function handleFormSubmit(e) {
    e.preventDefault();

    // for (let i = 0; i < customFormFields.length; i++) {
    //   if (customFormFields[i].type == "text" && customFormFields[i].mandatory) {
    //     if (customFormFields[i].value.length == 0) {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `please enter ${customFormFields[i].label}` }))
    //     }
    //     else if (customFormFields[i].value.length < 3) {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "name should contain atleast 3 characters" }))

    //     }
    //     else {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
    //     }
    //   }
    //   if (customFormFields[i].type == "file" && customFormFields[i].mandatory) {
    //     if (!customFormFields[i].value) {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `please upload ${customFormFields[i].label}` }))

    //     }
    //     else {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
    //     }
    //   }
    //   if (customFormFields[i].type == "textarea" && customFormFields[i].mandatory) {
    //     if (customFormFields[i].value.length == 0) {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `please enter ${customFormFields[i].label}` }))

    //     }
    //     else if (customFormFields[i].value.length < 3) {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "Name should contain atleast 3 characters" }))

    //     }
    //     else {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
    //     }
    //   }
    //   if (customFormFields[i].type == "email" && customFormFields[i].mandatory) {
    //     if (customFormFields[i].value.length < 1) {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `please enter ${customFormFields[i].label}` }))

    //     }

    //     else {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
    //     }
    //   }
    //   if (customFormFields[i].type == "number" && customFormFields[i].mandatory) {
    //     if (customFormFields[i].value.length < 1) {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `pease enter ${customFormFields[i].label}` }))

    //     }
    //     else if (customFormFields[i].value.length != 10) {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `please enter correct ${customFormFields[i].label}` }))

    //     }

    //     else {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
    //     }
    //   }
    //   if (customFormFields[i].type == "select" && customFormFields[i].mandatory) {
    //     if (customFormFields[i].value.length < 1) {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `please enter ${customFormFields[i].label}` }))

    //     }

    //     else {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
    //     }
    //   }
    //   if (customFormFields[i].type == "multiselect" && customFormFields[i].mandatory) {
    //     if (customFormFields[i].value.length < 1) {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `please enter ${customFormFields[i].label}` }))

    //     }

    //     else {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
    //     }
    //   }
    //   if (customFormFields[i].type == "date" && customFormFields[i].mandatory) {
    //     if (!customFormFields[i].value) {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `please enter ${customFormFields[i].label}` }))

    //     }

    //     else {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
    //     }
    //   }
    //   if (customFormFields[i].type == "checkbox" && customFormFields[i].mandatory) {
    //     if (!customFormFields[i].value) {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `please enter ${customFormFields[i].label}` }))

    //     }

    //     else {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
    //     }
    //   }
    //   if (customFormFields[i].type == "range" && customFormFields[i].mandatory) {
    //     if (!customFormFields[i].value) {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `please enter ${customFormFields[i].label}` }))

    //     }

    //     else {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
    //     }
    //   }
    //   if (customFormFields[i].type == "time" && customFormFields[i].mandatory) {
    //     if (!customFormFields[i].value) {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `please enter ${customFormFields[i].label}` }))

    //     }

    //     else {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
    //     }
    //   }
    //   if (customFormFields[i].type == "password" && customFormFields[i].mandatory) {
    //     if (customFormFields[i].value.length < 1) {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: `please enter ${customFormFields[i].label}` }))

    //     }

    //     else {
    //       setErrors((prev) => ({ ...prev, [customFormFields[i].inputname]: "" }))
    //     }
    //   }

    // }
    const formData = new FormData(e.target)
    let membersArray = ["dfsfds", "Fsdfds"];
    formData.set("members", JSON.stringify(membersArray));
    const jsonData = {};
    // const jsonDataa = {};

    jsonData.customFieldsData = JSON.stringify(customFormFields)
    jsonData.loggedInUser = parseInt(localStorage.getItem("id"))
   
    for (let i = 0; i < customFormFields.length; i++) {
      if (Array.isArray(customFormFields[i].value)) {
        jsonData[customFormFields[i].inputname] = JSON.stringify(customFormFields[i].value)

      } else {
        jsonData[customFormFields[i].inputname] = customFormFields[i].value

      }

    }
    // for (let [key, value] of formData.entries()) {
    //   if (jsonData.hasOwnProperty(key)) {
    //     if (Array.isArray(jsonData[key])) {
    //       jsonData[key].push(value);
    //     } else {
    //       jsonData[key] = [jsonData[key], value];
    //     }
    //   } else {
    //     jsonData[key] = value;
    //   }
    // }
    console.log("jsonData", jsonData);
    axios.post(
      `https://atbtmain.teksacademy.com/entitydata`, jsonData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    // createEntity(formData)
  }
  return (
    <div className='container p-4 bg-[#f8fafc]'>
      {/* <p className="font-lg font-semibold p-3">Entity Form</p> */}
      <p className="text-lg font-semibold">New Entity</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
        <div className="col-span-1 p-3">
          <form className=" " method="POST" onSubmit={handleFormSubmit} >
            {customFormFields &&
              customFormFields.length > 0 &&
              customFormFields.map((item, index) => (
                <div key={index}>
                  {/* predefined fields */}
                  {item.type === 'text' && item.inputname == "name" && item.field === "predefined" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="text"
                        name={item.inputname}
                        id={item.inputname}
                        placeholder='Enter entity name'
                        value={customFormFields[index].value || ''}
                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                        placeholder:text-xs"
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>
                    </div>
                  )}
                  {item.type === 'file' && item.inputname == "image" && item.field === "predefined" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="file"
                        name={item.inputname}
                        id={item.inputname}
                        className="px-2  block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-0.5 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        onChange={(event) => handleFileChange(event, index)}
                        accept="image/*"
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>
                    </div>
                  )}
                  {item.type === 'textarea' && item.inputname == "description" && item.field === "predefined" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <textarea
                        name={item.inputname}
                        placeholder='Type here....'

                        id={item.inputname}

                        value={customFormFields[index].value || ''}

                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-xs  text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6 placeholder:text-xs"

                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}
                  {item.type === 'multiselect' && item.inputname == "members" && item.field == "predefined" && (

                    <div className='relative'>
                      <label htmlFor="email" className="block text-sm  font-medium leading-6 my-2 text-gray-900">{item.label}</label>

                      <div className='border-2 border-gray-200 flex flex-wrap gap-1 p-1.5 selected-users-container relative z-50   rounded-md'>
                        {selected && selected.length > 0 && selected.map((result) => {

                          let mail = result.split("@")[0]
                          return (
                            <span className='flex gap-1 text-xs mt-1 border-2 border-gray-200 rounded-md  focus:border-orange-600'>
                              <img className="w-4 h-4 rounded-lg" src={defprop} alt="Neil image" /> {mail} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                className="w-4 h-4 " onClick={() => handleRemove(result, index)}>
                                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                              </svg>
                            </span>
                          )
                        })}
                        <input
                          type="text"
                          placeholder='Type email id'
                          tabindex="0" aria-describedby="lui_5891" aria-invalid="false"
                          style={{ border: "none" }}
                          className='bg-[#f8fafc]  h-5  focus:outline-none z-40 placeholder:text-xs placeholder:pt-2'
                          value={searchTerm}
                          onChange={handleInputChange}
                        />
                      </div>
                      {showUsers && (
                        <ul className="user-list z-50 absolute top-full left-0  bg-gray-50 border border-1 border-gray-200 w-full">

                          {usersEmails?.filter(user => !selected.includes(user))
                            // .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
                            .map((user, ind) => (
                              <li key={ind}
                                className='px-3 py-1 text-sm hover:bg-gray-200'

                                onClick={() => handleClick(user, index)}>
                                {user}
                              </li>
                            ))}
                        </ul>
                      )}
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>

                  )}




                  {/* custom fields */}
                  {item.type === 'text' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="text"
                        name={item.inputname}
                        id={item.inputname}
                        value={customFormFields[index].value || ''}
                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                        placeholder:text-xs"
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>
                    </div>
                  )}
                  {item.type === 'email' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="email"
                        name={item.inputname}
                        id={item.inputname}

                        value={customFormFields[index].value || ''}

                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                        placeholder:text-xs"
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>
                    </div>
                  )}
                  {item.type === 'password' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="password"
                        name={item.inputname}

                        id={item.inputname}
                        // value={formData[item.label] || ''}
                        value={customFormFields[index].value || ''}

                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                        placeholder:text-xs"
                        // onChange={handleChange}
                        onChange={(e) => handleChange(index, e.target.value)}

                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>
                    </div>
                  )}
                  {item.type === 'number' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="number"
                        name={item.inputname}
                        id={item.inputname}
                        value={customFormFields[index].value || ''}
                        onChange={(e) => handleChange(index, e.target.value)}
                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                        placeholder:text-xs"

                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>
                    </div>
                  )}
                  {item.type === 'checkbox' && item.field == "custom" && (
                    <div className='flex gap-2'>

                      <input
                        type="checkbox"
                        name={item.inputname}
                        id={item.inputname}
                        checked={!!customFormFields[index].value}
                        onChange={(e) => handleChange(index, e.target.checked)}

                      />  <label htmlFor={item.inputname} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>

                  )}
                  {item.type === 'date' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="date"
                        name={item.inputname}
                        id={item.inputname}

                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                        placeholder:text-xs"

                        value={customFormFields[index].value || ''}

                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}
                  {item.type === 'time' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="time"
                        name={item.inputname}

                        className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                        placeholder:text-xs"
                        id={item.inputname}

                        value={customFormFields[index].value || ''}
                        onChange={(e) => handleChange(index, e.target.value)}

                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}
                  {item.type === 'file' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="file"
                        name={item.inputname}


                        id={item.inputname}
                        className=" px-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-0.5 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"

                        onChange={(event) => handleFileChange(event, index)}
                        accept="image/*"
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}

                  {item.type === 'range' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <input
                        type="range"
                        name={item.inputname}


                        id={item.inputname}
                        value={customFormFields[index].value || ''}

                        // className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                        onChange={(e) => handleChange(index, e.target.value)}

                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}
                  {item.type === 'textarea' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <textarea
                        name={item.inputname}


                        id={item.inputname}

                        value={customFormFields[index].value || ''}
                        className="bg-gray-50 rounded-md text-xs p-2 w-full h-20 border-2 border-gray-200 focus:outline-none focus:border-orange-400"

                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}

                  {item.type === 'select' && item.field == "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>

                      <select
                        id={item.inputname}
                        name={item.inputname}
                        className="p-2 text-xs block w-full bg-gray-50  rounded-md  text-gray-900   border-2 border-gray-200 shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6"
                        onChange={(e) => handleChange(index, e.target.value)}
                        value={customFormFields[index].value || ''}
                      >{item.options && item.options.map((option, index) => (
                        <option value={option}>{option}</option>
                      ))}

                      </select>
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}
                  {item.type === 'multiselect' && item.field === "custom" && (
                    <div>
                      <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                      <div className='p-2 text-xs block w-full bg-gray-50  rounded-md  text-gray-900   border-2 border-gray-200 shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6'>

                        <span onClick={() => handleOpenOptions(item.inputname)} >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                          </svg>
                        </span></div>
                      {openOptions === item.inputname && (
                        <div className="block  border-2 border-gray-200 px-3 h-28 overflow-y-auto">
                          {item.options.map((option, subindex) => (
                            <div key={subindex} className="mr-2 mb-2">
                              <input
                                type="checkbox"
                                id={option}
                                checked={item.value.includes(option)}
                                onChange={(e) => handleChange(index, option)}
                                className="mr-1"

                              />
                              <label htmlFor={option} className="select-none">{option}</label>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className='h-2 text-[#dc2626]'>{errors[item.inputname] && <span>{errors[item.inputname]}</span>}</div>

                    </div>
                  )}
                </div>
              ))}
            <div className=''>
              <button type="submit"
                className="mt-6 flex w-full justify-center rounded-md bg-orange-600 px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Create Entity</button>
            </div>
          </form>
        </div>
        {/* preview */}
        <div className='col-span-2 hidden sm:block md:block'>
          <div className='h-[500px] overflow-auto shadow-md px-6 py-4 border-2 rounded-md bg-[#f8fafc] '>
            {customFormFields && customFormFields.length > 0 && customFormFields.map((item) => (
              <div className='relative' >

                {/* predefined fields*/}
                {item.type === 'text' && item.inputname == "name" && item.field == "predefined" && (
                  <p className="text-sm font-black text-gray-800 mt-2 absolute left-12">{item.value}</p>
                )}
                {item.type === 'file' && item.inputname == "image" && item.field == "predefined" && (
                  <div className="flex gap-4">
                    <div className="group h-10 ">
                      {item.value ? (
                        <img
                          src={item.value}
                          name="EntityPhoto"
                          alt="Selected User Photo"
                          className="rounded-lg w-10 h-10 mr-4"
                        />
                      ) : (
                        <img className="w-10 h-10 rounded-lg " src={defprop} alt="defult image" />
                      )}
                    </div>
                  </div>
                )}
                {item.type === 'textarea' && item.inputname == "description" && item.field == "predefined" && (
                  <div className='h-28 overflow-auto border border-1 border-gray-200 rounded-md p-2 bg-[#f8fafc] text-sm w-full mt-4'>
                    {item.value}
                  </div>
                )}
                {item.type === 'multiselect' && item.inputname == "members" && item.field == "predefined" && (
                  <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-5'>
                    {item.value && Array.from({ length: 12 }).map((_, index) => {
                      let first = "";
                      let second = "";
                      let firstLetter;
                      let secondLetter;
                      let mail = "";
                      if (index < item.value.length) {
                        mail = item.value[index].split("@")[0]
                        if (mail.includes(".")) {
                          first = mail.split(".")[0]
                          second = mail.split(".")[1]
                          firstLetter = first[0]
                          secondLetter = second[0]
                        }
                        else {
                          firstLetter = mail[0]
                        }
                      }
                      if (mail.includes(".")) {
                        first = mail.split(".")[0]
                        second = mail.split(".")[1]
                        firstLetter = first[0]
                        secondLetter = second[0]
                      }
                      else {
                        firstLetter = mail[0]
                      }
                      //color
                      const colors = ["#818cf8", "#fb923c", "#f87171", "#0891b2", "#db2777", "#f87171", "#854d0e", "#166534"];
                      const getRandomColor = (firstLetter) => {

                        const randomIndex = firstLetter.charCodeAt(0) % colors.length


                        return colors[randomIndex];
                      };


                      return (
                        <div className='col-span-1 flex justify-start gap-3' key={index}>


                          {index + 1 <= item.value.length && <>
                            <h5 style={{ backgroundColor: `${getRandomColor(firstLetter)}` }} className=' rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'>

                              {index < 11 && <>
                                {firstLetter.toUpperCase()}{secondLetter && secondLetter.toUpperCase()}</>}{index == 11 && item.value.length == 12 && <>
                                  {firstLetter.toUpperCase()}{secondLetter && secondLetter.toUpperCase()}</>} {index == 11 && item.value.length > 12 && <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                    </svg>
                                  </span>}
                            </h5>
                            <div className=' flex items-center'>

                              <div className=' '>{index < 11 && mail}{index == 11 && item.value.length == 12 && mail} {index == 11 && item.value.length > 12 && <span>+{item.value.length - 11} more</span>} </div>
                            </div>
                          </>}
                          {index + 1 > item.value.length && <>
                            <h5 className='bg-[#e5e7eb] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'>

                            </h5>
                            <div className=' flex items-center'>
                              <div className=' rounded-md  bg-[#e5e7eb] h-2 w-28'> </div>
                            </div>
                          </>}
                        </div>
                      )
                    })}
                  </div>
                )}
                {/* customfields */}
                {item.type === "text" && item.field == "custom" && <div>
                  {item.value}

                </div>}
                {item.type === "email" && item.field == "custom" && <div>
                  {item.value}

                </div>}
                {item.type === "password" && item.field == "custom" && <div>
                  {item.value}

                </div>}
                {item.type === "number" && item.field == "custom" && <div>
                  {item.value}

                </div>}
                {item.type === "textarea" && item.field == "custom" && <div>
                  {item.value}

                </div>}
                {item.type === 'file' && item.field == "custom" && (
                  <div className="flex gap-4">
                    <div className="group h-10 ">

                      {item.value ? (
                        <img
                          src={item.value}
                          name="EntityPhoto"
                          alt="Selected User Photo"
                          className="rounded-lg w-10 h-10 mr-4"
                        />
                      ) : (
                        <img className="w-10 h-10 rounded-lg " src={defprop} alt="Neil image" />

                      )}
                    </div>
                    <hr className='my-3' />

                  </div>
                )}
                {item.type === "date" && item.field == "custom" && <div>
                  {item.value}

                </div>}
                {item.type === "select" && item.field == "custom" && <div>
                  {item.value}

                </div>}


                {item.type === "multiselect" && item.field == "custom" && <div>

                  {item.value.join(', ')}


                </div>}
                {item.type === "checkbox" && item.field == "custom" && <div>
                  {item.value}

                </div>}
                {item.type === "range" && item.field == "custom" && <div>
                  {item.value}

                </div>}
                {item.type === "time" && item.field == "custom" && <div>
                  {item.value}

                </div>}

              </div>
            )

            )}
          </div>
        </div>
      </div>
    </div >
  );
}

export default EntityForm;
