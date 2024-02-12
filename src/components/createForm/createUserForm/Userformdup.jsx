import React, { useState } from 'react'


const Userformdup = () => {
    const [filedopen, setFiledOpen] = useState(false);

    const handleFiledOpen = () => {
        setFiledOpen(!filedopen);
    }
    return (
        <div className='container p-3'>
            <p className="text-lg font-semibold">Custom Board Meeting Form</p>
            <form class="">
                <div class="flex "><div class="w-full border-slate04 h-fit border-b py-3 mb-4 text-left text-xs ">
                    <div role="button" class="block w-full"><div class="flex justify-between items-center">
                        <div class="flex justify-between items-center bg-[#e5e7eb] p-4 w-full" onClick={handleFiledOpen}>
                            <div class="flex text-black font-semibold"><div class="mr-2 text-">
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="line-columns" class="svg-inline--fa fa-line-columns text-darkSlate02" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M200 40C213.3 40 224 50.75 224 64C224 77.25 213.3 88 200 88H24C10.75 88 0 77.25 0 64C0 50.75 10.75 40 24 40H200zM200 168C213.3 168 224 178.7 224 192C224 205.3 213.3 216 200 216H24C10.75 216 0 205.3 0 192C0 178.7 10.75 168 24 168H200zM0 320C0 306.7 10.75 296 24 296H200C213.3 296 224 306.7 224 320C224 333.3 213.3 344 200 344H24C10.75 344 0 333.3 0 320zM200 424C213.3 424 224 434.7 224 448C224 461.3 213.3 472 200 472H24C10.75 472 0 461.3 0 448C0 434.7 10.75 424 24 424H200zM288 192C288 178.7 298.7 168 312 168H488C501.3 168 512 178.7 512 192C512 205.3 501.3 216 488 216H312C298.7 216 288 205.3 288 192zM488 40C501.3 40 512 50.75 512 64C512 77.25 501.3 88 488 88H312C298.7 88 288 77.25 288 64C288 50.75 298.7 40 312 40H488zM288 320C288 306.7 298.7 296 312 296H488C501.3 296 512 306.7 512 320C512 333.3 501.3 344 488 344H312C298.7 344 288 333.3 288 320zM488 424C501.3 424 512 434.7 512 448C512 461.3 501.3 472 488 472H312C298.7 472 288 461.3 288 448C288 434.7 298.7 424 312 424H488z"></path></svg></div>
                                <div class="">Full Name</div></div>
                            <div class="">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
                                </svg>

                            </div></div></div></div>

                    {filedopen &&
                        <div class="px-6">
                            <div class="border-b border-slateStroke flex flex-wrap py-5 ">
                                <div class="w-1/3 text-body text-darkSlate01 text-md">Field title</div>
                                <div class="w-1/2 "><div class="w-full relative m-0 ">
                                    <div class="w-full">
                                        <input type="text" autocomplete="" placeholder="Enter title" class="input-mol  p-[0.5rem]   w-full text-darkSlate01 text-sm rounded focus:outline-none bg-[#f8fafc] focus:shadow-none border border-slate04 focus:border-slate01!rounded-none py-3 !text-body px-4  undefined" value="Mobile" />
                                    </div></div></div></div>
                            <div class="border-b border-slateStroke flex flex-wrap py-5 "><div class="w-1/3 text-body text-darkSlate01 ">Field type</div>
                                <div class="w-1/2 ">
                                    <div class="relative ">
                                        <button class="button-base w-full button-base-primary button-lg button-enabled">


                                            <select
                                                color="text-darkSlate01" class="flex bg-gray-50 items-center   border-slateStroke cursor-pointer rounded  focus:outline-none focus:border-orange-400 p-[0.5rem]   w-full text-darkSlate01 text-sm    focus:shadow-none border border-slate04 focus:border-slate01!rounded-none py-3 !text-body px-4  undefined"
                                            // id={item.inputname}
                                            // name={item.inputname}

                                            // onChange={(e) => handleChange(index, e.target.value)}
                                            // value={customFormFields[index].value || ''}
                                            >
                                                {/* {item.options && item.options.map((option, index) => ( */}
                                                <option value="">select</option>
                                                <option value="text">text</option>
                                                <option value="textarea">textarea</option>
                                                <option value="email">email</option>

                                                {/* ))} */}

                                            </select>


                                            {/* <span class="ml-3 !text-darkSlate02">text</span> */}
                                            {/* <span class="ml-2 transition-all duration-300 linear"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down text-darkSlate02" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                        <path fill="currentColor" d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"></path></svg>
                                                    </span> */}
                                        </button></div></div></div>

                            <div class="  flex flex-wrap pt-5 ">
                                <div class="w-1/3 text-body text-darkSlate01 ">Mark as required</div>
                                {/* <div class="w-1/3 text-body text-darkSlate01 ">Mark as filtered</div> */}
                                <input
                                    // className="mb-1"
                                    type="checkbox"
                                    id="mandatory"
                                    name="mandatory"

                                // checked={input.mandatory}
                                // onChange={handleInputChange}
                                />
                                {/* <div class="w-1/2 ">
                                    <div role="button" class="cursor-pointer w-8 h-4 transition rounded-full bg-orange-600 p-0.5 ">
                                        <div class="bg-white w-3 h-3 rounded-full transform translate-x-0 transition">
                                        </div></div></div> */}
                            </div>
                            <div class="  flex flex-wrap pt-5 ">
                                <div class="w-1/3 text-body text-darkSlate01 ">Mark as filtered</div>
                                {/* <div class="w-1/3 text-body text-darkSlate01 ">Mark as filtered</div> */}
                                {/* <div class="w-1/2 ">
                                    <div role="button" class="cursor-pointer w-8 h-4 transition rounded-full bg-orange-600 p-0.5 ">
                                        <div class="bg-white w-3 h-3 rounded-full transform translate-x-0 transition">
                                        </div></div></div> */}
                                <input

                                    type="checkbox"
                                    id="mandatory"
                                    name="mandatory"

                                // checked={input.mandatory}
                                // onChange={handleInputChange}
                                />
                            </div>


                            <div class="flex justify-end w-full pt-4 pb-0.5">
                                <div class="mr-4"></div><div class="">
                                    <button class=" flex w-full justify-center rounded-md bg-orange-600 px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600
      
      ">Save</button>
                                </div></div></div>
                    }
                </div></div>
                <div class="flex "><div class="w-full border-slate04 h-fit border-b py-3 mb-4 text-left text-xs ">
                    <div role="button" class="block w-full"><div class="flex justify-between items-center">
                        <div class="flex justify-between items-center bg-[#e5e7eb] p-4 w-full" onClick={handleFiledOpen}>
                            <div class="flex text-black font-semibold"><div class="mr-2 text-">
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="line-columns" class="svg-inline--fa fa-line-columns text-darkSlate02" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M200 40C213.3 40 224 50.75 224 64C224 77.25 213.3 88 200 88H24C10.75 88 0 77.25 0 64C0 50.75 10.75 40 24 40H200zM200 168C213.3 168 224 178.7 224 192C224 205.3 213.3 216 200 216H24C10.75 216 0 205.3 0 192C0 178.7 10.75 168 24 168H200zM0 320C0 306.7 10.75 296 24 296H200C213.3 296 224 306.7 224 320C224 333.3 213.3 344 200 344H24C10.75 344 0 333.3 0 320zM200 424C213.3 424 224 434.7 224 448C224 461.3 213.3 472 200 472H24C10.75 472 0 461.3 0 448C0 434.7 10.75 424 24 424H200zM288 192C288 178.7 298.7 168 312 168H488C501.3 168 512 178.7 512 192C512 205.3 501.3 216 488 216H312C298.7 216 288 205.3 288 192zM488 40C501.3 40 512 50.75 512 64C512 77.25 501.3 88 488 88H312C298.7 88 288 77.25 288 64C288 50.75 298.7 40 312 40H488zM288 320C288 306.7 298.7 296 312 296H488C501.3 296 512 306.7 512 320C512 333.3 501.3 344 488 344H312C298.7 344 288 333.3 288 320zM488 424C501.3 424 512 434.7 512 448C512 461.3 501.3 472 488 472H312C298.7 472 288 461.3 288 448C288 434.7 298.7 424 312 424H488z"></path></svg></div>
                                <div class="">Image</div></div>
                            <div class="">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
                                </svg>

                            </div></div></div></div>

                    {filedopen &&
                        <div class="px-6">
                            <div class="border-b border-slateStroke flex flex-wrap py-5 ">
                                <div class="w-1/3 text-body text-darkSlate01 text-md">Field title</div>
                                <div class="w-1/2 "><div class="w-full relative m-0 ">
                                    <div class="w-full">
                                        <input type="text" autocomplete="" placeholder="Enter title" class="input-mol  p-[0.5rem]   w-full text-darkSlate01 text-sm rounded focus:outline-none bg-[#f8fafc] focus:shadow-none border border-slate04 focus:border-slate01!rounded-none py-3 !text-body px-4  undefined" value="Mobile" />
                                    </div></div></div></div>
                            <div class="border-b border-slateStroke flex flex-wrap py-5 "><div class="w-1/3 text-body text-darkSlate01 ">Field type</div>
                                <div class="w-1/2 ">
                                    <div class="relative ">
                                        <button class="button-base w-full button-base-primary button-lg button-enabled">
                                            <input
                                                type="file"




                                                className="p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200  text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                                                // onChange={(event) => handleFileChange(event, index)}
                                                accept="image/*"
                                            />

                                            {/* <select
                                                color="text-darkSlate01" class="flex bg-gray-50 items-center   border-slateStroke cursor-pointer rounded  focus:outline-none focus:border-orange-400 p-[0.5rem]   w-full text-darkSlate01 text-sm    focus:shadow-none border border-slate04 focus:border-slate01!rounded-none py-3 !text-body px-4  undefined">
                                          
                                                <option value="">select</option>
                                                <option value="text">text</option>
                                                <option value="textarea">textarea</option>
                                                <option value="email">email</option>

                                               

                                            </select> */}


                                            {/* <span class="ml-3 !text-darkSlate02">text</span> */}
                                            {/* <span class="ml-2 transition-all duration-300 linear"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down text-darkSlate02" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                        <path fill="currentColor" d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"></path></svg>
                                                    </span> */}
                                        </button></div></div></div>

                            <div class="  flex flex-wrap pt-5 ">
                                <div class="w-1/3 text-body text-darkSlate01 ">Mark as required</div>
                                {/* <div class="w-1/3 text-body text-darkSlate01 ">Mark as filtered</div> */}
                                <input
                                    // className="mb-1"
                                    type="checkbox"
                                    id="mandatory"
                                    name="mandatory"

                                // checked={input.mandatory}
                                // onChange={handleInputChange}
                                />
                                {/* <div class="w-1/2 ">
                                    <div role="button" class="cursor-pointer w-8 h-4 transition rounded-full bg-orange-600 p-0.5 ">
                                        <div class="bg-white w-3 h-3 rounded-full transform translate-x-0 transition">
                                        </div></div></div> */}
                            </div>
                            <div class="  flex flex-wrap pt-5 ">
                                <div class="w-1/3 text-body text-darkSlate01 ">Mark as filtered</div>
                                {/* <div class="w-1/3 text-body text-darkSlate01 ">Mark as filtered</div> */}
                                {/* <div class="w-1/2 ">
                                    <div role="button" class="cursor-pointer w-8 h-4 transition rounded-full bg-orange-600 p-0.5 ">
                                        <div class="bg-white w-3 h-3 rounded-full transform translate-x-0 transition">
                                        </div></div></div> */}
                                <input

                                    type="checkbox"
                                    id="mandatory"
                                    name="mandatory"

                                // checked={input.mandatory}
                                // onChange={handleInputChange}
                                />
                            </div>


                            <div class="flex justify-end w-full pt-4 pb-0.5">
                                <div class="mr-4"></div><div class="">
                                    <button class=" flex w-full justify-center rounded-md bg-orange-600 px-3 py-2.5 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600
      
      ">Save</button>
                                </div></div></div>
                    }
                </div></div>
            </form>
        </div>
    )
}

export default Userformdup