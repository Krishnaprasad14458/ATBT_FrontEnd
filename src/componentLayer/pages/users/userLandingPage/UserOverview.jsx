import React from "react";
import defprop from "../../../../assets/Images/defprof.svg";
import {
  Link,
  redirect,
  useLoaderData,
  useParams,
  useLocation,
} from "react-router-dom";
import atbtApi from "../../../../serviceLayer/interceptor";
export const userLandingLoader = async ({ params }) => {
  try {
    const [data, entityListresponse] = await Promise.all([
      atbtApi.get(`/user/list/${params?.id}`),

      atbtApi.post(`public/list/entity`),
    ]);

    let entityList;
    entityList =
      entityListresponse?.data?.Entites?.map((item) => ({
        name: item?.name || "",
        id: item?.id || "",
      })) || [];
    console.log(data, "id data");
    data.threadName = data?.user?.name;
    data.threadPath = `/users/${params.id}`;
    return { data, entityList };
  } catch (error) {
    console.error("Error loading dashboard:", error);
    throw redirect(`/${error?.response?.status ?? "500"}`);
  }
};
const UserOverview = () => {
  const { id } = useParams();
  const data = useLoaderData();

  const customFormField = data.data.user.customFieldsData;

  // for the active tabs
  const location = useLocation();
  const currentURL = location.pathname.split("/");
  console.log("currentURL", currentURL);

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
  return (
    <div className="mt-28 flex justify-center  ">
      <div className="w-full md:w-full  lg:w-11/12 xl:11/12 shadow-md border-2 rounded-md bg-[#f8fafc] ">
        <div className="flex justify-end bg-[#fff7ed]">
          <Link
            to={`../${id}/edit`}
            relative="path"
            className=" px-4 py-2 text-sm font-medium transition-colors  focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  text-gray-900 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-gray-900"
            >
              <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
            </svg>
          </Link>
        </div>
        {customFormField &&
          customFormField.length > 0 &&
          customFormField.map((item) => {
            return (
              <div className="">
                <div className="bg-[#fff7ed] rounded-xl">
                  {item.type === "file" &&
                    item.inputname == "image" &&
                    item.field === "predefined" && (
                      <div>
                        {console.log(item.value, "item.value")}
                        {console.log(
                          data?.user?.image,
                          "  {data?.user?.image}"
                        )}

                        {item.value ? (
                          <img
                            src={data?.user?.image}
                            name="EntityPhoto"
                            alt="User Photo"
                            className=" h-36 w-36 relative mx-auto bottom-20 rounded-md border-2 border-gray-200 shadow-md"
                          />
                        ) : (
                          <img
                            className=" h-36 w-36 relative mx-auto bottom-20 rounded-md border-2 border-gray-200 shadow-md"
                            src={defprop}
                            alt="photo"
                          />
                        )}

                        {/* {item.value ? (
                                  <img
                                    src={
                                      typeof item.value === "string"
                                        ? item.value
                                        : URL.createObjectURL(item.value)
                                    }
                                    name="UserPhoto"
                                    alt="User Photo"
                                    className=" h-36 w-36 relative mx-auto bottom-20 rounded-md border-2 border-gray-200 shadow-md"
                                  />
                                ) : (
                                  <img
                                    className=" h-36 w-36 relative mx-auto bottom-20 rounded-md border-2 border-gray-200 shadow-md"
                                    src={defprop}
                                    alt="photo"
                                  />
                                )} */}
                        {/* {item.value ? (
                          <img
                            src={
                              typeof item.value === "string"
                                ? item.value
                                : item.value instanceof File ||
                                  item.value instanceof Blob
                                ? URL.createObjectURL(item.value)
                                : ""
                            }
                            name="UserPhoto"
                            alt="User Photo"
                            className="h-36 w-36 relative mx-auto bottom-20 rounded-md border-2 border-gray-200 shadow-md"
                          />
                        ) : (
                          <img
                            className="h-36 w-36 relative mx-auto bottom-20 rounded-md border-2 border-gray-200 shadow-md"
                            src={defprop}
                            alt="photo"
                          />
                        )} */}
                      </div>
                    )}
                </div>
                {item.type === "text" &&
                  item.inputname === "name" &&
                  item.field === "predefined" && (
                    <div className="flex justify-center relative text-center">
                      <p
                        className="absolute top-20 text-sm md:text-md antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 mb-3 w-3/6 truncate md:w-5/6 text-center"
                        title={item.value.toUpperCase()}
                      >
                        {item.value.toUpperCase()}
                      </p>
                    </div>
                  )}
                {item.type === "select" &&
                  item.inputname === "entityname" &&
                  item.field === "predefined" && (
                    <div className="flex justify-center border-t-2 border-gray-300 relative text-center">
                      <p
                        className="absolute  bottom-3 text-sm antialiased leading-snug tracking-normal text-blue-gray-900 w-3/6 truncate md:w-5/6 "
                        title={item.value.toUpperCase()}
                      >
                        {
                          data?.entityList?.find(
                            (i) => i.id === parseInt(item.value)
                          )?.name
                        }
                      </p>
                    </div>
                  )}

                {item.type === "email" &&
                  item.inputname == "email" &&
                  item.field == "predefined" && (
                    <div className="my-3 mx-5">
                      <p className="flex  gap-2 ">
                        <span
                          className="w-full md:w-3/12  truncate text-[#727a85] hidden sm:block  flex-wrap"
                          title={
                            item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)
                          }
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                        </span>
                        <span className="  flex gap-2 md:w-9/12">
                          <span className="hidden sm:block"> : </span>
                          <span className="text-md font-[600] break-all">
                            {item.value}
                          </span>
                        </span>
                      </p>
                      {item.value && <hr className="my-2" />}
                    </div>
                  )}
                {item.type === "phonenumber" &&
                  item.inputname == "phonenumber" &&
                  item.field == "predefined" && (
                    <div className="my-3 mx-5">
                      <p className="flex    gap-2 ">
                        <span
                          className="w-full md:w-3/12 truncate  text-[#727a85] hidden sm:block flex-wrap"
                          title={
                            item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)
                          }
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                        </span>
                        <span className=" flex gap-2 md:w-9/12">
                          <span className="hidden sm:block"> : </span>
                          <span className="text-md font-[600] ">
                            {item.value}
                          </span>
                        </span>
                      </p>
                      {item.value && <hr className="my-2" />}
                    </div>
                  )}
                {item.type === "select" &&
                  item.inputname == "designation" &&
                  item.field == "predefined" && (
                    <div className="my-3 mx-5 ">
                      <p className="flex  gap-2">
                        <span
                          className="w-full md:w-3/12  truncate text-[#727a85] hidden sm:block"
                          title={
                            item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)
                          }
                        >
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
                      {item.value && <hr className="my-2" />}
                    </div>
                  )}
                {/* custom fields */}

                {item.type === "text" && item.field == "custom" && (
                  <div className="my-3 mx-5">
                    {item.value && item.value.length > 0 && (
                      <p className="flex  gap-2">
                        <span
                          className="w-full md:w-3/12 truncate  text-[#727a85] hidden sm:block"
                          title={
                            item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)
                          }
                        >
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
                    {item.value && <hr className="my-2" />}
                  </div>
                )}
                {item.type === "email" && item.field == "custom" && (
                  <div className="my-3 mx-5">
                    {item.value && item.value.length > 0 && (
                      <p className="flex  gap-2">
                        <span className="w-full md:w-3/12 truncate  text-[#727a85] hidden sm:block">
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
                    {item.value && <hr className="my-2" />}
                  </div>
                )}
                {item.type === "phonenumber" && item.field == "custom" && (
                  <div className="my-3 mx-5 flex-wrap">
                    {item.value && item.value.length > 0 && (
                      <p className="flex  gap-2">
                        <span
                          className="w-full md:w-3/12  truncate text-[#727a85] hidden sm:block"
                          title={
                            item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)
                          }
                        >
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
                    {item.value && <hr className="my-2" />}
                  </div>
                )}
                {item.type === "number" && item.field == "custom" && (
                  <div className="my-2 mx-5 flex-wrap">
                    {item.value && item.value.length > 0 && (
                      <p className="flex  gap-2">
                        <span
                          className="w-full md:w-3/12 truncate  text-[#727a85] hidden sm:block"
                          title={
                            item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)
                          }
                        >
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
                    {item.value && <hr className="my-2" />}
                  </div>
                )}
                {item.type === "textarea" && item.field == "custom" && (
                  <div className="my-3 mx-5">
                    {item.value && item.value.length > 0 && (
                      <p className="flex gap-2">
                        <span
                          className="w-full md:w-3/12  truncate text-[#727a85] hidden sm:block"
                          title={
                            item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)
                          }
                        >
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
                      <div className="my-3 mx-5">
                        {item.value && item.value.length > 0 && (
                          <p className="flex gap-2">
                            <span
                              className="w-full md:w-3/12 truncate text-[#727a85] hidden sm:block"
                              title={
                                item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)
                              }
                            >
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className="flex gap-2 md:w-9/12">
                              <span className="hidden sm:block"> : </span>
                              <span className="text-md font-[600] ">
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
                  <div className="my-3 mx-5">
                    {item.value && item.value.length > 0 && (
                      <p className="flex  gap-2">
                        <span
                          className="w-full md:w-3/12  truncate text-[#727a85] hidden sm:block"
                          title={
                            item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)
                          }
                        >
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
                    {item.value && <hr className="my-2" />}
                  </div>
                )}
                {item.type === "multiselect" && item.field == "custom" && (
                  <div className="my-3 mx-5">
                    {item.value && item.value.length > 0 && (
                      <p className="flex  gap-2">
                        <span
                          className="w-full md:w-3/12 truncate  text-[#727a85] hidden sm:block"
                          title={
                            item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)
                          }
                        >
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
                    {item.value.join(", ") && <hr className="my-2" />}
                  </div>
                )}
                {item.type === "range" && item.field == "custom" && (
                  <div className="my-3 mx-5">
                    {item.value && item.value.length > 0 && (
                      <p className="flex  gap-2">
                        <span
                          className="w-full md:w-3/12 truncate  text-[#727a85] hidden sm:block"
                          title={
                            item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)
                          }
                        >
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
                    {item.value && <hr className="my-2" />}
                  </div>
                )}
                {item.type === "time" && item.field == "custom" && (
                  <div className="my-3 mx-5">
                    {item.value && item.value.length > 0 && (
                      <p className="flex  gap-2">
                        <span
                          className="w-full md:w-3/12 truncate  text-[#727a85] hidden sm:block"
                          title={
                            item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)
                          }
                        >
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
                    {item.value && <hr className="my-2" />}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserOverview;
