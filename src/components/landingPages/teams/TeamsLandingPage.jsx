import React, {
  useState,

  useEffect,
  useContext,
} from 'react';
import '../LandingPageCommon.css';

import { Link, Outlet, useParams, useLocation } from 'react-router-dom';

import { TeamsDataContext } from '../../../contexts/teamsDataContext/teamsDataContext';
import axios from 'axios';


const TeamsLandingPage = () => {
  const {
    getTeambyId,
    teamsState: { teams },
  } = useContext(TeamsDataContext);
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});

  // For tabs active
  const getSingleProduct = async () => {
    try {
      const teamById = teams?.Teams?.find((element) => element.id === +id);
      if (!teamById) {
        const product = await getTeambyId(id);
        setSingleProduct(product?.data?.Teams);
      } else {
        setSingleProduct(teamById);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, [id]);
  // for active tabs
  const location = useLocation()
  const currentURL = location.pathname.split("/")
  console.log("currentURL", currentURL)
  const [activeTab, setActiveTab] = useState(currentURL[3]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  //  for active tabs close

  // ----toggleDrawer-------
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  // -------full screen----
  const [expand, setExpand] = useState(false);

  let [customFormField, setCustomFormField] = useState();
  const userData = JSON.parse(localStorage.getItem('data'));
  const token = userData?.token;
  let response;
  let [predefinedImage, setPredefinedImage] = useState('');
  useEffect(() => {
    axios
      .get(`https://atbtbeta.infozit.com/team/list/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        // Handle the successful response
        response = res;
        console.log('response', response.data.image);
        setPredefinedImage(response.data.image);
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

  // to set the time in 12hours
  function formatTime(timeString) {
    // Splitting the timeString to extract hours and minutes
    const [hourStr, minuteStr] = timeString.split(':');

    // Parsing hours and minutes as integers
    const hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    // Checking if hours and minutes are valid numbers
    if (isNaN(hours) || isNaN(minutes)) {
      return 'Invalid time';
    }

    // Converting hours to 12-hour format and determining AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Handles midnight
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Ensures minutes are two digits

    // Constructing the formatted time string
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    return formattedTime;
  }
  return (
    <div className='container p-4 bg-[#f8fafc]'>
      <div className='flex justify-between my-2'>
        <p className='text-xl font-semibold'>Teams Landing Page</p>
        <div className='flex justify-end gap-3 '>
          <Link to='/teams'>
            <button
              type='submit'
              className='create-btn px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1'
            >
              Back
            </button>
          </Link>
        </div>
      </div>
      <div className='flex overflow-auto'>

        <Link to={`task`} onClick={() => handleTabClick('task')}>
          <div
            className={`cursor-pointer px-5 py-1 text-md font-semibold  ${activeTab === 'task' ? 'border-b-2 border-orange-600 text-black' : ''
              }`}>
            <p> Tasks</p>
          </div>
        </Link>
        <Link to={`boardmeetings`} onClick={() => handleTabClick('boardmeetings')}>
          <div
            className={`cursor-pointer px-5 py-1 text-md font-semibold  ${activeTab === 'boardmeetings' ? 'border-b-2 border-orange-600 text-black' : ''
              }`}>
            <p>Board Meetings</p>
          </div>
        </Link>
        <Link to={`documents`} onClick={() => handleTabClick('documents')}>
          <div className={`cursor-pointer px-5 py-1 text-md font-semibold  ${activeTab === 'documents' ? 'border-b-2 border-orange-600 text-black' : ''}`}>
            <p>Documents</p>
          </div>
        </Link>
        <Link to={`overview`}
          onClick={() => handleTabClick('overview')}>
          <div
            className={`cursor-pointer px-1 py-1 text-md font-semibold  ${activeTab === 'overview' ? 'border-b-2 border-orange-600 text-black' : ''
              }`}>
            <p> Overview</p>
          </div>
        </Link>
      </div>
      <hr/>
  <Outlet/>
  </div>
  );
};

export default TeamsLandingPage;
