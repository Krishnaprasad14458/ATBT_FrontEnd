import React, { useState, useRef, useEffect } from 'react';
import defprop from '../../../Images/defprof.svg';
import './EntityForm.css';
import teams_img from '../../../Images/360_F_201108775_UMAoFXBAsSKNcr53Ip5CTSy52Ajuk1E4.jpg'
function EntityForm() {


  // choose file
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setEntityForm((e) => ({
          ...e, entityphoto: reader.result
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
  const [entityform, setEntityForm] = useState({
    entityname: "",
    entityphoto: imageSrc,
    entitydescription: "",
    entitymembers: []
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntityForm((e) => ({
      ...e, [name]: value
    }))
  }
  useEffect(() => {
    console.log("entityform,", entityform)
  }, [entityform])
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const users = ["irshad.mohd@gmail.com", "bhavitha@gmail.com", "balu@gmail.com", "irshafd.mohd@gmail.com", "ds.mohd@gmail.com", "irshadsfd.mohd@gmail.com", "bhaviftha@gmail.com", "balfu@gmail.com", "anil@gmail.com", "niraj@gmail.com", "irfan@gmail.com", "lashmi@gmail.com", "suma@gmail.com", "vivek@gmail.com"];
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
    const updatedMembers = entityform.entitymembers.filter((selectedUser) => selectedUser !== user);
    setEntityForm((prevEntityForm) => ({
      ...prevEntityForm,
      entitymembers: updatedMembers
    }));
    setSelected(updatedSelected);
  };


  return (

    <div className='container p-4 bg-[#f8fafc]'>
      {/* <p className="font-lg font-semibold p-3">Entity Form</p> */}
      <p className="text-lg font-semibold">New Entity</p>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-3  gap-6 mt-4 ">
        <div className="col-span-1 ps-5 pe-8">
          <form className="space-y-3" method="POST">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Entity Name</label>
              <div className="">
                <input id="name" name="entityname" type="text" autoComplete="name" onChange={handleChange} value={entityform.entityname} required className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 my-2 text-gray-900">Choose Your Photo</label>
              <input
                type="file"
                id="fileInput"
                className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div>
              <label htmlFor="name" className=" block text-sm my-2 font-medium leading-6 text-gray-900" >Description</label>
              <div className=''>
                <textarea name='entitydescription' onChange={handleChange} value={entityform.entitydescription} class="resize-none bg-gray-50 rounded-md text-xs p-2 w-full h-20 border-2 border-gray-200 focus:outline-none focus:border-orange-400"></textarea>
              </div>
            </div>

            <div className='relative'>
              <label htmlFor="email" className="block text-sm my-2 font-medium leading-6 text-gray-900">Add Member</label>

              <div className='border border-1 flex flex-wrap gap-1 px-1 py-1 selected-users-container relative z-50 rounded-md'>
                {selected.map((result) => {
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

                  {users.filter(user => !selected.includes(user))
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
                    src={entityform.entityphoto}
                    name="entityphoto"
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
              <p class="text-lg font-black text-gray-800 mt-2">{entityform.entityname}</p>

            </div>
            <hr className='my-3' />
            <div className='h-20 overflow-auto border border-1 border-gray-200 rounded-md p-2 bg-[#f8fafc] text-sm w-full  '>
              {/* <textarea className="resize-none h-20 border border-1 border-gray-200 focus:outline-none "> */}
              {entityform.entitydescription}
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
              {entityform && entityform.entitymembers && Array.from({ length: 12 }).map((_, index) => {
                let first = "";
                let second = "";
                let firstLetter;
                let secondLetter;
                let mail = "";
                if (index < entityform.entitymembers.length) {
                  mail = entityform.entitymembers[index].split("@")[0]
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
                return (
                  <div className='col-span-1 flex justify-start gap-3' key={index}>

                    {index + 1 <= entityform.entitymembers.length && <>
                      <h5 className='bg-[#f87171] rounded-full w-10 h-10 flex justify-center text-xs items-center text-white'>

                        {index < 11 && <>
                          {firstLetter.toUpperCase()}{secondLetter && secondLetter.toUpperCase()}</>}{index == 11 && entityform.entitymembers.length == 12 && <>
                            {firstLetter.toUpperCase()}{secondLetter && secondLetter.toUpperCase()}</>} {index == 11 && entityform.entitymembers.length > 12 && <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                              </svg>
                            </span>}
                      </h5>
                      <div className=' flex items-center'>

                        <div className=' '>{index < 11 && mail}{index == 11 && entityform.entitymembers.length == 12 && mail} {index == 11 && entityform.entitymembers.length > 12 && <span>+{entityform.entitymembers.length - 11} more</span>} </div>
                      </div>
                    </>}
                    {index + 1 > entityform.entitymembers.length && <>
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
