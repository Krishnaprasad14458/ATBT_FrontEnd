import React from "react";
import defprop from "../../../../assets/Images/defprof.svg";
import { Link, useParams, redirect, useLoaderData } from "react-router-dom";

import atbtApi from "../../../../serviceLayer/interceptor";
import { dateFormat, formatTime } from "../../../../utils/utils";
import GateKeeper from "../../../../rbac/GateKeeper";
export const teamLandingLoader = async ({ params }) => {
  try {
    const [data] = await Promise.all([atbtApi.get(`/team/list/${params?.id}`)]);
    console.log(data, "team overview id data");
    data.threadName = data?.data?.name;
    data.threadPath = `/teams/${params.id}`;
    return { data };
  } catch (error) {
    console.error("Error loading dashboard:", error);
    throw redirect(`/${error?.response?.status ?? "500"}`);
  }
};
const TeamsOverview = () => {
  const { id } = useParams();
  const data = useLoaderData();
  let UsersList = data?.data?.data.members;
  let customFormField = data?.data?.data?.customFieldsData;

  return (
    <div className="p-4 bg-[#f8fafc]">
      <div className="flex justify-end gap-3 pb-5 md:pb-0">
      <GateKeeper
              permissionCheck={(permission) =>
                permission.module === "team" && permission.canUpdate
              }
            >
        <Link to={`../${id}/edit`} relative="path">
          <button className=" flex  justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
            Edit
          </button>
        </Link>       </GateKeeper>
      </div>
      <div className=" flex justify-center mt-5">
        <div className="w-full md:w-full  lg:w-11/12 xl:11/12 shadow-md border-2 rounded-md bg-[#f8fafc] px-4 pb-4">
          {customFormField &&
            customFormField.length > 0 &&
            customFormField.map((item) => {
              let date = dateFormat(item.value);

              // let date = new Date(item.value);
              // const day = date.getUTCDate();
              // const monthIndex = date.getUTCMonth();
              // const year = date.getUTCFullYear();

              // const monthAbbreviations = [
              //   "Jan",
              //   "Feb",
              //   "Mar",
              //   "Apr",
              //   "May",
              //   "Jun",
              //   "Jul",
              //   "Aug",
              //   "Sep",
              //   "Oct",
              //   "Nov",
              //   "Dec",
              // ];

              // // Formatting the date
              // date = `${day < 10 ? "0" : ""}${day}-${
              //   monthAbbreviations[monthIndex]
              // }-${year}`;
              return (
                <div className="relative">
                  {/* predefined fields*/}
                  {item.type === "file" &&
                    item.inputname === "image" &&
                    item.field === "predefined" && (
                      <div className=" h-10  hidden sm:block">
                        {item.value ? (
                          <img
                            // src={predefinedImage}
                            src={data?.data?.data?.image}
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
                  {item.type === "multiselect" &&
                    item.inputname == "members" &&
                    item.field == "predefined" && (
                      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 mt-5">
                        {UsersList &&
                          Array.from({ length: 12 }).map((_, index) => {
                            let first = "";
                            let second = "";
                            let firstLetter;
                            let secondLetter;
                            let username = "";
                            let mail = "";
                            let designation = "";
                            if (index < UsersList.length) {
                              username = UsersList[index].name;
                              mail = UsersList[index].email;
                              designation = UsersList[index].designation;
                              if (username.includes(" ")) {
                                first = username.split(" ")[0];
                                second = username.split(" ")[1];
                                firstLetter = first[0];
                                secondLetter = second[0];
                              }
                            } else {
                              firstLetter = username[0];
                            }
                            if (username.includes(" ")) {
                              first = username.split(" ")[0];
                              second = username.split(" ")[1];
                              firstLetter = first[0];
                              secondLetter = second[0];
                            } else {
                              firstLetter = username[0];
                            }


                            //   if (mail.includes(".")) {
                            //     first = mail.split(".")[0];
                            //     second = mail.split(".")[1];
                            //     firstLetter = first[0];
                            //     secondLetter = second[0];
                            //   } else {
                            //     firstLetter = mail[0];
                            //   }
                            // }
                            // if (mail.includes(".")) {
                            //   first = mail.split(".")[0];
                            //   second = mail.split(".")[1];
                            //   firstLetter = first[0];
                            //   secondLetter = second[0];
                            // } else {
                            //   firstLetter = mail[0];
                            // }
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
                            const getRandomColor = (firstLetter) => {
                              const randomIndex =
                                firstLetter?.charCodeAt(0) % colors.length;
                              return colors[randomIndex];
                            };
                            return (
                              <div
                                className="col-span-1 flex justify-start gap-3"
                                key={index}
                              >
                                {index + 1 <= UsersList.length && (
                                  <>
                                    <h5
                                      style={{
                                        backgroundColor: UsersList[index].image
                                          ? "transparent"
                                          : getRandomColor(firstLetter),
                                      }}
                                      className=" rounded-full w-10 h-10  md:h-8 xl:h-10 flex justify-center  text-xs items-center text-white"
                                    >
                                      {(UsersList[index].image && index < 11) ||
                                      (index === 11 &&
                                        UsersList.length === 12) ? (
                                        <img
                                          src={
                                            typeof UsersList[index].image ===
                                            "string"
                                              ? UsersList[index].image
                                              : URL.createObjectURL(
                                                  UsersList[index].image
                                                )
                                          }
                                          name="EntityPhoto"
                                          alt="Entity Photo"
                                          className=" rounded-full w-10 h-10   flex justify-center  text-xs items-center text-white"
                                        />
                                      ) : (
                                        <span>
                                          {firstLetter?.toUpperCase()}
                                          {secondLetter &&
                                            secondLetter?.toUpperCase()}
                                        </span>
                                      )}

                                      {index == 11 && UsersList.length > 12 && (
                                        <span>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                                            />
                                          </svg>
                                        </span>
                                      )}
                                    </h5>
                                    <div
                                      className=" flex items-center md:items-start xl:items-center  overflow-hidden"
                                     
                                    >
                                      {/* \nDesignation : ${designation} */}
                                      <div
                                        className=""
                                        title={`Name : ${username}\nEmail : ${mail}
                                      
                                        `}
                                      >
                                        {index < 11 &&   <div>
                                <p className="truncate w-64 text-sm">{username}</p>{" "}
                                <p className="truncate w-64 text-sm"> {mail}</p>
                                <p className="truncate w-64 text-sm"> {designation}</p>
                              </div>}
                                        {index == 11 &&
                                          UsersList.length == 12 &&
                                          <div>
                                          <p className="truncate w-64 text-sm">{username}</p>{" "}
                                          <p className="truncate w-64 text-sm"> {mail}</p>
                                          <p className="truncate w-64 text-sm"> {designation}</p>
                                        </div>}
                                        {index == 11 &&
                                          UsersList.length > 12 && (
                                            <span>
                                              +{UsersList.length - 11} more
                                            </span>
                                          )}
                                      </div>
                                    </div>
                                  </>
                                )}
                                {index + 1 > UsersList.length && (
                                  <>
                                    <h5 className="bg-[#e5e7eb] rounded-full w-10 h-10  flex justify-center text-xs items-center text-white"></h5>
                                    <div className=" flex items-center">
                                      <div className=" rounded-md  bg-[#e5e7eb] h-2 w-28"></div>
                                    </div>
                                  </>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    )}

                  {/* customfields */}
                  <div className="mt-2">
                    {item.type === "text" && item.field == "custom" && (
                      <div className="my-3 mx-5">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-full md:w-3/12 break-words  text-[#727a85] hidden sm:block ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 md:w-9/12">
                              <span className="hidden sm:block"> : </span>
                              <span className="text-md font-[600]  ">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    {item.type === "email" && item.field == "custom" && (
                      <div className="my-3 mx-5">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-full md:w-3/12 break-words  text-[#727a85] hidden sm:block ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 md:w-9/12 ">
                              <span className="hidden sm:block"> : </span>
                              <span className="text-md font-[600] break-all">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    {item.type === "phonenumber" && item.field == "custom" && (
                      <div className="my-3 mx-5 flex-wrap">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-full md:w-3/12 break-words text-[#727a85] hidden sm:block ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=" flex gap-2 md:w-9/12">
                              <span className="hidden sm:block"> : </span>{" "}
                              <span className="text-md font-[600]  ">
                                {item.value.slice(0, 3)}&nbsp;
                                {item.value.slice(3, 6)}&nbsp;
                                {item.value.slice(6, 10)}
                              </span>
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    {item.type === "number" && item.field == "custom" && (
                      <div className="my-2 mx-5 flex-wrap">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-full md:w-3/12 break-words  text-[#727a85] hidden sm:block ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 md:w-9/12">
                              <span className="hidden sm:block"> : </span>{" "}
                              <span className="text-md font-[600] break-all">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    {item.type === "textarea" && item.field == "custom" && (
                      <div className="my-3 mx-5">
                        {item.value && item.value.length > 0 && (
                          <p className="flex gap-2">
                            <span className="w-full md:w-3/12  break-words text-[#727a85] hidden sm:block ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 md:w-9/12">
                              <span className="hidden sm:block"> : </span>
                              <span className="text-md font-[600] ">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    {item.type === "date" && item.field == "custom" && (
                      <div className="my-3 mx-5">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-full md:w-3/12 break-words  text-[#727a85] hidden sm:block ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 md:w-9/12">
                              <span className="hidden sm:block"> : </span>
                              <span className="text-md font-[600] ">
                                {date ? date : "No Date"}
                              </span>
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    {item.type === "select" && item.field == "custom" && (
                      <div className="my-3 mx-5">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-full md:w-3/12  break-words text-[#727a85] hidden sm:block ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 md:w-9/12">
                              <span className="hidden sm:block"> : </span>
                              <span className="text-md font-[600] ">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    {item.type === "multiselect" && item.field == "custom" && (
                      <div className="my-3 mx-5">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-full md:w-3/12 break-words  text-[#727a85] hidden sm:block ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 md:w-9/12">
                              <span className="hidden sm:block"> : </span>
                              <span className="text-md font-[600] ">
                                {item.value.join(", ")}
                              </span>
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    {item.type === "range" && item.field == "custom" && (
                      <div className="my-3 mx-5">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-full md:w-3/12 break-words  text-[#727a85] hidden sm:block ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 md:w-9/12">
                              <span className="hidden sm:block"> : </span>
                              <span className="text-md font-[600] ">
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    {item.type === "time" && item.field == "custom" && (
                      <div className="my-3 mx-5">
                        {item.value && item.value.length > 0 && (
                          <p className="flex  gap-2">
                            <span className="w-full md:w-3/12 break-words  text-[#727a85] hidden sm:block ">
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="  flex gap-2 md:w-9/12">
                              <span className="hidden sm:block"> : </span>
                              <span className="text-md font-[600] ">
                                {formatTime(item.value)}
                              </span>
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TeamsOverview;
