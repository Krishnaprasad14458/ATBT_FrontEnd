import React, { useState } from "react";
import defprop from "../../../../assets/Images/defprof.svg";
import {
  Link,
  Outlet,
  useParams,
  useLoaderData,
  redirect,
} from "react-router-dom";
import { EntitiesDataContext } from "../../../../contexts/entitiesDataContext/entitiesDataContext";
import axios from "axios";
import atbtApi from "../../../../serviceLayer/interceptor";
import GateKeeper from "../../../../rbac/GateKeeper";
export const entityOverviewLoader = async ({ params }) => {
  try {
    const [data, UsersList] = await Promise.all([
      atbtApi.get(`/entity/list/${params?.id}`),
      atbtApi.post(`entity/User/list/${params?.id}`),
    ]);
    data.threadName = data?.data?.name;
    data.threadPath = `/entities/${params.id}`;
    console.log("combined data", data, UsersList);
    return { data, UsersList };
  } catch (error) {
    console.error("Error loading dashboard:", error);
    return null;
    // throw redirect(`/${error?.response?.status ?? "500"}`);
  }
};
const EntityOverview = () => {
  const { id } = useParams();
  const data = useLoaderData();
  let UsersList = data?.UsersList?.data;
  console.log("userslist", UsersList);

  const customFormField = data?.data?.data?.customFieldsData;

  const userData = JSON.parse(localStorage.getItem("data"));
  let predefinedImage = data?.data?.data?.image;
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
    <div className="p-4 bg-[#f8fafc]">
      <div className="flex justify-end gap-3 pb-5 md:pb-0">
        <GateKeeper
          permissionCheck={(permission) =>
            permission.module === "entity" && permission.canUpdate
          }
        >
          <Link to={`../${id}/edit`} relative="path">
            <button className=" flex  justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
              Edit
            </button>
          </Link>
        </GateKeeper>{" "}
      </div>
      <div className="flex justify-center mt-3">
        <div className=" w-full md:w-full  lg:w-11/12 xl:11/12 shadow-md border-2 rounded-md bg-[#f8fafc] px-4 pb-4 pt-1">
          {customFormField &&
            customFormField.length > 0 &&
            customFormField.map((item) => {
              return (
                <div className="relative">
                  {/* predefined fields*/}
                  {item.type === "file" &&
                    item.inputname === "image" &&
                    item.field === "predefined" && (
                      <div className=" h-10  hidden sm:block">
                        {item.value ? (
                          <img
                            src={predefinedImage}
                            name="EntityPhoto"
                            alt="Selected User Photo"
                            className="rounded-lg w-10 h-10 mr-4 "
                          />
                        ) : (
                          <img
                            className="w-10 h-10 rounded-lg mr-4 "
                            src={defprop}
                            alt="default image"
                          />
                        )}
                      </div>
                    )}
                  {item.type === "text" &&
                    item.inputname === "name" &&
                    item.field === "predefined" && (
                      <p className="text-sm font-black text-gray-800 md:mt-2 ml-2 md:absolute md:left-12">
                        {item.value.toUpperCase()}
                      </p>
                    )}
                  {item.type === "textarea" &&
                    item.inputname == "description" &&
                    item.field == "predefined" && (
                      <div className="h-28 overflow-auto border border-1 border-gray-200 rounded-md p-2 bg-[#f8fafc] text-sm w-full mt-4">
                        {item.value}
                      </div>
                    )}

                  {/* customfields */}
                  <div className="mt-2">
                    {item.type === "text" && item.field == "custom" && (
                      <div className="my-2 mx-2 ">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-2/6 truncate text-[#727a85] ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=" flex gap-2 w-4/6">
                              <span> : </span>{" "}
                              <span className="text-md font-[600]  ">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className="mt-2" />}{" "}
                      </div>
                    )}
                    {item.type === "email" && item.field == "custom" && (
                      <div className="my-2 mx-2 ">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-2/6 truncate text-[#727a85] ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 w-4/6 ">
                              <span> : </span>{" "}
                              <span className="text-md font-[600] break-all">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className="mt-2" />}
                      </div>
                    )}

                    {item.type === "phonenumber" && item.field == "custom" && (
                      <div className="my-2 mx-2  flex-wrap">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-2/6 truncate text-[#727a85] ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 w-4/6">
                              <span> : </span>{" "}
                              <span className="text-md font-[600] ">
                                {item.value.slice(0, 3)}&nbsp;
                                {item.value.slice(3, 6)}&nbsp;
                                {item.value.slice(6, 10)}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className="mt-2" />}{" "}
                      </div>
                    )}
                    {item.type === "number" && item.field == "custom" && (
                      <div className="my-2 mx-2  flex-wrap">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-2/6 truncate text-[#727a85] ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 w-4/6">
                              <span> : </span>{" "}
                              <span className="text-md font-[600]  break-all">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className="mt-2" />}{" "}
                      </div>
                    )}
                    {item.type === "textarea" && item.field == "custom" && (
                      <div className="my-2 mx-2  ">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-2/6 text-[#727a85] truncate ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=" flex gap-2 w-4/6">
                              <span> : </span>{" "}
                              <span className="text-md font-[600]  ">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className="mt-2" />}{" "}
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
                          <div className="my-2 mx-2">
                            {item.value && item.value.length > 0 && (
                              <p className="flex gap-2">
                                <span className="w-2/6 text-[#727a85] truncate">
                                  {item.label.charAt(0).toUpperCase() +
                                    item.label.slice(1)}
                                </span>
                                <span className="flex gap-2 w-4/6">
                                  <span> : </span>{" "}
                                  <span className="text-md font-[600]">
                                    {date ? date : "No Date"}
                                  </span>
                                </span>
                              </p>
                            )}
                            {item.value && <hr className="mt-2" />}
                          </div>
                        );
                      })()}

                    {item.type === "select" && item.field == "custom" && (
                      <div className="my-2 mx-2 ">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-2/6 text-[#727a85] truncate  ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 w-4/6">
                              <span> : </span>{" "}
                              <span className="text-md font-[600] ">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className="mt-2" />}{" "}
                      </div>
                    )}
                    {item.type === "multiselect" && item.field == "custom" && (
                      <div className="my-2 mx-2 ">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-2/6 text-[#727a85]  truncate ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 w-4/6">
                              <span> : </span>{" "}
                              <span className="text-md font-[600] ">
                                {item.value.join(", ")}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value.join(", ") && <hr className="mt-2" />}{" "}
                      </div>
                    )}
                    {item.type === "range" && item.field == "custom" && (
                      <div className="my-2 mx-2 ">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-2/6 text-[#727a85] truncate ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 w-4/6">
                              <span> : </span>{" "}
                              <span className="text-md font-[600] ">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className="mt-2" />}{" "}
                      </div>
                    )}
                    {item.type === "time" && item.field == "custom" && (
                      <div className="my-2 mx-2 ">
                        {item.value && item.value.length > 0 && (
                          <p className="flex gap-2">
                            <span className="w-2/6 text-[#727a85] truncate  ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 w-4/6">
                              <span> : </span>{" "}
                              <span className="text-md font-[600] ">
                                {formatTime(item.value)}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className="mt-2" />}{" "}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 mt-5">
            {UsersList &&
              Array.from({ length: showAllMembers }).map((_, index) => {
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
                              <p className="truncate w-64 text-sm">
                                {user.name}
                              </p>
                              <p className="truncate w-64 text-sm">
                                {user.email}
                              </p>
                              <p className="truncate w-64 text-sm">
                                {user.designation}
                              </p>
                            </div>
                          
                          </div>
                        </div>
                        {index === showAllMembers - 1 &&
                              UsersList.length > showAllMembers && (
                                <span className="text-xs border border-gray-200 p-2 bg-orange-500 rounded-md text-white cursor-pointer"
                                  onClick={() =>
                                    setShowAllMembers(UsersList.length)
                                  }
                                >
                                  + {UsersList.length - showAllMembers} more
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
        </div>
      </div>
    </div>
  );
};

export default EntityOverview;
