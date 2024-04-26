import React from 'react'

const Comments = () => {
  return (
    <div className="grid grid-cols-7 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-7 xl:grid-cols-7 ms-3 p-3 sticky bottom-0">
    <div className="col-span-1 text-center ">
      <p className="bg-yellow-500 text-black py-1.5 w-8 h-8  rounded-full">
        <span className="flex justify-center text-gray-800 text-sm">
          BA
        </span>
      </p>
    </div>
    <div className="col-span-6">
      <p className=" border border-[#d1d5db] text-black h-48 rounded-md text-sm   bg-white-50"></p>
      {/* <textarea
        placeholder="Add a comment"
        className="p-2 border-2 text-sm w-full  shadow-sm rounded-md  focus:outline-none focus:border-orange-400"
      ></textarea> */}
    </div>
  </div>
  )
}

export default Comments