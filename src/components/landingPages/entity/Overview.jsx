import React, {
    useState,
    Fragment,
    useRef,
    useEffect,
    useContext,
} from 'react';
import '../LandingPageCommon.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import defprop from '../../../Images/defprof.svg';
import { Link, Outlet, useParams } from 'react-router-dom';

import { EntitiesDataContext } from '../../../contexts/entitiesDataContext/entitiesDataContext';
import axios from 'axios';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
const Overview = () => {
    const {
        getEntitybyId,
        entitiesState: { entities },
    } = useContext(EntitiesDataContext);
    const { id } = useParams();
    // console.log()
    const [singleProduct, setSingleProduct] = useState({});
    // For tabs active
    const getSingleProduct = async () => {
        try {
            const entityById = entities?.Entites?.find(
                (element) => element.id === +id
            );
            if (!entityById) {
                const product = await getEntitybyId(id);
                setSingleProduct(product?.data?.Entites);
            } else {
                setSingleProduct(entityById);
            }
        } catch (e) {
            console.error(e);
            throw e;
        }
    };
    useEffect(() => {
        getSingleProduct();
    }, [id]);
   
    // for calendar

   
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
            .get(`https://atbtbeta.infozit.com/entity/list/${id}`, {
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
        <div className=' flex justify-center mt-5'>
            <div className=' w-full md:w-full  lg:w-11/12 xl:11/12 shadow-md border-2 rounded-md bg-[#f8fafc] px-4 pb-4 pt-1'>
                <div className='flex justify-end '>
                    <Link
                        to={`../${id}/edit`}
                        relative='path'
                        className='text-sm font-medium transition-colors  focus-visible:ring-1 focus-visible:ring-ring  text-gray-900 pt-1'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='w-5 h-5 text-gray-900'
                        >
                            <path d='m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z' />
                        </svg>
                    </Link></div>
                {customFormField &&
                    customFormField.length > 0 &&
                    customFormField.map((item) => {
                        return (
                            <div className='relative'>
                                {/* predefined fields*/}
                                {item.type === 'file' && item.inputname === 'image' && item.field === 'predefined' && (


                                    <div className=' h-10  hidden sm:block'>
                                        {item.value ? (
                                            <img
                                                src={predefinedImage}
                                                name='EntityPhoto'
                                                alt='Selected User Photo'
                                                className='rounded-lg w-10 h-10 mr-4 '
                                            />
                                        ) : (
                                            <img
                                                className='w-10 h-10 rounded-lg mr-4 '
                                                src={defprop}
                                                alt='default image'
                                            />
                                        )}
                                    </div>
                                )}
                                {item.type === 'text' && item.inputname === 'name' && item.field === 'predefined' && (

                                    <p className='text-sm font-black text-gray-800 md:mt-2 ml-2 md:absolute md:left-12'>
                                        {item.value.toUpperCase()}
                                    </p>

                                )}
                                {item.type === 'textarea' &&
                                    item.inputname == 'description' &&
                                    item.field == 'predefined' && (
                                        <div className='h-28 overflow-auto border border-1 border-gray-200 rounded-md p-2 bg-[#f8fafc] text-sm w-full mt-4'>
                                            {item.value}
                                        </div>
                                    )}
                     
                                {/* customfields */}
                                <div className='mt-2'>
                                    {item.type === 'text' && item.field == 'custom' && (
                                        <div className='my-2 mx-2 '>
                                            {item.value && item.value.length > 0 && (
                                                <p className='flex  gap-2'>
                                                    <span className='w-2/6 truncate text-[#727a85] '>
                                                        {item.label.charAt(0).toUpperCase() +
                                                            item.label.slice(1)}
                                                    </span>
                                                    <span className=' flex gap-2 w-4/6'>
                                                        <span> : </span>{' '}
                                                        <span className='text-md font-[600]  '>
                                                            {item.value}
                                                        </span>
                                                    </span>
                                                </p>
                                            )}
                                            {item.value && <hr className='mt-2' />}{' '}
                                        </div>
                                    )}
                                    {item.type === 'email' && item.field == 'custom' && (
                                        <div className='my-2 mx-2 '>
                                            {item.value && item.value.length > 0 && (
                                                <p className='flex  gap-2'>
                                                    <span className='w-2/6 truncate text-[#727a85] '>
                                                        {item.label.charAt(0).toUpperCase() +
                                                            item.label.slice(1)}
                                                    </span>
                                                    <span className='  flex gap-2 w-4/6 '>
                                                        <span> : </span>{' '}
                                                        <span className='text-md font-[600] break-all'>
                                                            {item.value}
                                                        </span>
                                                    </span>
                                                </p>
                                            )}
                                            {item.value && <hr className='mt-2' />}
                                        </div>
                                    )}

                                    {item.type === 'phonenumber' &&
                                        item.field == 'custom' && (
                                            <div className='my-2 mx-2  flex-wrap'>
                                                {item.value && item.value.length > 0 && (
                                                    <p className='flex  gap-2'>
                                                        <span className='w-2/6 truncate text-[#727a85] '>
                                                            {item.label.charAt(0).toUpperCase() +
                                                                item.label.slice(1)}
                                                        </span>
                                                        <span className='  flex gap-2 w-4/6'>
                                                            <span> : </span>{' '}
                                                            <span className='text-md font-[600] '>
                                                                {item.value.slice(0, 3)}&nbsp;
                                                                {item.value.slice(3, 6)}&nbsp;
                                                                {item.value.slice(6, 10)}
                                                            </span>
                                                        </span>
                                                    </p>
                                                )}
                                                {item.value && <hr className='mt-2' />}{' '}
                                            </div>
                                        )}
                                    {item.type === 'number' && item.field == 'custom' && (
                                        <div className='my-2 mx-2  flex-wrap'>
                                            {item.value && item.value.length > 0 && (
                                                <p className='flex  gap-2'>
                                                    <span className='w-2/6 truncate text-[#727a85] '>
                                                        {item.label.charAt(0).toUpperCase() +
                                                            item.label.slice(1)}
                                                    </span>
                                                    <span className='  flex gap-2 w-4/6'>
                                                        <span> : </span>{' '}
                                                        <span className='text-md font-[600]  break-all'>
                                                            {item.value}
                                                        </span>
                                                    </span>
                                                </p>
                                            )}
                                            {item.value && <hr className='mt-2' />}{' '}
                                        </div>
                                    )}
                                    {item.type === 'textarea' && item.field == 'custom' && (
                                        <div className='my-2 mx-2  '>
                                            {item.value && item.value.length > 0 && (
                                                <p className='flex  gap-2'>
                                                    <span className='w-2/6 text-[#727a85] truncate '>
                                                        {item.label.charAt(0).toUpperCase() +
                                                            item.label.slice(1)}
                                                    </span>
                                                    <span className=' flex gap-2 w-4/6'>
                                                        <span> : </span>{' '}
                                                        <span className='text-md font-[600]  '>
                                                            {item.value}
                                                        </span>
                                                    </span>
                                                </p>
                                            )}
                                            {item.value && <hr className='mt-2' />}{' '}
                                        </div>
                                    )}
                                    {item.type === 'date' &&
                                        item.field === 'custom' &&
                                        (() => {
                                            let date = new Date(item.value);
                                            const day = date.getUTCDate();
                                            const monthIndex = date.getUTCMonth();
                                            const year = date.getUTCFullYear();

                                            const monthAbbreviations = [
                                                'Jan',
                                                'Feb',
                                                'Mar',
                                                'Apr',
                                                'May',
                                                'Jun',
                                                'Jul',
                                                'Aug',
                                                'Sep',
                                                'Oct',
                                                'Nov',
                                                'Dec',
                                            ];

                                            // Formatting the date
                                            date = `${day < 10 ? '0' : ''}${day}-${monthAbbreviations[monthIndex]
                                                }-${year}`;

                                            return (
                                                <div className='my-2 mx-2'>
                                                    {item.value && item.value.length > 0 && (
                                                        <p className='flex gap-2'>
                                                            <span className='w-2/6 text-[#727a85] truncate'>
                                                                {item.label.charAt(0).toUpperCase() +
                                                                    item.label.slice(1)}
                                                            </span>
                                                            <span className='flex gap-2 w-4/6'>
                                                                <span> : </span>{' '}
                                                                <span className='text-md font-[600]'>
                                                                    {date ? date : 'No Date'}
                                                                </span>
                                                            </span>
                                                        </p>
                                                    )}
                                                    {item.value && <hr className='mt-2' />}
                                                </div>
                                            );
                                        })()}

                                    {item.type === 'select' && item.field == 'custom' && (
                                        <div className='my-2 mx-2 '>
                                            {item.value && item.value.length > 0 && (
                                                <p className='flex  gap-2'>
                                                    <span className='w-2/6 text-[#727a85] truncate  '>
                                                        {item.label.charAt(0).toUpperCase() +
                                                            item.label.slice(1)}
                                                    </span>
                                                    <span className='  flex gap-2 w-4/6'>
                                                        <span> : </span>{' '}
                                                        <span className='text-md font-[600] '>
                                                            {item.value}
                                                        </span>
                                                    </span>
                                                </p>
                                            )}
                                            {item.value && <hr className='mt-2' />}{' '}
                                        </div>
                                    )}
                                    {item.type === 'multiselect' &&
                                        item.field == 'custom' && (
                                            <div className='my-2 mx-2 '>
                                                {item.value && item.value.length > 0 && (
                                                    <p className='flex  gap-2'>
                                                        <span className='w-2/6 text-[#727a85]  truncate '>
                                                            {item.label.charAt(0).toUpperCase() +
                                                                item.label.slice(1)}
                                                        </span>
                                                        <span className='  flex gap-2 w-4/6'>
                                                            <span> : </span>{' '}
                                                            <span className='text-md font-[600] '>
                                                                {item.value.join(', ')}
                                                            </span>
                                                        </span>
                                                    </p>
                                                )}
                                                {item.value.join(', ') && <hr className='mt-2' />}{' '}
                                            </div>
                                        )}
                                    {item.type === 'range' && item.field == 'custom' && (
                                        <div className='my-2 mx-2 '>
                                            {item.value && item.value.length > 0 && (
                                                <p className='flex  gap-2'>
                                                    <span className='w-2/6 text-[#727a85] truncate '>
                                                        {item.label.charAt(0).toUpperCase() +
                                                            item.label.slice(1)}
                                                    </span>
                                                    <span className='  flex gap-2 w-4/6'>
                                                        <span> : </span>{' '}
                                                        <span className='text-md font-[600] '>
                                                            {item.value}
                                                        </span>
                                                    </span>
                                                </p>
                                            )}
                                            {item.value && <hr className='mt-2' />}{' '}
                                        </div>
                                    )}
                                    {item.type === 'time' && item.field == 'custom' && (
                                        <div className='my-2 mx-2 '>
                                            {item.value && item.value.length > 0 && (
                                                <p className='flex gap-2'>
                                                    <span className='w-2/6 text-[#727a85] truncate  '>
                                                        {item.label.charAt(0).toUpperCase() +
                                                            item.label.slice(1)}
                                                    </span>
                                                    <span className='  flex gap-2 w-4/6'>
                                                        <span> : </span>{' '}
                                                        <span className='text-md font-[600] '>
                                                            {formatTime(item.value)}
                                                        </span>
                                                    </span>
                                                </p>
                                            )}
                                            {item.value && <hr className='mt-2' />}{' '}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
            </div>

        </div>

    )
}

export default Overview