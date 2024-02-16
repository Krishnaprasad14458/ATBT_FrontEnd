import React, { useEffect } from "react";
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const UsersFormDup = () => {
    const [open, setOpen] = useState(false)
    const [editIndex, setEditIndex] = useState(null);
    const cancelButtonRef = useRef(null);
    const [customForm, setCustomForm] = useState([
    ])
    const [newInputField, setNewInputField] = useState(
       
    {
        label: "", type: "", inputname: "", value: "",
        filterable: false, mandatory: false, field: "custom"
    }
    
    )
    useEffect(() => {
        axios.get(`https://atbtmain.teksacademy.com/form/list?name=userform`)
            .then(response => {
                // Handle the successful response
                setCustomForm(response.data.array)
                console.log(response.data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching data:', error);
            });
    }, [])
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        // this is for label for new input 
        // if (name == "type") {
        //     let newfield = { ...newInputField }
        //   newfield.filterable = false
        //     setNewInputField(newfield)  
        // }
        // if (name == "type" && value === "select") {
        //     let newfield = { ...newInputField }
        //     newfield.options = []
        //     newfield.value = ""
        //     setNewInputField(newfield)
        // }
        // if (name == "type" && value === "multiselect") {
        //     let newfield = { ...newInputField }
        //     newfield.options = []
        //     newfield.value = []
        //     setNewInputField(newfield)
        // }
        // if (name == "label" && editIndex == null) {
        //     setNewInputField((prev) => ({ ...prev, label: value, inputname: value, field: "custom" }))
        // }
        // if (name == "label" && editIndex != null) {
        //     setNewInputField((prev) => ({ ...prev, label: value, }))
        // }
        // else {
        //     setNewInputField((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value, field: "custom" }))
        // }
        if (name == "type" && value === "select") {
            let newfield = { ...newInputField }
            newfield.options = []
            newfield.value = ""
            setNewInputField(newfield)
        }
        if (name == "type" && value === "multiselect") {
            let newfield = { ...newInputField }
            newfield.options = []
            newfield.value = []
            setNewInputField(newfield)
        }
        if (name == "label") {
            if (editIndex == null) {
                setNewInputField((prev) => ({ ...prev, label: value, inputname: value, }))
            }
            if (editIndex != null) {
                setNewInputField((prev) => ({ ...prev, label: value, }))
            }
        } else {
            setNewInputField((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
        }
    }
    let [selectOption, setSelectOption] = useState("")
    const addOption = (e) => {
        e.preventDefault()
        if (selectOption != "" && newInputField.options) {
            setNewInputField((prev) => ({ ...prev, options: [...prev.options, selectOption] }))

        } else if (selectOption != "") {
            setNewInputField((prev) => ({ ...prev, options: [selectOption] }))
        }
        setSelectOption("")
    }
    useEffect(() => {
        console.log("newInputField", newInputField)
    })
    const addOrUpdateInput = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            // Edit existing field
            const updatedForm = [...customForm];
            updatedForm[editIndex] = newInputField;
            setCustomForm(updatedForm);
            // setEditIndex(null);
        } else {
            // Add new field
            if (newInputField.type === "text" ||
                newInputField.type === "email" ||
                newInputField.type === "password" ||
                newInputField.type === "number" ||
                newInputField.type === "textarea" ||
                newInputField.type === "file" ||
                newInputField.type === "date" ||
                newInputField.type === "checkbox" ||
                newInputField.type === "range" || newInputField.type === "time") {
                let newField = { ...newInputField }
                delete newField.options
                setCustomForm((prev) => [...prev, newField]);
            }
            else {
                setCustomForm((prev) => [...prev, newInputField]);
            }
        }
        // setNewInputField({ label: '', type: '', inputname: "", value: "", filterable: false, mandatory: false });
        setOpen(false);
    };
    const handleMoveDimension = (index, direction) => {
        const updatedForm = [...customForm];
        if (direction === 'up' && index > 0) {
            [updatedForm[index], updatedForm[index - 1]] = [updatedForm[index - 1], updatedForm[index]];
        } else if (direction === 'down' && index < updatedForm.length - 1) {
            [updatedForm[index], updatedForm[index + 1]] = [updatedForm[index + 1], updatedForm[index]];
        }
        setCustomForm(updatedForm);
    };
    const deleteInput = async (index) => {
        const updatedForm = [...customForm];
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this feild!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ea580c',
            cancelButtonColor: '#fff',
            confirmButtonText: 'Delete',
            customClass: {
              popup: 'custom-swal2-popup',
              title: 'custom-swal2-title',
              content: 'custom-swal2-content',
            },
          });
      
          if (confirmDelete.isConfirmed) {
            try {
              updatedForm.splice(index, 1);
              setCustomForm(updatedForm);
            } catch (error) {
              Swal.fire('Error', 'Unable to delete user 🤯', 'error');
            }
          }
     
    };
    // const [inputType, setInputType] = useState(["", "text", "email", "password",
    //     "number", "textarea", "file", "date", "select", "multiselect", "checkbox", "range", "time"])
 const inputType = [{label:"" , value:""},
  {label:"Text",value:"text"},
  {label:"Email",value:"email"},
  {label:"Password",value:"password"} ,
  {label:"Number",value:"number"},
  {label:"Text Area",value:"textarea"}, 
  {label:"File",value:"file"} , 
  {label:"Date",value:"date"}, 
  {label:"Select",value:"select"}, 
  {label:"Multi Select",value:"multiselect"} , 
  {label:"Checkbox",value:"checkbox"} , 
  {label:"Range",value:"range"}, 
  {label:"Time",value:"time"}
]
     const handleSubmitCustomForm = async () => {
        let formData = {
            arrayOfObjects: customForm, Name: "userform"
        }
        await saveCustomForm(formData)
    }
    const saveCustomForm = async (formData) => {
        toast.promise(
            axios.put(`https://atbtmain.teksacademy.com/form/update`, formData),
            {
                pending: 'Updating Form',
                success: {
                    render({ data }) {
                        let formData = {
                            arrayOfObjects: customForm,
                        }
                        axios.post(
                            `https://atbtmain.teksacademy.com/custom/user`, formData)
                            .then(response => {
                                console.log(response);
                            })
                            .catch(error => {
                                console.error(error);
                            });
                        return `Form Updated`
                    }
                },
                error: 'Unable to update form 🤯',
            },
        )
    }
    const deleteOption = (index) => {
        let updatedNewInputField = { ...newInputField };
        // Use slice to create a copy of the options array and remove the specified index
        let updatedOptions = [...updatedNewInputField.options];
        updatedOptions.splice(index, 1);
        updatedNewInputField.options = updatedOptions;
        setNewInputField(updatedNewInputField);
        console.log("updatedNewInputField", updatedNewInputField);
    };
    const [filedopen, setFiledOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const handleFiledOpen = (select) => {

        if (selected == select) {
            setSelected("");
        }
        if (selected != select) {
            setSelected(select)
        }
        setFiledOpen(!filedopen);
    }
    return (
        <div className='container p-3'>
            <div className="flex justify-between">
                <p className="text-xl font-semibold">Custom User Form</p>
                
                <div className='flex justify-end'>
                    <button type="submit" onClick={(e) => {
                        setEditIndex(null)
                        setNewInputField(
                            {
                                label: "", 
                                type: "", 
                                inputname: "", 
                                value: "",
                                filterable: false,
                                 mandatory: false,
                                field: "custom"
                            }
                             )
                        setOpen(true)
                    }}
                        className="create-btn px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1">+ Add Field</button>
                </div>
            </div>

            <div class="flex  mt-3 h-[500px]">
                <div class="w-full px-3 py-4 text-left text-xs overflow-y-scroll">

                    {customForm && customForm.length > 0 && customForm.map((input, index) => (
                        <div className="">
                            <div role="button" class="block w-full  ">
                                <div class="flex justify-between items-center mb-3  ">
                                    <div class="flex justify-between items-center bg-[#f2f2f2] p-4 w-full " >
                                        <div class="flex text-black font-semibold">
                                            <div class="" onClick={() => handleFiledOpen(input.inputname)}>{input.label.charAt(0).toUpperCase() + input.label.slice(1)}</div></div>
                                        <div class="flex gap-3 md:gap-10">
                                            {/*up and down moving icons */}
                                            <svg onClick={() => handleMoveDimension(index, 'up')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                                <path fill-rule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z" clip-rule="evenodd" />
                                            </svg>
                                            <svg onClick={() => handleMoveDimension(index, 'down')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                                <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clip-rule="evenodd" />
                                            </svg>
                                            {/* Open and Close Arrow*/}

                                            <svg onClick={() => handleFiledOpen(input.inputname)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                                {input.inputname == selected ? (
                                                    <path fill-rule="evenodd" d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z" clip-rule="evenodd" />
                                                ) : (
                                                    <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
                                                )}
                                            </svg>
                                        </div></div></div></div>
                            {input.inputname == selected &&
                                <div class="px-6">
                                    <div class="border-b border-slateStroke flex flex-wrap py-4  gap-2">
                                        <div class="sm:w-full sm-py-1 md:w-1/5 lg:w-1/5 xl:w-1/5 text-body text-darkSlate01 text-md text-body pt-2">Field Title</div>
                                        <div class=" sm:w-full md:w-1/2 lg:w-1/2 xl:1/2 ">
                                            <div class="w-full relative m-0 ">
                                                <div class="w-full">
                                                    <div  class="input-mol  p-[0.5rem]   w-full text-darkSlate01 text-sm rounded focus:outline-none bg-[#f8fafc] focus:shadow-none border border-slate04 focus:border-slate01!rounded-none py-3 !text-body px-4  undefined cursor-default"   > {input.label.charAt(0).toUpperCase() + input.label.slice(1)}</div>
                                                </div></div></div></div>
                                    <div class="border-b border-slateStroke flex flex-wrap py-4 gap-2">
                                        <div class="sm:w-full sm-py-1 md:w-1/5 lg:w-1/5 xl:w-1/5 text-body text-darkSlate01 text-md text-body pt-2">Field Type</div>
                                        <div class="sm:w-full md:w-1/2 lg:w-1/2 xl:1/2  ">
                                            <div class="relative w-full m-0 ">
                                                <div class="w-full">
                                                    <div  class="input-mol  p-[0.5rem]   w-full text-darkSlate01 text-sm rounded focus:outline-none bg-[#f8fafc] focus:shadow-none border border-slate04 focus:border-slate01!rounded-none py-3 !text-body px-4  undefined cursor-default">{input.type.charAt(0).toUpperCase() + input.type.slice(1)}</div>
                                                </div></div></div></div>
                                    <div className="flex flex-wrap mb-5 gap-10">
                                        {/* {input.type.charAt(0).toUpperCase() + input.type.slice(1)} */}
                                        <div className="w-1/5 hidden sm:block"></div>
                                        <div class=" flex flex-wrap pt-5  gap-1 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mt-1">
                                                {input.mandatory ? (
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                ) : (

                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                )}
                                            </svg>                                          
                                            <div class=" text-body text-darkSlate01"> Required</div>
                                        </div>
                                        <div class="  flex flex-wrap pt-5  gap-1 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mt-1">
                                                {input.filterable ? (
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                ) : (
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                )}
                                            </svg>
                                            <div class=" text-body text-darkSlate01  lg:pe-20">Filtered</div>
                                        </div>
                                    </div>
                                    <div class="flex justify-end w-full  pb-2">
                                        <div class="mr-4">
                                            <button class=" flex  justify-center rounded-md  border-2 border-orange-600 px-3 py-2 text-sm font-medium leading-6 text-orange-600 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600                       
                       " onClick={() => {
                                                    setNewInputField(input);
                                                    setEditIndex(index);
                                                    setOpen(true);
                                                }}>Edit</button>
                                        </div>
                                        <div class="mr-4">
                                            <button class={`flex w-full justify-center rounded-md bg-[#dc2626] px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 ${input.field === "custom" ? "" : "pointer-events-none opacity-30  cursor-not-allowed"}`}
                                                onClick={() => {
                                                    deleteInput(index);
                                                }}>Delete</button>
                                        </div>                                      
                                    </div>
                                </div>
                            }
                        </div>
                    ))}
                </div></div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 px-2 py-5 sm:max-w-lg">
                                    <span className="flex justify-end gap-9 mb-2">
                                        {editIndex == null ? <p className="text-md me-10 font-semibold">Add New Input Field</p > : <p className="text-md  me-14 font-semibold">Edit Input Field</p>}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => {
                                            setOpen(false)
                                        }} fill="currentColor" className="w-5 h-5 me-2">
                                            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                        </svg></span>
                                    <form>
                                        <div className="flex">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 mt-3 mb-2 mx-2 text-gray-900">
                                                Label<span className='text-[#dc2626]'> * </span>
                                            </label>
                                            <div className="">
                                                <span className="mt-3 ms-3">:</span>
                                                <input
                                                    id="name"
                                                    name="label"
                                                    type="text"
                                                    autoComplete="name"
                                                    required
                                                    value={newInputField.label}
                                                    onChange={handleInputChange}
                                                    className="p-2 m-2 text-xs w-72 bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        {                                      
                                            <div >
                                                <div className="flex  gap-2">
                                                    <label htmlFor="venue" className="block text-sm font-medium leading-6 mt-3 mb-2  mx-2 text-gray-900 ">Type <span className='text-[#dc2626]'>* </span></label>
                                                    <div className="relative inline-block text-left ">
                                                        <span className="mt-3 ms-1">:</span>
                                                        <select name="type" className={`p-2 m-2  ms-3 text-xs w-72
                                                         bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900
                                                          appearance-none shadow-sm placeholder:text-gray-400 
                                                        focus:outline-none focus:border-orange-400 sm:text-xs 
                                                        sm:leading-6 ${editIndex == null ? "" : "pointer-events-none opacity-30"}`}
                                                            value={newInputField.type} onChange={handleInputChange}>
                                                            {/* {inputType && inputType.map((type, index) => (
                                                             <option value={type}>
                                                             {type.charAt(0).toUpperCase() + type.slice(1)} </option>
                                                            ))} */}
                                                            {inputType && inputType.map((type,index)=>(
                                                                <>
                                                        
                                                                 <option value={type.value}>
                                                            {type.label}</option>
                                                                
                                                                </>
                                                                
                                                            ))}
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-gray-700">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    (newInputField.type === "select" || newInputField.type === "multiselect") && (
                                                        <div>
                                                            <p className="text-xs  flex justify-center"> Add options for  &nbsp;<span className="font-semibold text-xs">  select </span></p>
                                                            <div className="flex ">
                                                                <label htmlFor="venue" className="block text-sm font-medium leading-6 mt-3 mb-2  ms-2 text-gray-900 ">Option <span className='text-[#dc2626]'> * </span></label><div><span className="mt-3 ms-2">:</span>
                                                                    <input
                                                                        id=""
                                                                        name=""
                                                                        type="text"
                                                                        required
                                                                        value={selectOption}
                                                                        onChange={(e) => setSelectOption(e.target.value)}
                                                                        className="p-2 gap-2 m-2 text-xs w-56 bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6"
                                                                    />
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center rounded-md bg-orange-600 px-3 py-2 m-2 text-sm font-semibold text-white shadow-sm  "
                                                                    onClick={addOption}
                                                                >
                                                                    Add
                                                                </button>
                                                            </div>
                                                            <div className="ps-2 py-2"> {newInputField.options && newInputField.options.length > 0 && (
                                                                <div class=" border border-1 w-[360px] border-gray-200 mb-3  ps-1 py-1 rounded-md gap-2 flex flex-wrap overflow-y-auto" style={{ maxHeight: '100px' }}>
                                                                    {newInputField.options.map((option, index) => (
                                                                        <span key={index} className="text-xs border border-1 border-gray-200 rounded-md p-1  flex">
                                                                            {option}
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4" onClick={() => deleteOption(index)}>
                                                                                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                                                                            </svg>
                                                                        </span>
                                                                    ))}&nbsp;
                                                                </div>
                                                            )}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                <div className="flex gap-5 justify-center">
                                                    <div className="mb-6 flex items-end gap-1">
                                                        <input
                                                            type="checkbox"
                                                            id="mandatory"
                                                            name="mandatory"
                                                            checked={newInputField.mandatory} // Make sure to set the checked attribute
                                                            onChange={handleInputChange}
                                                        />
                                                        <span className="text-xs">Mandatory</span>
                                                    </div>
                                                    {<div
                                                        className={`mb-6 flex items-end gap-1
                                                         ${newInputField.type === "text" ||
                                                                newInputField.type === "email" ||
                                                                newInputField.type === "number" ||
                                                                newInputField.type === "textarea" ||
                                                                newInputField.type === "date" ||
                                                                newInputField.type === "select" ||
                                                                newInputField.type === "multiselect" ||
                                                                newInputField.type === "time" ? "" : "pointer-events-none opacity-30"}`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id="filterable"
                                                            name="filterable"
                                                            checked={newInputField.filterable} // Make sure to set the checked attribute
                                                            onChange={handleInputChange}
                                                        />
                                                        <span className="text-xs">Filterable</span>
                                                    </div>}
                                                </div>
                                            </div>}
                                    </form>
                                    <div className="w-full ">
                                        <button
                                            type="button"
                                            className="rounded-md w-[360px] bg-orange-600 px-3 py-2 text-sm  text-white shadow-sm sm:ml-3 "
                                            onClick={addOrUpdateInput}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <div class="flex justify-end w-full mt-2">
                <div class="">
                </div>
                <div class="me-5">
                    <button class=" flex w-full justify-center rounded-md bg-orange-600 px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600
                       " onClick={handleSubmitCustomForm}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default UsersFormDup


  
  
// import React, { useEffect } from "react";
// import { Fragment, useRef, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
// import axios from "axios";
// const SettingEntityForm = () => {
//     const [open, setOpen] = useState(false)
//     const [editIndex, setEditIndex] = useState(null);
//     const cancelButtonRef = useRef(null);

//     const [customForm, setCustomForm] = useState([
//     ])
//     const [newInputField, setNewInputField] = useState({
//         label: "", type: "", inputname: "", value: "", filterable: false, mandatory: false,
//     })
//     useEffect(() => {
//         axios.get(`https://atbtmain.teksacademy.com/form/list?name=userform`)
//             .then(response => {
//                 // Handle the successful response
//                 setCustomForm(response.data.array)
//                 console.log(response.data);
//             })
//             .catch(error => {
//                 // Handle errors
//                 console.error('Error fetching data:', error);
//             });
//     }, [])
//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         // this is for label for new input 
//         if (name == "type") {
//             let newfield = { ...newInputField }
//             newfield.filterable = false
//             setNewInputField(newfield)
//         }
//         if (name == "type" && value === "select") {
//             let newfield = { ...newInputField }
//             newfield.options = []
//             newfield.value = ""
//             setNewInputField(newfield)
//         }
//         if (name == "type" && value === "multiselect") {
//             let newfield = { ...newInputField }
//             newfield.options = []
//             newfield.value = []
//             setNewInputField(newfield)
//         }

//         if (name == "label" && editIndex == null) {
//             setNewInputField((prev) => ({ ...prev, label: value, inputname: value, field: "custom" }))
//         }
//         if (name == "label" && editIndex != null) {
//             setNewInputField((prev) => ({ ...prev, label: value, }))
//         }
//         else {
//             setNewInputField((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value, field: "custom" }))
//         }
//     }

//     let [selectOption, setSelectOption] = useState("")
//     const addOption = (e) => {
//         e.preventDefault()
//         if (selectOption != "" && newInputField.options) {
//             setNewInputField((prev) => ({ ...prev, options: [...prev.options, selectOption] }))

//         } else if (selectOption != "") {
//             setNewInputField((prev) => ({ ...prev, options: [selectOption] }))

//         }
//         setSelectOption("")
//     }
//     useEffect(() => {
//         console.log("newInputField", newInputField)
//     })

//     const addOrUpdateInput = (e) => {
//         e.preventDefault();
//         if (editIndex !== null) {
//             // Edit existing field
//             const updatedForm = [...customForm];
//             updatedForm[editIndex] = newInputField;
//             setCustomForm(updatedForm);
//             setEditIndex(null);
//         } else {
//             // Add new field
//             if (newInputField.type === "text" ||
//                 newInputField.type === "email" ||
//                 newInputField.type === "password" ||
//                 newInputField.type === "number" ||
//                 newInputField.type === "textarea" ||
//                 newInputField.type === "file" ||
//                 newInputField.type === "date" ||
//                 newInputField.type === "checkbox" ||
//                 newInputField.type === "range" || newInputField.type === "time") {
//                 let newField = { ...newInputField }
//                 delete newField.options
//                 setCustomForm((prev) => [...prev, newField]);

//             }
//             else {
//                 setCustomForm((prev) => [...prev, newInputField]);
//             }

//         }

//         setNewInputField({ label: '', type: '', inputname: "", value: "", filterable: false, mandatory: false });
//         setOpen(false);
//     };
//     const handleMoveDimension = (index, direction) => {
//         const updatedForm = [...customForm];
//         if (direction === 'up' && index > 0) {
//             [updatedForm[index], updatedForm[index - 1]] = [updatedForm[index - 1], updatedForm[index]];
//         } else if (direction === 'down' && index < updatedForm.length - 1) {
//             [updatedForm[index], updatedForm[index + 1]] = [updatedForm[index + 1], updatedForm[index]];
//         }
//         setCustomForm(updatedForm);
//     };
//     const deleteInput = (index) => {
//         const updatedForm = [...customForm];
//         updatedForm.splice(index, 1);
//         setCustomForm(updatedForm);
//     };


//     const [inputType, setInputType] = useState(["", "text", "email", "password",
//         "number", "textarea", "file", "date", "select", "multiselect", "checkbox", "range", "time"])

//     const handleSubmitCustomForm = () => {
//         let formData = {
//             arrayOfObjects: customForm


//             , Name: "userform"
//         }
    
//         axios.put(
//             `https://atbtmain.teksacademy.com/form/update`,
//             formData
//         )
//             .then(response => {
//                 // Handle the response here

//                 console.log(response);
//             })
//             .catch(error => {

//                 console.error(error);
//             });
//     }
//     const deleteOption = (index) => {
//         let updatedNewInputField = { ...newInputField };

//         // Use slice to create a copy of the options array and remove the specified index
//         let updatedOptions = [...updatedNewInputField.options];
//         updatedOptions.splice(index, 1);

//         updatedNewInputField.options = updatedOptions;
//         setNewInputField(updatedNewInputField);
//         console.log("updatedNewInputField", updatedNewInputField);
//     };

//     // let updatedOptions = updatedNewInputField.options.filter((option) => option != deleteoption)
//     return (
//         <div className="p-4 container bg-[#f8fafc]">
//             <div className="flex justify-between">
//                 <p className="text-xl font-semibold">User Form</p>
//                 <div className='flex justify-end'>
//                     <button type="submit" onClick={(e) => {
//                         setEditIndex(null)
//                         setNewInputField(
//                             { label: "", type: "", inputname: "", value: "", filterable: false, mandatory: false })
//                         setOpen(true)
//                     }}
//                         className="create-btn px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1">+ Add Field</button>
//                 </div>
//             </div>
//             {customForm && customForm.length > 0 && customForm.map((input, index) => (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 sm:gap-2 md:gap-3 xl:gap-4 lg:gap-5  px-5 mt-2">
//                     <div className="mb-2 ">
//                         <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-950">Label</label>

//                         <div className="">
//                             <span id="name" name="boardMeetingName" type="text" autoComplete="name" required className="p-2 text-xs block lg:py-1 w-full bg-gray-50 rounded-md border-2 border-gray-200  text-[#6b7280] appearance-none shadow-sm font-light placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6">
//                                 {input.label.charAt(0).toUpperCase() + input.label.slice(1)}
//                             </span>
//                         </div>
//                     </div>
//                     <div className="mb-2">
//                         <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">Type</label>
//                         <div className="">
//                             <span id="name" name="boardMeetingName" type="text" autoComplete="name" required className="p-2 text-xs block lg:py-1 w-full bg-gray-50 rounded-md border-2 border-gray-200  text-[#6b7280] appearance-none shadow-sm font-light placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6">
//                                 {input.type.charAt(0).toUpperCase() + input.type.slice(1)}
//                             </span>
//                         </div>
//                     </div>

//                     <div className=" flex items-center gap-5">
//                         <svg onClick={() => handleMoveDimension(index, 'up')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
//                             <path fill-rule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z" clip-rule="evenodd" />
//                         </svg>
//                         <svg onClick={() => handleMoveDimension(index, 'down')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
//                             <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clip-rule="evenodd" />
//                         </svg>
//                         <svg onClick={() => {
//                             setNewInputField(input);
//                             setEditIndex(index);
//                             setOpen(true);
//                         }}
//                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
//                             <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
//                         </svg>
//                         <svg onClick={() => {
//                             deleteInput(index);
//                         }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
//                             className={`w-5 h-5 ${input.field === "custom" ? "" : "pointer-events-none opacity-30"}
//                                `}>
//                             <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
//                         </svg>
//                     </div>
//                     <div className="flex gap-5">
//                         <div className="mb-6 flex items-end gap-1">
//                             <input
//                                 // className="mb-1"
//                                 type="checkbox"
//                                 id="mandatory"
//                                 name="mandatory"
//                                 checked={input.mandatory}
//                                 onChange={handleInputChange}
//                             />
//                             <span className="text-xs">Mandatory</span>
//                         </div>
//                         <div className="mb-6 flex items-end  gap-1">
//                             <input

//                                 type="checkbox"
//                                 id="filterable"
//                                 name="filterable"
//                                 checked={input.filterable}
//                                 onChange={handleInputChange}
//                             />
//                             <span className="text-xs">Filterable</span>
//                         </div>
//                     </div>
//                     {/* <div className="grid1-item flex gap-10 items-end ">
//                         <div className="grid grid-cols-4 sm:grid:cols-4 md:grid:cols-4 lg:grid:cols-4 xl:grid:cols-4 gap-5">

//                             <div className="grid1-item">
//                                 <svg onClick={() => handleMoveDimension(index, 'up')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
//                                     <path fill-rule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z" clip-rule="evenodd" />
//                                 </svg>
//                             </div>
//                             <div className="grid1-item">
//                                 <svg onClick={() => handleMoveDimension(index, 'down')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
//                                     <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clip-rule="evenodd" />
//                                 </svg>
//                             </div>
//                             <div className="grid1-item">
//                                 <svg onClick={() => {
//                                     setNewInputField(input);
//                                     setEditIndex(index);
//                                     setOpen(true);
//                                 }}
//                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
//                                     <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
//                                 </svg>
//                             </div>
//                             <div className="grid1-item">
//                                 <svg onClick={() => {
//                                     deleteInput(index);
//                                 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
//                                     className={`w-5 h-5 ${input.field === "custom" ? "" : "pointer-events-none opacity-30"}
//                                `}>
//                                     <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
//                                 </svg>

//                             </div>
//                         </div>
//                         <div className="flex gap-2">
//                             <div className="flex items-end ">

//                                 <input
//                                     className="mb-1"
//                                     type="checkbox"
//                                     id="mandatory"
//                                     name="mandatory"
//                                     checked={input.mandatory} // Make sure to set the checked attribute
//                                     onChange={handleInputChange}
//                                 /> <span >Mandatory</span>
//                             </div>
//                             <div className="flex items-end">

//                                 <input
//                                     className="mb-1"
//                                     type="checkbox"
//                                     id="filterable"
//                                     name="filterable"
//                                     checked={input.filterable} // Make sure to set the checked attribute
//                                     onChange={handleInputChange}
//                                 />
//                                 <span >Filterable</span>



//                             </div>


//                         </div>
//                     </div> */}


//                     {/* <label htmlFor="name" className="block text-sm font-medium leading-6 mb-2  mx-2 text-gray-900">Label -  {input.type.charAt(0).toUpperCase() + input.type.slice(1)}</label> */}
//                     {/* <p className="grid1-item">Label - {input.label.charAt(0).toUpperCase() + input.label.slice(1)}</p>
 
//                     <p className="grid1-item">Type - {input.type.charAt(0).toUpperCase() + input.type.slice(1)}</p> */}


//                 </div>
//             ))}
//             <Transition.Root show={open} as={Fragment}>
//                 <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
//                     <Transition.Child
//                         as={Fragment}
//                         enter="ease-out duration-300"
//                         enterFrom="opacity-0"
//                         enterTo="opacity-100"
//                         leave="ease-in duration-200"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                     >
//                         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//                     </Transition.Child>

//                     <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                             <Transition.Child
//                                 as={Fragment}
//                                 enter="ease-out duration-300"
//                                 enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                                 enterTo="opacity-100 translate-y-0 sm:scale-100"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                                 leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                             >
//                                 <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 px-2 py-5 sm:max-w-lg">
//                                     <span className="flex justify-end gap-9 mb-2">
//                                         {editIndex == null ? <p className="text-md me-10 font-semibold">Add New Input Field</p > : <p className="text-md  font-semibold">Edit Input Field</p>}


//                                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => {
//                                             setOpen(false)

//                                         }} fill="currentColor" className="w-5 h-5 me-2">

//                                             <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
//                                         </svg></span>


//                                     {/* <p className="text-md text-center my-2 font-semibold"> Add New Input Field</p> */}

//                                     <form>
//                                         <div className="flex">
//                                             <label htmlFor="name" className="block text-sm font-medium leading-6 mt-3 mb-2 mx-2 text-gray-900">
//                                                 Label
//                                             </label>
//                                             <div className="">
//                                                 <span className="mt-3 ms-3">:</span>
//                                                 <input
//                                                     id="name"
//                                                     name="label"
//                                                     type="text"
//                                                     autoComplete="name"
//                                                     required
//                                                     value={newInputField.label}
//                                                     onChange={handleInputChange}
//                                                     className="p-2 m-2 text-xs w-72 bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6"
//                                                 />
//                                             </div>
//                                         </div>

//                                         {newInputField.field != "predefined" &&
//                                             // editIndex == null && 
//                                             <div >
//                                                 <div className="flex  gap-2">
//                                                     <label htmlFor="venue" className="block text-sm font-medium leading-6 mt-3 mb-2  mx-2 text-gray-900 ">Type </label>
//                                                     <div className="relative inline-block text-left ">
//                                                         <span className="mt-3 ms-1">:</span>
//                                                         <select name="type" className={`p-2 m-2  ms-3 text-xs w-72
//                                                          bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900
//                                                           appearance-none shadow-sm placeholder:text-gray-400 
//                                                         focus:outline-none focus:border-orange-400 sm:text-xs 
//                                                         sm:leading-6 ${editIndex == null ? "" : "pointer-events-none opacity-30"}`}

//                                                             value={newInputField.type} onChange={handleInputChange}>
//                                                             {inputType && inputType.map((type, index) => (
//                                                                 <option value={type}  >{type}</option>
//                                                             ))}

//                                                         </select>
//                                                         <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-gray-700">
//                                                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
//                                                             </svg>
//                                                         </div>
//                                                     </div>
//                                                 </div>


//                                                 {
//                                                     (newInputField.type === "select" || newInputField.type === "multiselect") && (

//                                                         <div>
//                                                             <p className="text-xs  flex justify-center"> Add options for  &nbsp;<span className="font-semibold text-xs">  select </span></p>
//                                                             <div className="flex ">
//                                                                 <label htmlFor="venue" className="block text-sm font-medium leading-6 mt-3 mb-2  ms-2 text-gray-900 ">Option </label><div><span className="mt-3 ms-2">:</span>
//                                                                     <input
//                                                                         id=""
//                                                                         name=""
//                                                                         type="text"
//                                                                         required
//                                                                         value={selectOption}
//                                                                         onChange={(e) => setSelectOption(e.target.value)}
//                                                                         className="p-2 gap-2 m-2 text-xs w-56 bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6"
//                                                                     />
//                                                                 </div>
//                                                                 <button
//                                                                     type="button"
//                                                                     className="inline-flex justify-center rounded-md bg-orange-600 px-3 py-2 m-2 text-sm font-semibold text-white shadow-sm  "
//                                                                     onClick={addOption}
//                                                                 >
//                                                                     Add
//                                                                 </button>
//                                                             </div>
//                                                             <div className="ps-2 py-2"> {newInputField.options && newInputField.options.length > 0 && (
//                                                                 <div class=" border border-1 w-[360px] border-gray-200 mb-3  ps-1 py-1 rounded-md gap-2 flex flex-wrap overflow-y-auto" style={{ maxHeight: '100px' }}>
//                                                                     {newInputField.options.map((option, index) => (
//                                                                         <span key={index} className="text-xs border border-1 border-gray-200 rounded-md p-1  flex">
//                                                                             {option}

//                                                                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4" onClick={() => deleteOption(index)}>
//                                                                                 <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
//                                                                             </svg>

//                                                                             {/* <span className="text-xs">x</span> */}
//                                                                             {/* {index != newInputField.options.length - 1 && <span>, </span>} */}
//                                                                         </span>
//                                                                     ))}&nbsp;

//                                                                 </div>
//                                                             )}

//                                                             </div>
//                                                             {/* <button onClick={addOption} >add</button> */}
//                                                             {/* {newInputField.options && newInputField.options.length > 0 && newInputField.options.map((option, index) => (
//                                                             <span key={index}>  {option}{index != newInputField.options.length - 1 && <span>,</span>} </span>
//                                                         ))} */}




//                                                         </div>
//                                                     )
//                                                 }
//                                                 <div className="flex gap-5 justify-center">
//                                                     <div className="mb-6 flex items-end gap-1">
//                                                         <input
//                                                             // className="mb-1"
//                                                             type="checkbox"
//                                                             id="mandatory"
//                                                             name="mandatory"
//                                                             checked={newInputField.mandatory} // Make sure to set the checked attribute
//                                                             onChange={handleInputChange}
//                                                         />
//                                                         <span className="text-xs">Mandatory</span>
//                                                     </div>
//                                                     {<div

//                                                         className={`mb-6 flex items-end gap-1
//                                                          ${newInputField.type === "text" ||
//                                                                 newInputField.type === "email" ||
//                                                                 newInputField.type === "number" ||
//                                                                 newInputField.type === "textarea" ||
//                                                                 newInputField.type === "date" ||
//                                                                 newInputField.type === "select" ||
//                                                                 newInputField.type === "multiselect" ||
//                                                                 newInputField.type === "time" ? "" : "pointer-events-none opacity-30"}`}

//                                                     >
//                                                         <input
//                                                             type="checkbox"
//                                                             id="filterable"
//                                                             name="filterable"
//                                                             checked={newInputField.filterable} // Make sure to set the checked attribute
//                                                             onChange={handleInputChange}
//                                                         />
//                                                         <span className="text-xs">Filterable</span>
//                                                     </div>}
//                                                 </div>

//                                                 {/* <div className="text-center">
//                                                 Mandatory

//                                                 <input
//                                                     type="checkbox"
//                                                     id="mandatory"
//                                                     name="mandatory"
//                                                     checked={newInputField.mandatory} // Make sure to set the checked attribute
//                                                     onChange={handleInputChange}

//                                                 />  <span className="text-xs">Mandatory</span>
//                                             </div>
//                                             <div className="flex items-end  gap-1">

//                                                 <input
//                                                     type="checkbox"
//                                                     id="filterable"
//                                                     name="filterable"
//                                                     checked={newInputField.filterable} // Make sure to set the checked attribute
//                                                     onChange={handleInputChange}

//                                                 />



//                                             </div> */}
//                                             </div>}


//                                     </form>

//                                     <div className="w-full ">
//                                         <button
//                                             type="button"
//                                             className="rounded-md w-[360px] bg-orange-600 px-3 py-2 text-sm  text-white shadow-sm sm:ml-3 "
//                                             onClick={addOrUpdateInput}
//                                         >
//                                             Submit
//                                         </button>

//                                     </div>


//                                 </Dialog.Panel>
//                             </Transition.Child>
//                         </div>
//                     </div>
//                 </Dialog>
//             </Transition.Root>


//             <div className="flex justify-end me-10 mt-2">
//                 <button type="submit" class="rounded-md bg-orange-600 px-8 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 " onClick={handleSubmitCustomForm}>Save</button>
//             </div>


//         </div >
//     )
// }
// export default SettingEntityForm