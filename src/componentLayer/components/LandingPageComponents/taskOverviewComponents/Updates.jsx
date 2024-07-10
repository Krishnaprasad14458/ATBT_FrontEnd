import React, { useEffect, useState } from "react";
import atbtApi from "../../../../serviceLayer/interceptor";
import { dateFormat} from "../../../../utils/utils";

const Updates = ({ fetchStatus, updates }) => {
  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div >

      {updates.length > 0 ? (
         updates.map((update) => (
            <div className="px-3 py-1 ">
      
            <span className="font-semibold block md:inline text-sm">
            {update.senderId} &nbsp;
                </span>
                <span className="text-sm text-gray-500">
                  {dateFormat(update.Date)}
                </span>
                <p className="text-xs"> {update.message}</p>
          </div>
                ))
    
      ) : (
        <p>No updates available</p>
      )}
    </div>
  );
};

export default Updates;
