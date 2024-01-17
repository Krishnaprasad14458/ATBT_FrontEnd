
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
// import { Menu, Transition } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
// import { Link } from 'react-router-dom'
import { ifStatement } from '@babel/types';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function Tasks() {


  return (
    <div className=' p-2 bg-[#f8fafc] h-screen'>
      <h1 className='m-3 font-semibold text-lg'>Board Metting</h1>
      <Outlet/>
    </div>
  );
}

export default Tasks;
