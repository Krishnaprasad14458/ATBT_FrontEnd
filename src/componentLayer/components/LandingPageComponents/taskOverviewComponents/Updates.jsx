import React, { useEffect, useState } from "react";
import atbtApi from "../../../../serviceLayer/interceptor";
import { dateFormat, formatDateandTime } from "../../../../utils/utils";

const Updates = ({ fetchStatus, updates }) => {
  useEffect(() => {
    fetchStatus();
  }, []);
  console.log("first updates", updates);
  return (
    <div className="bg-[#f8fafc] ">
      {updates?.length > 0 ? (
        updates.map((update) => {
          let createdAt = formatDateandTime(update.createdAt);
          return (
            <div className="px-3 py-1" key={update.id}>
              <div className="pe-5 md:pe-3 py-2 grid grid-cols-11 items-start">
                <div className="md:col-span-1 text-center flex justify-center">
                  <img
                    src={update?.senderId?.[0]?.image}
                    alt="sender"
                    className="hidden md:block mt-3 w-9 h-9 rounded-md"
                  />
                </div>
                <div className="col-span-9">
                  <div>
                    <span className="font-semibold block md:inline text-sm">
                      {update?.senderId?.[0]?.name}&nbsp;
                    </span>
                    <span className="text-sm text-gray-500">
                      {update?.createdAt && createdAt}
                    </span>
                  </div>
                  <p className="text-sm">
                    {update?.isDecisionUpdate && (
                      <span className="text-sm">Updated Decision : </span>
                    )}
                    {update?.isStatusUpdate && (
                      <span className="text-sm ">Decision Status : </span>
                    )}{" "}
                    {update.message}
                  </p>

                  <p className="text-sm">
                    {update?.isDecisionUpdate && (
                      <span className="text-sm ">
                        Date of Updated Decision :
                      </span>
                    )}
                    {update?.isStatusUpdate && (
                      <span className="text-sm ">
                        Date of Decision Status :
                      </span>
                    )}
                    {dateFormat(update.Date)}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No updates available</p>
      )}
    </div>
  );
};

export default Updates;
