import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import defprop from "../../../../assets/Images/defprof.svg";
import useDebounce from "../../../../hooks/debounce/useDebounce";
import { UserDataContext } from "../../../../contexts/usersDataContext/usersDataContext";
import { BoardMeetingsDataContext } from "../../../../contexts/boardmeetingsDataContext/boardmeetingsDataContext";
import $ from "jquery";
import { useNavigate, useLoaderData, useParams } from "react-router-dom";
import atbtApi from "../../../../serviceLayer/interceptor";
import Select from "react-select";
import { AuthContext } from "../../../../contexts/authContext/authContext";
import { getCurrentDate } from "../../../../utils/utils";
// const userData = JSON.parse(localStorage.getItem("data"));
// const token = userData?.token;
// const role = userData?.role?.name;
export async function boardmeetingFormLoader({ params, request }) {
  const url = new URL(request.url);
  const boardmeetingFor = url.searchParams.get("boardmeetingFor");
  const boardmeetingForID = parseInt(url.searchParams.get("boardmeetingForID"));

  try {
    let [formResponse, boardmeetingResponse, usersList, displayMembers] =
      await Promise.all([
        atbtApi.get(`form/list?name=boardmeetingform`),
        params.BMid ? atbtApi.get(`boardmeeting/getByid/${params.BMid}`) : null, //Api for edit
        atbtApi.post(`public/list/user`),
        boardmeetingFor === "user"
          ? atbtApi.get(`user/list/${boardmeetingForID}`)
          : boardmeetingFor === "entity"
          ? atbtApi.post(`entity/User/list/${boardmeetingForID}`)
          : boardmeetingFor === "team"
          ? atbtApi.get(`/team/list/${boardmeetingForID}`)
          : null,
      ]);
    usersList = usersList?.data?.users?.map((item) => ({
      value: item.id,
      label: item.email,
      image: item.image,
      name: item.name,
    }));
    console.log("boardmeetingResponse",boardmeetingResponse)
    // to
    if (boardmeetingFor === "user" && boardmeetingForID) {
      usersList = usersList.filter((user) => user.value !== boardmeetingForID);
      displayMembers = [displayMembers?.data?.user];
    }
    if (boardmeetingFor === "entity" && boardmeetingForID) {
      const entityIds = displayMembers?.data.map((entity) => entity.id);
      usersList = usersList.filter((user) => !entityIds.includes(user.value));
      displayMembers = displayMembers?.data;
    }
    if (boardmeetingFor === "team" && boardmeetingForID) {
      const teamIds = displayMembers?.data?.members.map((team) => team.id);
      usersList = usersList.filter((user) => !teamIds.includes(user.value));
      displayMembers = displayMembers?.data?.members;
    }

    let boardmeetingData = null;
    if (params && params.BMid) {
      console.log(boardmeetingResponse, "loader boardmeeting data");
      boardmeetingData = boardmeetingResponse?.data;
      console.log(boardmeetingResponse, "loader boardmeeting data updated");
    }

    const formData = formResponse.data.Data;
    console.log("formData", formData, "boardmeetingData", boardmeetingData);

    return { boardmeetingData, formData, usersList, displayMembers };
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed to fetch data: ${error.response.status}`);
    } else if (error.request) {
      throw new Error("Request made but no response received");
    } else {
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
}
function BoardMeetingForm() {
  const { authState } = useContext(AuthContext);
  let createdBy = authState?.user?.id;

  const urlParams = new URLSearchParams(window.location.search);
  const boardmeetingFor = urlParams.get("boardmeetingFor");
  const boardmeetingForID = urlParams.get("boardmeetingForID");
  const [showPassword, setShowPassword] = useState(false);
  document.title = "ATBT | Meeting";
  let { BMid } = useParams();
  const boardmeeting = useLoaderData();
  console.log(boardmeeting, "cmp loader data");

  /// for edit to bind selected memebers
  useEffect(() => {
    if (BMid && boardmeeting?.boardmeetingData?.members) {
      console.log(
        "boardmeeting.boardmeetingData.members",
        boardmeeting.boardmeetingData.members
      );
      const updatedMembersForSelect = boardmeeting.boardmeetingData.members.map(
        (member) => ({
          value: member.id,
          label: member.email,
          image: member.image,
          name: member.name,
        })
      );
      setSelected(updatedMembersForSelect);
    }
  }, [BMid, boardmeeting]);
  function setInitialForm() {
    console.log("boardmeeting", boardmeeting);
    let response = boardmeeting?.formData;
    if (!!BMid && !!boardmeeting?.boardmeetingData) {
      let boardmeetingData = boardmeeting?.boardmeetingData;
      response.forEach((input) => {
        console.log("input", input);
        if (boardmeetingData.hasOwnProperty(input.inputname)) {
          if (boardmeetingData[input.inputname] !== null) {
            input.value = boardmeetingData[input.inputname];
          }
          // if (boardmeetingData[input.inputname] !== null && input.type === "multiselect") {
          //   input.value = boardmeetingData[input.inputname]?.map((item)=>item.id);

          // }
        }
      });
    }
    console.log("response", response);
    return response;
  }
  const navigate = useNavigate();
  // const {
  //   usersState: { users, dashboard },
  //   usersDispatch,
  // } = useContext(UserDataContext);
  const { createBoardMeeting, updateBoardMeeting } = useContext(
    BoardMeetingsDataContext
  );
  const [selected, setSelected] = useState([]);
  console.log("selected selected", selected);
  const [usersEmails, setUsersEmails] = useState(boardmeeting.usersList);

  useEffect(() => {
    const filteredEmails = boardmeeting.usersList.filter(
      (mainObj) =>
        !selected.some((selectedObj) => selectedObj.value === mainObj.value)
    );
    setUsersEmails(filteredEmails);
  }, [selected, boardmeeting.usersList]);

  // const { debouncedSetPage, debouncedSetSearch } = useDebounce(usersDispatch);
  let [openOptions, setopenOptions] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // const [showUsers, setShowUsers] = useState(false);
  let [customFormFields, setCustomFormFields] = useState(() =>
    setInitialForm()
  );
  useEffect(() => {
    setCustomFormFields(setInitialForm());
    if (!BMid) {
      setSelected([]);
    }
  }, [BMid]);

  const handleOpenOptions = (name) => {
    if (openOptions == name) {
      setopenOptions("");
    }
    if (openOptions != name) {
      setopenOptions(name);
    }
  };
  const [defaultboardMeetingMembers, setDefaultBoardMeetingMembers] = useState(
    []
  );
  const [allboardMeetingMembers, setAllBoardMeetingMembers] = useState([]);

  useEffect(() => {
    let defaultBMMembers = [...boardmeeting?.displayMembers];
    // defaultBMMembers.push();
    setDefaultBoardMeetingMembers(defaultBMMembers);

    if (BMid) {
      for (let y = 0; y < customFormFields.length; y++) {
        if (customFormFields[y].inputname === "members") {
          let members = customFormFields[y].value;
          setAllBoardMeetingMembers([...defaultBMMembers, ...members]);
          customFormFields[y].value = customFormFields[y].value.map(
            (item) => item.id
          );
          // console.log("first",customFormFields[y].value)
        }
      }
    } else if (!BMid) {
      setAllBoardMeetingMembers(defaultBMMembers);
    }
  }, [BMid, boardmeeting]);
  const handleClick = (value, index) => {
    console.log("value", value);
    setSelected(value);
    let formatChange = value.map((item) => ({
      name: item.name,
      id: item.value,
      image: item.image,
      email: item.label,
    }));
    setAllBoardMeetingMembers([...defaultboardMeetingMembers, ...formatChange]);
    const updatedFormData = [...customFormFields];
    let members = value.map((item) => item.value);
    updatedFormData[index].value = members;
    setCustomFormFields(updatedFormData);
  };

  useEffect(() => {
    console.log(searchTerm, "clear");
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
    if (updatedFormData[index].type != "multiselect") {
      updatedFormData[index].value = newValue;
      setCustomFormFields(updatedFormData);
    }
    if (updatedFormData[index].type == "multiselect") {
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

  console.log("customFormFields", customFormFields);
  const [errors, setErrors] = useState({});
  const [isErrorspresent, setIsErrorspresent] = useState(false);
  const checkValidation = () => {
    let isErrorspresent = false;
    for (let i = 0; i < customFormFields.length > 0; i++) {
      if (customFormFields[i].type == "text" && customFormFields[i].mandatory) {
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
              "Name should contain atleast 3 characters",
          }));
          isErrorspresent = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: "",
          }));
        }
      }
      if (customFormFields[i].type == "file" && customFormFields[i].mandatory) {
        if (!customFormFields[i].value) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i]
              .inputname]: `Please Upload ${customFormFields[i].label}`,
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: "",
          }));
        }
      }
      if (
        customFormFields[i].type == "textarea" &&
        customFormFields[i].mandatory
      ) {
        if (customFormFields[i].value.length == 0) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: "Please Enter Text",
          }));
          isErrorspresent = true;
        } else if (customFormFields[i].value.length < 3) {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]:
              "Name should contain atleast 3 characters",
          }));
          isErrorspresent = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            [customFormFields[i].inputname]: "",
          }));
        }
      }
      if (
        customFormFields[i].type == "email" &&
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
            [customFormFields[i].inputname]: "",
          }));
        }
      }
      if (
        customFormFields[i].type == "number" &&
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
            [customFormFields[i].inputname]: "",
          }));
        }
      }
      if (
        customFormFields[i].type == "phonenumber" &&
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
            [customFormFields[i].inputname]: "",
          }));
        }
      }
      if (
        customFormFields[i].type == "select" &&
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
            [customFormFields[i].inputname]: "",
          }));
        }
      }
      if (
        customFormFields[i].type == "multiselect" &&
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
            [customFormFields[i].inputname]: "",
          }));
        }
      }
      if (customFormFields[i].type == "date" && customFormFields[i].mandatory) {
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
            [customFormFields[i].inputname]: "",
          }));
        }
      }
      if (
        customFormFields[i].type == "checkbox" &&
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
            [customFormFields[i].inputname]: "",
          }));
        }
      }
      if (
        customFormFields[i].type == "range" &&
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
            [customFormFields[i].inputname]: "",
          }));
        }
      }
      if (customFormFields[i].type == "time" && customFormFields[i].mandatory) {
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
            [customFormFields[i].inputname]: "",
          }));
        }
      }
      if (
        customFormFields[i].type == "password" &&
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
            [customFormFields[i].inputname]: "",
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
      console.log(customFormFields, "submitcustomFormFields");
      const formData = new FormData(e.target);
      for (let i = 0; i < customFormFields.length; i++) {
        if (Array.isArray(customFormFields[i].value)) {
          formData.set(
            customFormFields[i].inputname,
            JSON.stringify(customFormFields[i].value)
          );
        }
      }
      formData.set("customFieldsData", JSON.stringify(customFormFields));
      formData.set("createdBy", createdBy);
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      console.log("formDataObj", formDataObj);
      let response;
      if (!!BMid && !!boardmeeting?.boardmeetingData) {
        console.log("updating");
        response = await updateBoardMeeting(formData, BMid);
      } else {
        console.log("creating");
        response = await createBoardMeeting(
          formData,
          boardmeetingFor,
          boardmeetingForID
        );
      }
      console.log("jsonData submitted", response);
      if (response?.status === 201) {
        console.log("data is 201");
        if (boardmeetingFor === "user") {
          navigate(
            `/users/${boardmeetingForID}/userboardmeetings/${response.data}/tasks`
          );
        }
        if (boardmeetingFor === "entity") {
          navigate(
            `/entities/${boardmeetingForID}/entityboardmeetings/${response.data}/tasks`
          );
        }
        if (boardmeetingFor === "team") {
          navigate(
            `/teams/${boardmeetingForID}/teamboardmeetings/${response.data}/tasks`
          );
        }
      }
    }
  }
  //for number scrolling stop
  $("input[type=number]").on("mousewheel", function (e) {
    $(e.target).blur();
  });

  // to set the time in 12hours
  function formatTime(timeString) {
    // Splitting the timeString to extract hours and minutes
    const [hourStr, minuteStr] = timeString.split(":");

    // Parsing hours and minutes as integers
    const hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    // Checking if hours and minutes are valid numbers
    if (isNaN(hours) || isNaN(minutes)) {
      return "Invalid time";
    }

    // Converting hours to 12-hour format and determining AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Handles midnight
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes; // Ensures minutes are two digits

    // Constructing the formatted time string
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    return formattedTime;
  }

  // end the time function
  // for previous dates defult
 
  let [showAllMembers, setShowAllMembers] = useState(12);
  const colors = [
    "#818cf8",
    "#fb923c",
    "#f87171",
    "#0891b2",
    "#db2777",
    "#f87171",
    "#854d0e",
    "#166534",
  ];

  const getRandomColor = (char) => {
    const randomIndex = char?.charCodeAt(0) % colors.length;
    return colors[randomIndex];
  };
  return (
    <div className=" p-4 bg-[#f8fafc]">
      {/* <p className="font-lg font-semibold p-3">Entity Form</p> */}
      <p className="text-lg font-semibold">Meeting Form</p>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3  gap-4 mt-2  ">
        <div className="col-span-1">
          <form method="POST" onSubmit={handleFormSubmit}>
            {customFormFields &&
              customFormFields.length > 0 &&
              customFormFields.map((item, index) => (
                <div key={index}>
                  {/* predefined fields */}
                  {item.type === "text" &&
                    item.inputname == "meetingnumber" &&
                    item.field == "predefined" && (
                      <div>
                        <label
                          htmlFor={item.label}
                          className="block text-sm font-medium leading-6 mt-2 text-gray-900"
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                          {item.mandatory ? (
                            <span className="text-red-600">*</span>
                          ) : (
                            <span> </span>
                          )}
                        </label>
                        <input
                          type="text"
                          name={item.inputname}
                          placeholder="Enter Meeting Id"
                          id={item.inputname}
                          style={{ fontSize: "0.8rem" }}
                          value={customFormFields[index].value || ""}
                          onChange={(e) => {
                            handleChange(index, e.target.value);
                          }}
                          className="px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs"
                        />
                        <div className="h-2 text-[#dc2626]">
                          {errors[item.inputname] && (
                            <span className="text-xs">
                              {errors[item.inputname]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  {item.type === "date" &&
                    item.inputname === "date" &&
                    item.field === "predefined" && (
                      <div>
                        <label
                          htmlFor={item.label}
                          className="block text-sm font-medium leading-6 mt-2 text-gray-900"
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                          {item.mandatory ? (
                            <span className="text-red-600">*</span>
                          ) : (
                            <span> </span>
                          )}
                        </label>
                        <input
                          type="date"
                          name={item.inputname}
                          id={item.inputname}
                          style={{
                            fontSize: "0.8rem",
                            WebkitAppearance: "none",
                          }}
                          // min={
                          //   (BMid === null || BMid === undefined) &&
                          //   getCurrentDate()
                          // }
                          className="px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs"
                          value={customFormFields[index].value || ""}
                          onChange={(e) => handleChange(index, e.target.value)}
                        />
                        <div className="h-2 text-[#dc2626]">
                          {errors[item.inputname] && (
                            <span className="text-xs">
                              {errors[item.inputname]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                  {item.type === "textarea" &&
                    item.inputname == "description" &&
                    item.field == "predefined" && (
                      <div>
                        <label
                          htmlFor={item.label}
                          className="block text-sm font-medium leading-6 mt-2 text-gray-900"
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                          {item.mandatory ? (
                            <span className="text-red-600">*</span>
                          ) : (
                            <span> </span>
                          )}
                        </label>
                        <textarea
                          name={item.inputname}
                          placeholder="Type here..."
                          id={item.inputname}
                          value={customFormFields[index].value || ""}
                          className="bg-gray-50 rounded-md text-xs p-2 w-full h-20 border-2 border-gray-200 focus:outline-none focus:border-orange-400 placeholder:text-xs"
                          onChange={(e) => handleChange(index, e.target.value)}
                          style={{ fontSize: "0.8rem" }}
                        />
                        <div className="h-2 text-[#dc2626]">
                          {errors[item.inputname] && (
                            <span className="text-xs">
                              {errors[item.inputname]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  {item.type === "multiselect" &&
                    item.inputname == "members" &&
                    item.field == "predefined" && (
                      <div className="relative">
                        <label
                          htmlFor="email"
                          className="block text-sm  font-medium leading-6  text-gray-900"
                        >
                          {item.label}
                          {item.mandatory ? (
                            <span className="text-red-600">*</span>
                          ) : (
                            <span> </span>
                          )}
                        </label>
                        <Select
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              backgroundColor: "#f9fafb", // Change the background color of the select input
                              borderWidth: state.isFocused ? "1px" : "1px", // Decrease border width when focused
                              borderColor: state.isFocused
                                ? "#orange-400"
                                : "#d1d5db", // Change border color when focused
                              boxShadow: state.isFocused
                                ? "none"
                                : provided.boxShadow, // Optionally remove box shadow when focused
                              maxHeight: "150px",
                              overflowY: "auto",
                              fontSize: "0.7rem",
                            }),
                            placeholder: (provided) => ({
                              ...provided,
                              fontSize: "small", // Adjust the font size of the placeholder text
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              color: state.isFocused ? "#fff" : "#000000",
                              backgroundColor: state.isFocused
                                ? "#ea580c"
                                : "transparent",

                              "&:hover": {
                                color: "#fff",
                                backgroundColor: "#ea580c",
                              },
                              fontSize: "0.7rem",
                            }),
                          }}
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 5,
                            colors: {
                              ...theme.colors,

                              primary: "#fb923c",
                            },
                          })}
                          isMulti
                          // name="colors"
                          options={usersEmails}
                          className="basic-multi-select "
                          classNamePrefix="select"
                          value={selected}
                          onChange={(selectedOption) => {
                            handleClick(selectedOption, index);
                          }}
                        />
                        <div className="h-2 text-[#dc2626]">
                          {errors[item.inputname] && (
                            <span className="text-xs">
                              {errors[item.inputname]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  {item.type === "file" &&
                    item.inputname === "image" &&
                    item.field === "predefined" && (
                      <div>
                        <label
                          htmlFor={item.label}
                          className="block text-sm font-medium leading-6 mt-2 text-gray-900"
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                          {item.mandatory ? (
                            <span className="text-red-600">*</span>
                          ) : (
                            <span> </span>
                          )}
                        </label>
                        <input
                          type="file"
                          name={item.inputname}
                          id={item.inputname}
                          className="px-2 py-1 md:py-1 lg:py-1 xl:py-1 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs"
                          onChange={(event) =>
                            handleFileChange(event, index, item.inputname)
                          }
                          accept="image/*"
                          style={{ fontSize: "0.8rem" }}
                        />
                        <div className="h-2 text-red-500">
                          {errors[item.inputname] && (
                            <span className="text-xs">
                              {errors[item.inputname]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  {/* custom fields */}
                  {item.type === "text" && item.field == "custom" && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className="block text-sm font-medium leading-6 my-2 text-gray-900"
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className="text-red-600">*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type="text"
                        name={item.inputname}
                        placeholder={`Enter ${item.inputname}`}
                        id={item.inputname}
                        value={customFormFields[index].value || ""}
                        className="px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs"
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={{ fontSize: "0.8rem" }}
                      />
                      <div className="h-2 text-[#dc2626]">
                        {errors[item.inputname] && (
                          <span className="text-xs">
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === "email" && item.field == "custom" && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className="block text-sm font-medium leading-6 my-2 text-gray-900"
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className="text-red-600">*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type="email"
                        placeholder={`Enter ${item.inputname}`}
                        name={item.inputname}
                        id={item.inputname}
                        value={customFormFields[index].value || ""}
                        className="px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs"
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={{ fontSize: "0.8rem" }}
                      />
                      <div className="h-2 text-[#dc2626]">
                        {errors[item.inputname] && (
                          <span className="text-xs">
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === "password" && item.field === "custom" && (
                    <div className="relative">
                      <label
                        htmlFor={item.label}
                        className="block text-sm font-medium leading-6 my-2 text-gray-900"
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className="text-red-600">*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder={`Enter ${item.inputname}`}
                        name={item.inputname}
                        id={item.inputname}
                        value={customFormFields[index].value || ""}
                        className="px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs"
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={{ fontSize: "0.8rem" }}
                      />
                      <div className="absolute inset-y-0 right-0 top-[28px] flex items-center pr-3">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-600 focus:outline-none"
                        >
                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              class="w-4 h-4 text-gray-400"
                            >
                              <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                              <path
                                fill-rule="evenodd"
                                d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              class="w-4 h-4 text-gray-400"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
                                clip-rule="evenodd"
                              />
                              <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="h-2 text-[#dc2626]">
                        {errors[item.inputname] && (
                          <span className="text-xs">
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === "number" && item.field == "custom" && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className="block text-sm font-medium leading-6 my-2 text-gray-900"
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className="text-red-600">*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type="number"
                        name={item.inputname}
                        placeholder={`Enter ${item.inputname}`}
                        id={item.inputname}
                        value={customFormFields[index].value || ""}
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={{ fontSize: "0.8rem" }}
                        className="px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs"
                      />
                      <div className="h-2 text-[#dc2626]">
                        {errors[item.inputname] && (
                          <span className="text-xs">
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === "phonenumber" && item.field == "custom" && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className="block text-sm font-medium leading-6 my-2 text-gray-900"
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className="text-red-600">*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type="number"
                        name={item.inputname}
                        placeholder={`Enter ${item.inputname}`}
                        id={item.inputname}
                        value={customFormFields[index].value || ""}
                        style={{ fontSize: "0.8rem" }}
                        onChange={(e) => {
                          const value = e.target.value.slice(0, 10); // Limiting to maximum 10 digits
                          handleChange(index, value);
                        }}
                        className="px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs"
                      />
                      <div className="h-2 text-[#dc2626]">
                        {errors[item.inputname] && (
                          <span className="text-xs">
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === "checkbox" && item.field == "custom" && (
                    <div>
                      <div className="flex gap-2 mt-3">
                        <input
                          type="checkbox"
                          placeholder={`Enter ${item.inputname}`}
                          name={item.inputname}
                          id={item.inputname}
                          className="my-1"
                          style={{ fontSize: "0.8rem" }}
                          checked={!!customFormFields[index].value}
                          onChange={(e) =>
                            handleChange(index, e.target.checked)
                          }
                        />
                        <label
                          htmlFor={item.inputname}
                          className="block text-sm font-medium leading-6 my-1 text-gray-900"
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                          {item.mandatory ? (
                            <span className="text-red-600">*</span>
                          ) : (
                            <span> </span>
                          )}
                        </label>
                      </div>
                      <div className="h-2 text-[#dc2626]">
                        {errors[item.inputname] && (
                          <span className="text-xs">
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === "date" && item.field == "custom" && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className="block text-sm font-medium leading-6 my-2 text-gray-900"
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className="text-red-600">*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type="date"
                        name={item.inputname}
                        className="px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs"
                        id={item.inputname}
                        value={customFormFields[index].value || ""}
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={{ fontSize: "0.8rem" }}
                      />
                      <div className="h-2 text-[#dc2626]">
                        {errors[item.inputname] && (
                          <span className="text-xs">
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === "time" && item.field == "custom" && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className="block text-sm font-medium leading-6 my-2 text-gray-900"
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className="text-red-600">*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type="time"
                        name={item.inputname}
                        className="px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs"
                        id={item.inputname}
                        value={customFormFields[index].value || ""}
                        s
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={{ fontSize: "0.8rem" }}
                      />
                      <div className="h-2 text-[#dc2626]">
                        {errors[item.inputname] && (
                          <span className="text-xs">
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === "file" && item.field == "custom" && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className="block text-sm font-medium leading-6 my-2 text-gray-900"
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className="text-red-600">*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type="file"
                        name={item.inputname}
                        id={item.inputname}
                        style={{ fontSize: "0.8rem" }}
                        className="px-2 py-1 md:py-1 lg:py-1 xl:py-1 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs"
                        onChange={(event) => handleFileChange(event, index)}
                        accept="image/*"
                      />
                      <div className="h-2 text-[#dc2626]">
                        {errors[item.inputname] && (
                          <span className="text-xs">
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === "range" && item.field == "custom" && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className="block text-sm font-medium leading-6 my-2 text-gray-900"
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className="text-red-600">*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <input
                        type="range"
                        name={item.inputname}
                        id={item.inputname}
                        value={customFormFields[index].value || 0}
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={{ fontSize: "0.8rem" }}
                      />
                      <div className="h-2 text-[#dc2626]">
                        {errors[item.inputname] && (
                          <span className="text-xs">
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === "textarea" && item.field == "custom" && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className="block text-sm font-medium leading-6 my-2 text-gray-900"
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className="text-red-600">*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <textarea
                        name={item.inputname}
                        placeholder={`Enter ${item.inputname}`}
                        id={item.inputname}
                        value={customFormFields[index].value || ""}
                        className="bg-gray-50 rounded-md text-xs p-2 w-full h-20 border-2 border-gray-200 focus:outline-none focus:border-orange-400 placeholder:text-xs"
                        onChange={(e) => handleChange(index, e.target.value)}
                        style={{ fontSize: "0.8rem" }}
                      />
                      <div className="h-2 text-[#dc2626]">
                        {errors[item.inputname] && (
                          <span className="text-xs">
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === "select" && item.field == "custom" && (
                    <div>
                      <label
                        htmlFor={item.label}
                        className="block text-sm font-medium leading-6 my-2 text-gray-900"
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className="text-red-600">*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <select
                        id={item.inputname}
                        name={item.inputname}
                        className="px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs"
                        onChange={(e) => handleChange(index, e.target.value)}
                        value={customFormFields[index].value || ""}
                        style={{ fontSize: "0.8rem" }}
                      >
                        <option value="" disabled defaultValue>
                          Please select
                        </option>
                        {item.options &&
                          item.options.value &&
                          item.options.value.map((option, index) => (
                            <option value={option}>{option}</option>
                          ))}
                      </select>
                      <div className="h-2 text-[#dc2626]">
                        {errors[item.inputname] && (
                          <span className="text-xs">
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.type === "multiselect" && item.field === "custom" && (
                    <div className="relative">
                      <label
                        htmlFor={item.label}
                        className="block text-sm font-medium leading-6 my-2 text-gray-900"
                      >
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                        {item.mandatory ? (
                          <span className="text-red-600">*</span>
                        ) : (
                          <span> </span>
                        )}
                      </label>
                      <div className="ps-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs">
                        <span className="flex justify-between">
                          <p className="text-sm text-gray-400">
                            {item.value.length > 0 ? (
                              <span className="text-xs">
                                {item.value.join(", ")}
                              </span>
                            ) : (
                              <span className="text-xs">Please select</span>
                            )}
                          </p>
                          <span
                            onClick={() => handleOpenOptions(item.inputname)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </span>
                      </div>
                      {openOptions === item.inputname && (
                        <ul className="h-[100px] overflow-auto z-[3] absolute top-full left-0  bg-gray-50 border border-1 border-gray-200 w-full">
                          {item.options.value.map((option, subindex) => (
                            <li key={subindex} className="px-3 py-1 text-sm">
                              <input
                                type="checkbox"
                                id={option}
                                checked={item.value.includes(option)}
                                onChange={(e) => handleChange(index, option)}
                                className="mr-1"
                              />
                              <label htmlFor={option} className="select-none">
                                {option}
                              </label>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="h-2 text-[#dc2626] mb-2">
                        {errors[item.inputname] && (
                          <span className="text-xs">
                            {errors[item.inputname]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            <div className="">
              <button
                type="submit"
                className="mt-4 flex w-full justify-center rounded-md bg-orange-600 px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                {BMid ? "Update Board Meeting" : "Create Board Meeting"}
              </button>
            </div>
          </form>
        </div>
        {/* preview */}
        <div className="col-span-2 hidden sm:block md:block">
          <div className=" shadow-md px-6 py-4 mt-4 border-2 rounded-md bg-[#f8fafc] ">
            {customFormFields &&
              customFormFields.length > 0 &&
              customFormFields.map((item) => {
                return (
                  <div className="relative ">
                    {/* predefined fields*/}
                    <div className="flex justify-between my-1 ">
                      <span>
                        {item.type === "text" &&
                          item.inputname == "meetingnumber" &&
                          item.field == "predefined" && (
                            <div>
                              {item.value ? (
                                <p className="text-lg">{item.value}</p>
                              ) : (
                                <p className="text-lg text-gray-400">
                                  Meeting Id
                                </p>
                              )}
                            </div>
                          )}
                      </span>
                      <span>
                        {item.type === "date" &&
                          item.inputname === "date" &&
                          item.field === "predefined" &&
                          (() => {
                            let date = new Date(item.value);
                            const day = date.getUTCDate();
                            const monthIndex = date.getUTCMonth();
                            const year = date.getUTCFullYear();

                            const monthAbbreviations = [
                              "January",
                              "February",
                              "March",
                              "April",
                              "May",
                              "June",
                              "July",
                              "August",
                              "September",
                              "October",
                              "November",
                              "December",
                            ];
                            let ordinalsText = "";
                            if (day == 1 || day == 21 || day == 31) {
                              ordinalsText = "st";
                            } else if (day == 2 || day == 22) {
                              ordinalsText = "nd";
                            } else if (day == 3 || day == 23) {
                              ordinalsText = "rd";
                            } else {
                              ordinalsText = "th";
                            }

                            // Formatting the date
                            date = ` ${monthAbbreviations[monthIndex]} ${
                              day < 10 ? "0" : ""
                            }${day}${ordinalsText}, ${year}`;
                            return (
                              <div>
                                {item.value ? (
                                  <p className="text-sm absolute bottom-2 right-2">
                                    Date : {date ? date : "No Date"}
                                  </p>
                                ) : (
                                  <p className="text-sm text-gray-400 absolute bottom-2 right-2">
                                    Date : month date, year
                                  </p>
                                )}
                              </div>
                            );
                          })()}
                      </span>
                    </div>
                    {item.type === "textarea" &&
                      item.inputname == "description" &&
                      item.field == "predefined" && (
                        <div className="  h-28 overflow-auto border border-1 border-gray-200 rounded-md p-2 bg-[#f8fafc] text-sm w-full ">
                          {item.value}
                        </div>
                      )}
                    {item.type === "multiselect" &&
                      item.inputname == "members" &&
                      item.field == "predefined" && (
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 mt-5">
                        {item.value && allboardMeetingMembers &&
                          Array.from({ length: showAllMembers }).map((_, index) => {
                            let UsersList = allboardMeetingMembers
                            let user = UsersList[index];
                            let initials = "";
                            let firstLetter = "";
                            let secondLetter = "";
            
                            if (user) {
                              const username = user.name || "";
                              const nameParts = username.split(" ");
                              firstLetter = nameParts[0]?.[0] || "";
                              secondLetter = nameParts[1]?.[0] || "";
            
                              initials = `${firstLetter.toUpperCase()}${secondLetter.toUpperCase()}`;
                            }
            
                            return (
                              <div
                                className="col-span-1 flex justify-start gap-3 items-center m-1"
                                key={index}
                              >
                                {user ? (
                          <>
                                  <>
                                    <h5
                                      style={{
                                        backgroundColor: user.image
                                          ? "transparent"
                                          : getRandomColor(firstLetter),
                                      }}
                                      className="rounded-full w-10 h-10 md:h-8 xl:h-10 flex justify-center items-center text-white text-xs"
                                    >
                                      {user.image ? (
                                        <img
                                          src={
                                            typeof user.image === "string"
                                              ? user.image
                                              : URL.createObjectURL(user.image)
                                          }
                                          alt="Entity Photo"
                                          className="rounded-full w-10 h-10"
                                        />
                                      ) : (
                                        <span>{initials}</span>
                                      )}
                                    </h5>
                                    <div className="flex items-center md:items-start xl:items-center overflow-hidden">
                                      <div
                                        title={`Name: ${user.name}\nEmail: ${user.email}\nDesignation: ${user.designation}`}
                                      >
                                        <div>
                                          <p className="truncate w-40 text-sm">
                                            {user.name}
                                          </p>
                                          <p className="truncate w-40 text-sm">
                                            {user.email}
                                          </p>
                                          <p className="truncate w-40 text-sm">
                                            {user.designation}
                                          </p>
                                        </div>
                                     
                                      </div>
                                    </div>
                                    
                                  </>
                                  {index === showAllMembers - 1 &&
                                          UsersList.length > showAllMembers && (
                                            <span   className="text-xs border border-gray-200 p-2 bg-orange-500 rounded-md text-white cursor-pointer"
                                              onClick={() =>
                                                setShowAllMembers(UsersList.length)
                                              }
                                            >
                                              +{UsersList.length - showAllMembers}more
                                            </span>
                                          )}
                                  </>
                                ) : (
                                  <>
                                    <h5 className="bg-[#e5e7eb] rounded-full w-10 h-10 flex justify-center items-center text-white"></h5>
                                    <div className="flex items-center">
                                      <div className="rounded-md bg-[#e5e7eb] h-2 w-28"></div>
                                    </div>
                                  </>
                                )}
                              </div>
                            );
                          })}
                      </div>
                      )}{" "}
                    {/* customfields */}
                    {item.type === "text" && item.field == "custom" && (
                      <div className=" mx-2 ">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-2/6 truncate text-[#727a85] ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=" flex gap-2 w-4/6">
                              <span> : </span>
                              <span className="text-md font-[600]  ">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className="my-2" />}
                      </div>
                    )}
                    {item.type === "email" && item.field == "custom" && (
                      <div className=" mx-2 ">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-2/6 truncate text-[#727a85] ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 w-4/6 ">
                              <span> : </span>
                              <span className="text-md font-[600] break-all">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className="my-2" />}
                      </div>
                    )}
                    {item.type === "phonenumber" && item.field == "custom" && (
                      <div className=" mx-2  flex-wrap">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-2/6 truncate text-[#727a85] ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 w-4/6">
                              <span> : </span>
                              <span className="text-md font-[600] ">
                                {item.value.slice(0, 3)}&nbsp;
                                {item.value.slice(3, 6)}&nbsp;
                                {item.value.slice(6, 10)}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className="my-2" />}
                      </div>
                    )}
                    {item.type === "number" && item.field == "custom" && (
                      <div className=" mx-2  flex-wrap">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-2/6 truncate text-[#727a85] ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 w-4/6">
                              <span> : </span>
                              <span className="text-md font-[600]  break-all">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className="my-2" />}
                      </div>
                    )}
                    {item.type === "textarea" && item.field == "custom" && (
                      <div className=" mx-2  ">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-2/6 text-[#727a85] truncate ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=" flex gap-2 w-4/6">
                              <span> : </span>
                              <span className="text-md font-[600]  ">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className="my-2" />}
                      </div>
                    )}
                    {item.type === "date" &&
                      item.field === "custom" &&
                      (() => {
                        let date = new Date(item.value);
                        const day = date.getUTCDate();
                        const monthIndex = date.getUTCMonth();
                        const year = date.getUTCFullYear();

                        const monthAbbreviations = [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ];

                        // Formatting the date
                        date = `${day < 10 ? "0" : ""}${day}-${
                          monthAbbreviations[monthIndex]
                        }-${year}`;

                        return (
                          <div className=" mx-2">
                            {item.value && item.value.length > 0 && (
                              <p className="flex gap-2">
                                <span className="w-2/6 text-[#727a85] truncate">
                                  {item.label.charAt(0).toUpperCase() +
                                    item.label.slice(1)}
                                </span>
                                <span className="flex gap-2 w-4/6">
                                  <span> : </span>
                                  <span className="text-md font-[600]">
                                    {date ? date : "No Date"}
                                  </span>
                                </span>
                              </p>
                            )}
                            {item.value && <hr className="my-2" />}
                          </div>
                        );
                      })()}
                    {item.type === "select" && item.field == "custom" && (
                      <div className=" mx-2 ">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-2/6 text-[#727a85] truncate  ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 w-4/6">
                              <span> : </span>
                              <span className="text-md font-[600] ">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className="my-2" />}
                      </div>
                    )}
                    {item.type === "multiselect" && item.field == "custom" && (
                      <div className="mx-2 ">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-2/6 text-[#727a85]  truncate ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 w-4/6">
                              <span> : </span>
                              <span className="text-md font-[600] ">
                                {item.value.join(", ")}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value.join(", ") && <hr className="my-2" />}
                      </div>
                    )}
                    {item.type === "range" && item.field == "custom" && (
                      <div className=" mx-2 ">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-2/6 text-[#727a85] truncate ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 w-4/6">
                              <span> : </span>
                              <span className="text-md font-[600] ">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className="my-2" />}
                      </div>
                    )}
                    {item.type === "time" && item.field == "custom" && (
                      <div className=" mx-2 ">
                        {item.value && item.value.length > 0 && (
                          <p className="flex gap-2">
                            <span className="w-2/6 text-[#727a85] truncate  ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 w-4/6">
                              <span> : </span>
                              <span className="text-md font-[600] ">
                                {formatTime(item.value)}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className="my-2" />}
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
