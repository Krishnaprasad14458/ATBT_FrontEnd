import React, { useState } from 'react';

function EntityForm() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (

    <div className='container p-3 bg-[#f8fafc]'>
      {/* <p className="font-lg font-semibold p-3">Entity Form</p> */}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        <div class="col-span-1 p-3">
          <p className="text-2xl font-semibold">New Entity</p>
          <form className="space-y-4 mt-4" method="POST">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Entity Name</label>
              <div className="mt-2">
                <input id="name" name="name" type="text" autoComplete="name" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
              <div className='mt-2'>
                <textarea class="resize-none border rounded-md p-2 w-full h-32 border-1 border-gray-400 focus:outline-none focus:border-orange-400"></textarea>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Add Member</label>
              <div className="mt-2">
                <input id="email" name="email" type="text" autoComplete="email" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-90 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div className=''>
              <button type="submit"
                className="mt-10 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Create Entity</button>
            </div>
          </form>
        </div>
        <div class="col-span-2 p-3">
          <div className='relative'>
            <div className="flex justify-start absolute top-3 left-16">
              <p class="text-md font-semibold text-gray-800 ms-2">Entity Name</p>
              <div
                className={`cursor-pointer px-5 py-1 text-sm font-semibold absolute top-6 left-18 ${activeTab === 1 ? 'border-b-4 border-orange-600  text-black' : ''
                  }`}
                onClick={() => handleTabClick(1)}>Profile
              </div>

              <div
                className={`cursor-pointer px-5 py-1 text-sm font-semibold absolute top-6 left-24 ${activeTab === 2 ? 'border-b-4 border-orange-600 text-black' : ''
                  }`}
                onClick={() => handleTabClick(2)}>Calendar
              </div>
            </div>
            {activeTab === 1 && <div className="mt-4">
              <img src='https://d3ki9tyy5l5ruj.cloudfront.net/obj/efa34dcd90db1f5a77cc3f1bb864dd3d91def55d/List,%20no%20avatars.png' className='' alt='' />
            </div>
            }
            {activeTab === 2 && <div className="mt-4">
              <img src='https://d3ki9tyy5l5ruj.cloudfront.net/obj/63306c12043b0a783a7ff409222ce80cc48e1dc1/Calendar,%20no%20avatars.png' className='' alt='' />
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntityForm;
