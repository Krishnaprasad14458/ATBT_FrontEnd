import React from 'react'

const NonEditableFields = ({task , age}) => {
  return (
<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-col-4 items-center mb-3 gap-5">
              <div className="col-span-1">
                <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
                  Date
                </label>
                <p
                  className=" border border-[#d1d5db] text-black h-10 w-full truncate px-3 flex items-center rounded-md text-sm   bg-white-50
                "
                >
                  {task &&
                    (() => {
                      let date = new Date(task?.date);
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
                        <span
                          className="w-full truncate text-sm"
                          title={date ? date : "No Date"}
                        >
                          {" "}
                          {date ? date : "No Date"}
                        </span>
                      );
                    })()}
                </p>
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
                  Meeting Id
                </label>
                <p
                  className=" border border-[#d1d5db] text-black h-10 w-full truncate px-3 flex items-center rounded-md text-sm  bg-white-50"
                  title={task?.meetingnumber}
                >
                  {task?.meetingnumber}
                </p>
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
                  Age(days)
                </label>
                <p
                  className=" border border-[#d1d5db] text-black h-10 w-full truncate px-3 flex items-center rounded-md text-sm  bg-white-50"
                  title={age}
                >
                  {age}
                </p>
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
                  {" "}
                  Entity
                </label>
                <p className=" border border-[#d1d5db] text-black h-10 w-full truncate px-3 flex items-center rounded-md text-sm  bg-white-50">
                  Infoz
                </p>
              </div>
            </div>
  )
}

export default NonEditableFields