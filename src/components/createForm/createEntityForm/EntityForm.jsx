import React, { useState, useRef, useContext } from 'react';
import defprop from '../../../Images/defprof.svg';
import './EntityForm.css';
import { EntitiesDataContext } from '../../../contexts/entitiesDataContext/entitiesDataContext';
import { Link } from 'react-router-dom';
// import { UserDataContext } from '../../../contexts/usersDataContext';
import { UserDataContext } from '../../../contexts/usersDataContext/usersDataContext';

function EntityForm() {
  const { usersState: { users: {users} } } = useContext(UserDataContext);
  console.log(users, "entity form")
  const usersEmails = users?.map(user => user.email);
  const { entitiesState: { pagination }, entitiesDispatch, deleteEntitybyId, createEntity } = useContext(EntitiesDataContext);

  // choose file
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      console.log(file)
      const reader = new FileReader();
      console.log(reader);
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setEntityForm((e) => ({
          ...e, EntityPhoto: reader.result
        }))
        setSelectedFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChooseFileClick = () => {
    document.getElementById('fileInput').click();
  };
  //  for binding data
  const [entityForm, setEntityForm] = useState({
    Entite_Name: "",
    EntityPhoto: "",
    Description: "",
    entitymembers: []
  });
  console.log(entityForm)
  console.log(entityForm)
const handleChange = (e) => {
  const { name, value } = e.target;
  setEntityForm((prevEntityForm) => ({
    ...prevEntityForm,
    [name]: value
  }));
};
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  // const users = ["irshad.mohd@gmail.com", "bhavitha@gmail.com", "balu@gmail.com", "irshafd.mohd@gmail.com", "ds.mohd@gmail.com", "irshadsfd.mohd@gmail.com", "bhaviftha@gmail.com", "balfu@gmail.com", "anil@gmail.com", "niraj@gmail.com", "irfan@gmail.com", "lashmi@gmail.com", "suma@gmail.com", "vivek@gmail.com"];
  const handleInputChange = (value) => {
    setQuery(value);
    setShowUsers(true);
  };
  const handleClick = (value) => {
    setSelected((e) => [...e, value])
    // setEntityForm((e) => [...e, value])

    setEntityForm((prevEntityForm) => ({
      ...prevEntityForm,
      entitymembers: [...prevEntityForm.entitymembers, value]
    }));
    setQuery('');
    setShowUsers(false);
  };
  //  for add member input remove users
  const handleRemove = (user) => {
    const updatedSelected = selected.filter((selectedUser) => selectedUser !== user);
    const updatedMembers = entityForm.entitymembers.filter((selectedUser) => selectedUser !== user);
    setEntityForm((prevEntityForm) => ({
      ...prevEntityForm,
      entitymembers: updatedMembers
    }));
    setSelected(updatedSelected);
  };

  function handleFormSubmit(e){
    e.preventDefault();
    createEntity(entityForm);
  }


  return (

    <div className='container p-4 bg-[#f8fafc]'>
      {/* <p className="font-lg font-semibold p-3">Entity Form</p> */}
      <p className="text-lg font-semibold">New Entity</p>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-3  gap-6 mt-4 ">
        <div className="col-span-1 ps-5 pe-8">
          <form className="space-y-3" method="POST" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Entity Name</label>
              <div className="">
                <input id="name" name="Entite_Name" type="text" autoComplete="name" onChange={handleChange} value={entityForm.Entite_Name} required className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 my-2 text-gray-900">Choose Your Photo</label>
              <input
                type="file"
                name="EntityPhoto"
                id="fileInput"
                className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div>
              <label htmlFor="name" className=" block text-sm my-2 font-medium leading-6 text-gray-900" >Description</label>
              <div className=''>
                <textarea name='Description' onChange={handleChange} value={entityForm.Description} class="resize-none bg-gray-50 rounded-md text-xs p-2 w-full h-20 border-2 border-gray-200 focus:outline-none focus:border-orange-400"></textarea>
              </div>
            </div>

            <div className='relative'>
              <label htmlFor="email" className="block text-sm my-2 font-medium leading-6 text-gray-900">Add Member</label>

              <div className='border border-1 flex flex-wrap gap-1 px-1 py-1 selected-users-container relative z-50 rounded-md'>
                {selected && selected.length > 0 && selected.map((result) => {

                  let mail = result.split("@")[0]
                  return (
                    <span className='flex gap-1 text-xs mt-1 border-2 border-gray-200 rounded-md p-0.5 focus:border-orange-600
                    '>
                      <img class="w-4 h-4 rounded-lg" src={defprop} alt="Neil image" /> {mail} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                        class="w-4 h-4 " onClick={() => handleRemove(result)}>
                        <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                      </svg>
                    </span>
                  )
                })}

              
                <input
                  type="text"
                  tabindex="0" aria-describedby="lui_5891" aria-invalid="false"
                  style={{ border: "none" }}
                  className='bg-[#f8fafc] w-20 h-5 mt-1 focus:outline-none z-40'
                  value={query}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
              </div>
              {showUsers && (
                <ul className="user-list z-50 absolute top-full left-0  bg-gray-50 border border-1 border-gray-200 w-full">

                  {usersEmails?.filter(user => !selected.includes(user))
                    .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
                    .map((user, index) => (
                      <li key={index}
                        className='px-3 pb-0.5 hover:bg-gray-200'

                        onClick={() => handleClick(user)}>
                        {user}
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <div className=''>
              <button type="submit"
                className="mt-6 flex w-full justify-center rounded-md bg-orange-600 px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Create Entity</button>
            </div>
          </form>
        </div>

        <div className="col-span-2 h-[500px] overflow-auto shadow-md px-6 py-4 border-2 rounded-md bg-[#f8fafc]  ">
          <div className='mb-5 mt-3'>
            <div className="flex gap-4">
              <div className="group h-10 ">
                {imageSrc ? (
                  <img
                    src={entityForm.EntityPhoto}
                    name="EntityPhoto"
                    alt="Selected User Photo"
                    className="rounded-lg w-10 h-10 mr-4"
                  />
                ) : (
                  <img class="w-10 h-10 rounded-lg " src={defprop} alt="Neil image" />
                  // <img
                  //   src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  //   alt="Default User Photo"
                  //   className="rounded-full w-12 h-12 mr-4"
                  // />
                )}
              </div>
              <p class="text-lg font-black text-gray-800 mt-2">{entityForm.Entite_Name}</p>

            </div>
            <hr className='my-3' />
            <div className='h-20 overflow-auto border border-1 border-gray-200 rounded-md p-2 bg-[#f8fafc] text-sm w-full  '>
              {/* <textarea className="resize-none h-20 border border-1 border-gray-200 focus:outline-none "> */}
              {entityForm.Description}
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
              {entityForm && entityForm.entitymembers && Array.from({ length: 12 }).map((_, index) => {
                let first = "";
                let second = "";
                let firstLetter;
                let secondLetter;
                let mail = "";
                if (index < entityForm.entitymembers.length) {
                  mail = entityForm.entitymembers[index].split("@")[0]
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

                  // const randomIndex = Math.floor(Math.random() * colors.length);
                  return colors[randomIndex];
                };

                // const randomColor = getRandomColor();
                return (
                  <div className='col-span-1 flex justify-start gap-3' key={index}>

                    {index + 1 <= entityForm.entitymembers.length && <>
                      <h5 style={{ backgroundColor: `${getRandomColor(firstLetter)}` }} className=' rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'>

                        {index < 11 && <>
                          {firstLetter.toUpperCase()}{secondLetter && secondLetter.toUpperCase()}</>}{index == 11 && entityForm.entitymembers.length == 12 && <>
                            {firstLetter.toUpperCase()}{secondLetter && secondLetter.toUpperCase()}</>} {index == 11 && entityForm.entitymembers.length > 12 && <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                              </svg>
                            </span>}
                      </h5>
                      <div className=' flex items-center'>

                        <div className=' '>{index < 11 && mail}{index == 11 && entityForm.entitymembers.length == 12 && mail} {index == 11 && entityForm.entitymembers.length > 12 && <span>+{entityForm.entitymembers.length - 11} more</span>} </div>
                      </div>
                    </>}
                    {index + 1 > entityForm.entitymembers.length && <>
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
          </div>
        </div>

      </div>
    </div>
  );
}

export default EntityForm;




// import React, { useState, useRef, useContext, useEffect } from 'react';
// import defprop from '../../../Images/defprof.svg';
// import './EntityForm.css';
// import { EntitiesDataContext } from '../../../contexts/entitiesDataContext/entitiesDataContext';
// import { Link } from 'react-router-dom';
// import { UserDataContext } from '../../../contexts/usersDataContext/usersDataContext';
// import axios from 'axios';
// import Draggable from 'react-draggable';
// import useDebounce from '../../../hooks/debounce/useDebounce';

// function EntityForm() {
//   const { usersState: { users, pagination }, usersDispatch } = useContext(UserDataContext);
//   const { debouncedSetPage, debouncedSetSearch } = useDebounce(usersDispatch);
//   const [searchTerm, setSearchTerm] = useState('');
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(() => {
//       debouncedSetSearch(value);
//       return value;
//     });
//   };
//   console.log(pagination)
//   const [positions, setPositions] = useState([
//     { x: 0, y: 0 },
//     { x: 0, y: 0 }, { x: 0, y: 0 },
//     { x: 0, y: 0 }, { x: 0, y: 0 },
//     { x: 0, y: 0 }  // Add more positions as needed
//   ]);

//   const handleDrag = (index, e, ui) => {
//     const { x, y } = ui;
//     const newPositions = [...positions];
//     newPositions[index] = { x, y };
//     setPositions(newPositions);
//   };

//   let [customFormFields, setCustomFormFields] = useState()
//   useEffect(() => {
//     axios.get(`https://atbtmain.teksacademy.com/form/list?name=entityform`)
//       .then(response => {
//         // Handle the successful response
//         setCustomFormFields(response.data.array)
//         console.log("Dsdsd", response.data.array);
//       })
//       .catch(error => {
//         // Handle errors
//         console.error('Error fetching data:', error);
//       });
//   }, [])
//   const [formData, setFormData] = useState({});
//   // const handleChange = (e) => {
//   //   const { name, value, type, checked } = e.target;
//   //   setFormData((prevFormData) => ({
//   //     ...prevFormData,
//   //     [name]: type === 'checkbox' ? checked : value,
//   //   }));
//   // };
//   // Function to update formData based on index
//   const handleChange = (index, newValue) => {
//     // Create a shallow copy of the formData array
//     const updatedFormData = [...customFormFields];

//     // Update the value at the specified index
//     updatedFormData[index].value = newValue;

//     // Set the state with the updated array
//     setCustomFormFields(updatedFormData);
//   };

//   const handleFileChange = (event, index) => {
//     const file = event.target.files[0];
//     const name = event.target.name;
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const updatedFormData = [...customFormFields];

//         // Update the value at the specified index
//         updatedFormData[index].value = reader.result;

//         // Set the state with the updated array
//         setCustomFormFields(updatedFormData);
//         // setCustomFormFields((prevFields) => ({
//         //   ...prevFields,
//         //   [name]: reader.result,
//         // }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   useEffect(() => {
//     console.log("formData", formData)
//     console.log("customFormFields", customFormFields)

//   })


//   return (

//     <div className='container p-4 bg-[#f8fafc]'>
//       {/* <p className="font-lg font-semibold p-3">Entity Form</p> */}
//       <p className="text-lg font-semibold">New Entity</p>
//       <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-3  gap-6 mt-4 ">
//         <div className="col-span-1 ps-5 pe-8">
//           <form className="space-y-3" method="POST" >
//             {customFormFields &&
//               customFormFields.length > 0 &&
//               customFormFields.map((item, index) => (
//                 <div key={index}>
//                   {item.type === 'text' && (
//                     <div>
//                       <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
//                         {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
//                       </label>
//                       <input
//                         type="text"
//                         name={item.label}
//                         id={item.label}
//                         // value={formData[item.label] || ''}
//                         value={customFormFields[index].value || ''}
//                         className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
//                         onChange={(e) => handleChange(index, e.target.value)}
//                       />
//                     </div>
//                   )}
//                   {item.type === 'email' && (
//                     <div>
//                       <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
//                         {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
//                       </label>
//                       <input
//                         type="email"
//                         name={item.label}
//                         id={item.label}
//                         value={formData[item.label] || ''}
//                         className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
//                         onChange={handleChange}
//                       />
//                     </div>
//                   )}
//                   {item.type === 'password' && (
//                     <div>
//                       <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
//                         {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
//                       </label>
//                       <input
//                         type="password"
//                         name={item.label}
//                         id={item.label}
//                         value={formData[item.label] || ''}
//                         className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
//                         onChange={handleChange}
//                       />
//                     </div>
//                   )}
//                   {item.type === 'number' && (
//                     <div>
//                       <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
//                         {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
//                       </label>
//                       <input
//                         type="number"
//                         name={item.label}
//                         id={item.label}
//                         value={formData[item.label] || ''}
//                         className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
//                         onChange={handleChange}
//                       />
//                     </div>
//                   )}
//                   {item.type === 'checkbox' && (
//                     <div>
//                       <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
//                         {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
//                       </label>
//                       <input
//                         type="checkbox"
//                         name={item.label}
//                         id={item.label}
//                         checked={!!formData[item.label]} // Use checked attribute for checkbox
//                         // className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
//                         onChange={handleChange}
//                       />
//                     </div>
//                   )}
//                   {item.type === 'date' && (
//                     <div>
//                       <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
//                         {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
//                       </label>
//                       <input
//                         type="date"
//                         name={item.label}
//                         id={item.label}
//                         value={formData[item.label] || ''}
//                         className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
//                         onChange={handleChange}
//                       />
//                     </div>
//                   )}
//                   {item.type === 'time' && (
//                     <div>
//                       <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
//                         {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
//                       </label>
//                       <input
//                         type="time"
//                         name={item.label}
//                         id={item.label}
//                         value={formData[item.label] || ''}
//                         // className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
//                         onChange={handleChange}
//                       />
//                     </div>
//                   )}
//                   {item.type === 'file' && (
//                     <div>
//                       <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
//                         {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
//                       </label>
//                       <input
//                         type="file"
//                         name={item.label}
//                         id={item.label}
//                         className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
//                         onChange={(event) => handleFileChange(event, index)}
//                         accept="image/*"
//                       />
//                     </div>
//                   )}
//                   {item.type === 'radio' && (
//                     <div>
//                       <label className="block text-sm font-medium leading-6 my-2 text-gray-900">
//                         {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
//                       </label>


//                       <input
//                         type="radio"
//                         name={item.label}
//                         id={`${item.label}-option1`}
//                         checked={formData[item.label] === 'option1'}
//                         onChange={handleChange}
//                         value="option1"
//                       />
//                       <label htmlFor={`${item.label}-option1`} className="ml-2">
//                         Option 1
//                       </label>


//                       <input
//                         type="radio"
//                         name={item.label}
//                         id={`${item.label}-option2`}
//                         checked={formData[item.label] === 'option2'}
//                         onChange={handleChange}
//                         value="option2"
//                       />
//                       <label htmlFor={`${item.label}-option2`} className="ml-2">
//                         Option 2
//                       </label>


//                       <input
//                         type="radio"
//                         name={item.label}
//                         id={`${item.label}-option3`}
//                         checked={formData[item.label] === 'option3'}
//                         onChange={handleChange}
//                         value="option3"
//                       />
//                       <label htmlFor={`${item.label}-option3`} className="ml-2">
//                         Option 3
//                       </label>
//                     </div>
//                   )}
//                   {item.type === 'range' && (
//                     <div>
//                       <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
//                         {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
//                       </label>
//                       <input
//                         type="range"
//                         name={item.label}
//                         id={item.label}
//                         value={formData[item.label] || ''}
//                         // className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
//                         onChange={handleChange}
//                       />
//                     </div>
//                   )}
//                   {item.type === 'textarea' && (
//                     <div>
//                       <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
//                         {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
//                       </label>
//                       <textarea
//                         name={item.label}
//                         id={item.label}
//                         // value={formData[item.label] || ''}
//                         value={customFormFields[index].value || ''}
//                         className="bg-gray-50 rounded-md text-xs p-2 w-full h-20 border-2 border-gray-200 focus:outline-none focus:border-orange-400"
//                         // className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
//                         onChange={(e) => handleChange(index, e.target.value)}
//                       />
//                     </div>
//                   )}

//                   {item.type === 'select' && (
//                     <div>
//                       <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
//                         {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
//                       </label>

//                       <select
//                         id={item.label}
//                         name={item.label}

//                         onChange={handleChange}
//                         value={formData[item.label] || ''}
//                       >
//                         <option value="option1">Option 1</option>
//                         <option value="option2">Option 2</option>
//                         <option value="option3">Option 3</option>

//                       </select>
//                     </div>
//                   )}
//                   {item.type === 'multiselect' && (
//                     <div>
//                       <label htmlFor={item.label} className="block text-sm font-medium leading-6 my-2 text-gray-900">
//                         {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
//                       </label>

//                       <input
//                         type="text"
//                         name={item.label}
//                         id={item.label}
//                         // value={formData[item.label] || ''}
//                         // value={customFormFields[index].value || ''}
//                         className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
//                         // onChange={(e) => handleChange(index, e.target.value)}
//                         value={searchTerm}
//                         onChange={handleInputChange}
//                       />
//                       {pagination?.search ? <div>
//                         <ul>
//                           {pagination?.paginatedUsers?.map(el => (
//                             <li>
//                               {el.email}
//                             </li>
//                           ))}
//                         </ul>
//                       </div> : null}
//                       {/* <select
//                         id={item.label}
//                         name={item.label}
//                         multiple
//                         onChange={handleChange}
//                         value={formData[item.label] || ''}
//                       >
//                         <option value="option1">Option 1</option>
//                         <option value="option2">Option 2</option>
//                         <option value="option3">Option 3</option>
 
//                       </select> */}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             <div className=''>
//               <button type="submit"
//                 className="mt-6 flex w-full justify-center rounded-md bg-orange-600 px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Create Entity</button>
//             </div>
//           </form>
//         </div>
//         <div className='col-span-2 h-[500px] overflow-auto shadow-md px-6 py-4 border-2 rounded-md bg-[#f8fafc] '>
//           {customFormFields && customFormFields.length > 0 && customFormFields.map((item) => (
//             <div className='relative' >

//               {item.type === 'file' && (
//                 <div className="flex gap-4">
//                   <div className="group h-10 ">
//                     {/* <spna>{item.label}</spna> */}
//                     {item.value ? (
//                       <img
//                         src={item.value}
//                         name="EntityPhoto"
//                         alt="Selected User Photo"
//                         className="rounded-lg w-10 h-10 mr-4"
//                       />
//                     ) : (
//                       <img class="w-10 h-10 rounded-lg " src={defprop} alt="Neil image" />
//                       // <img
//                       //   src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                       //   alt="Default User Photo"
//                       //   className="rounded-full w-12 h-12 mr-4"
//                       // />
//                     )}
//                   </div>

//                   {/* <p class="text-lg font-black text-gray-800 mt-2">{ }</p> */}
//                   <hr className='my-3' />

//                 </div>
//               )}


//               {item.type === 'text' && (
//                 <p class="text-sm font-black text-gray-800 mt-2 absolute left-12">{item.value}</p>
//               )}


//               {item.type === 'textarea' && (
//                 <div className='h-28 overflow-auto border border-1 border-gray-200 rounded-md p-2 bg-[#f8fafc] text-sm w-full mt-4'>
//                   {/* <textarea className="resize-none h-20 border border-1 border-gray-200 focus:outline-none "> */}
//                   {item.value}
//                   {/* </textarea> */}
//                 </div>
//               )}



//               {/* {item.type === 'multiselect' && (
//               <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-5'>
//                 {entityForm && entityForm.entitymembers && Array.from({ length: 12 }).map((_, index) => {
//                   let first = "";
//                   let second = "";
//                   let firstLetter;
//                   let secondLetter;
//                   let mail = "";
//                   if (index < entityForm.entitymembers.length) {
//                     mail = entityForm.entitymembers[index].split("@")[0]
//                     if (mail.includes(".")) {
//                       first = mail.split(".")[0]
//                       second = mail.split(".")[1]
//                       firstLetter = first[0]
//                       secondLetter = second[0]
//                     }
//                     else {
//                       firstLetter = mail[0]
//                     }
//                   }
//                   if (mail.includes(".")) {
//                     first = mail.split(".")[0]
//                     second = mail.split(".")[1]
//                     firstLetter = first[0]
//                     secondLetter = second[0]
//                   }
//                   else {
//                     firstLetter = mail[0]
//                   }
//                   //color
//                   const colors = ["#818cf8", "#fb923c", "#f87171", "#0891b2", "#db2777", "#f87171", "#854d0e", "#166534"];
//                   const getRandomColor = (firstLetter) => {
 
//                     const randomIndex = firstLetter.charCodeAt(0) % colors.length
 
//                     // const randomIndex = Math.floor(Math.random() * colors.length);
//                     return colors[randomIndex];
//                   };
 
//                   // const randomColor = getRandomColor();
//                   return (
//                     <div className='col-span-1 flex justify-start gap-3' key={index}>
//                       <p className='text-md font-semibold my-3' >Members</p>
 
//                       {index + 1 <= entityForm.entitymembers.length && <>
//                         <h5 style={{ backgroundColor: `${getRandomColor(firstLetter)}` }} className=' rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'>
 
//                           {index < 11 && <>
//                             {firstLetter.toUpperCase()}{secondLetter && secondLetter.toUpperCase()}</>}{index == 11 && entityForm.entitymembers.length == 12 && <>
//                               {firstLetter.toUpperCase()}{secondLetter && secondLetter.toUpperCase()}</>} {index == 11 && entityForm.entitymembers.length > 12 && <span>
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//                                   <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
//                                 </svg>
//                               </span>}
//                         </h5>
//                         <div className=' flex items-center'>
 
//                           <div className=' '>{index < 11 && mail}{index == 11 && entityForm.entitymembers.length == 12 && mail} {index == 11 && entityForm.entitymembers.length > 12 && <span>+{entityForm.entitymembers.length - 11} more</span>} </div>
//                         </div>
//                       </>}
//                       {index + 1 > entityForm.entitymembers.length && <>
//                         <h5 className='bg-[#e5e7eb] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'>
 
//                         </h5>
//                         <div className=' flex items-center'>
//                           <div className=' rounded-md  bg-[#e5e7eb] h-2 w-28'> </div>
//                         </div>
//                       </>}
//                     </div>
//                   )
//                 })}
//               </div>
//             )} */}




//             </div>
//           )

//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EntityForm;

