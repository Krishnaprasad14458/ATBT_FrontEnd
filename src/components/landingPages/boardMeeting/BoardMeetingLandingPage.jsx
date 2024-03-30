import React, { useState, useEffect, useContext, } from 'react';
import '../LandingPageCommon.css';
import { NavLink, Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { BoardMeetingsDataContext } from '../../../contexts/boardmeetingsDataContext/boardmeetingsDataContext';
import axios from 'axios';
const BoardMeetingLandingPage = () => {
  const {
    getBoardMeetingbyId,
    boardmeetingsState: { boardmeetings },
  } = useContext(BoardMeetingsDataContext);
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  // For tabs active
  const getSingleProduct = async () => {
    try {
      const boardmeetingById = boardmeetings?.BoardMeetings?.find(
        (element) => element.id === +id
       );
       if (!boardmeetingById){
        const product = await getBoardMeetingbyId(id);
        setSingleProduct(product?.data?.BoardMeetings);
       } 
       else {
        setSingleProduct(boardmeetingById);
       }
     } catch (e) {
      console.error(e);
      throw e;
     }
  };
  useEffect(() => {
    getSingleProduct();
  }, [id]);
  // ---full screen
  let [customFormField, setCustomFormField] = useState();
  const userData = JSON.parse(localStorage.getItem('data'));
  const token = userData?.token;
  let response;
  useEffect(() => {
    axios
      .get(`https://atbtbeta.infozit.com/boardmeeting/list/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        // Handle the successful response
        response = res;
        console.log('response', response.data.image);

        setCustomFormField(response.data.customFieldsData);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  }, []);
  useEffect(() => {
    console.log('customFormField', customFormField);
  }, [customFormField]);
  return (
    <div className='container p-4 bg-[#f8fafc]'>
      <div className='flex justify-between my-2'>
        <p className='text-xl font-semibold'>Board Meeting Landing Page</p>
        <div className='flex justify-end gap-3 '>
          <Link to='/users'>
            <button
              type='submit'
              className='create-btn px-4  py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1'
            >
              Back
            </button>
          </Link>
        </div>
      </div>
      <div className='flex overflow-auto'>
        <NavLink
          to='task'
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
              ? 'cursor-pointer px-4 py-1 text-md font-semibold'
              : isActive
                ? 'border-b-2 border-orange-600 text-black cursor-pointer px-4 py-1 text-md font-semibold'
                : 'cursor-pointer px-4 py-1 text-md font-semibold'}>
          Tasks
        </NavLink>
        <NavLink
          to='documents'
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
              ? 'cursor-pointer px-4 py-1 text-md font-semibold'
              : isActive
                ? 'border-b-2 border-orange-600 text-black cursor-pointer px-4 py-1 text-md font-semibold'
                : 'cursor-p px-4 py-1 text-md font-semibold'}>
          Documents
        </NavLink>
        <NavLink
          to='.'
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
              ? 'cursor-pointer px-4 py-1 text-md font-semibold'
              : isActive
                ? 'border-b-2 border-orange-600 text-black cursor-pointer px-4 py-1 text-md font-semibold'
                : 'cursor-pointer px-4 py-1 text-md font-semibold'}>
          Overview
        </NavLink>
      </div>
      <hr />
      <Outlet />
    </div>
  );
};

export default BoardMeetingLandingPage;
