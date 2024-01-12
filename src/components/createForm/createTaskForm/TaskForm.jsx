import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function TaskForm() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className='container p-3 bg-[#f8fafc] '>
      <div className="w-full mt-8">
        <div className="flex justify-start">
          <div
            className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 1 ? 'border-b-4 border-orange-600  text-black' : ''
              }`}
            onClick={() => handleTabClick(1)}>Overview
          </div>
          <div
            className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 2 ? 'border-b-4 border-orange-600 text-black' : ''
              }`}
            onClick={() => handleTabClick(2)}>List
          </div>
          <div
            className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 3 ? 'border-b-4 border-orange-600 text-black' : ''
              }`}
            onClick={() => handleTabClick(3)}>Calendar
          </div>
          <div
            className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 4 ? 'border-b-4 border-orange-600 text-black' : ''
              }`}
            onClick={() => handleTabClick(4)}>Messages
          </div>
        </div>

        {activeTab === 1 && <div className="mt-4">Content for Tab 1</div>}
        {activeTab === 2 && <div className="mt-4">Content for Tab 2</div>}
        {activeTab === 3 && <div className="mt-4">Content for Tab 3</div>}
        {activeTab === 4 && <div className="mt-4">Content for Tab 4</div>}

      </div>
    </div>
  );
}


export default TaskForm;
