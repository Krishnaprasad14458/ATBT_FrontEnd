import React, {
  useState,

  useEffect,
  useContext,
} from 'react';
import '../LandingPageCommon.css';

import { NavLink, Link, Outlet, useParams, useLocation } from 'react-router-dom';

import { TeamsDataContext } from '../../../contexts/teamsDataContext/teamsDataContext';
import axios from 'axios';


const TeamsLandingPage = () => {
  const moduleName = "team"
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

        <NavLink
          to='task'
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
              ? 'cursor-pointer px-4 py-1 text-md font-semibold'
              : isActive
                ? 'border-b-2 border-orange-600 text-black cursor-pointer px-4 py-1 text-md font-semibold'
                : 'cursor-pointer px-4 py-1 text-md font-semibold'
          }
        >
          Tasks
        </NavLink>
        <NavLink
          to='boardmeetings'
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
              ? 'cursor-pointer px-4 py-1 text-md font-semibold'
              : isActive
                ? 'border-b-2 border-orange-600 text-black cursor-pointer px-4 py-1 text-md font-semibold'
                : 'cursor-pointer px-4 py-1 text-md font-semibold'
          }
        >
          Board Meetings
        </NavLink>
        <NavLink
          to='documents'
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
              ? 'cursor-pointer px-4 py-1 text-md font-semibold'
              : isActive
                ? 'border-b-2 border-orange-600 text-black cursor-pointer px-4 py-1 text-md font-semibold'
                : 'cursor-p px-4 py-1 text-md font-semibold'
          }
        >
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
                : 'cursor-pointer px-4 py-1 text-md font-semibold'
          }
        >
          Overview
        </NavLink>
      </div>
      <hr />
      <Outlet context={moduleName} />
    </div>
  );
};

export default TeamsLandingPage;
