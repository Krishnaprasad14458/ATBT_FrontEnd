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
import { Dialog, Transition, Menu } from '@headlessui/react';
import defprop from '../../../Images/defprof.svg';
import { Link, Outlet, useParams } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import useInitializePerPage from '../../../hooks/initializePerPage/useInitializePerPage';
import useDebounce from '../../../hooks/debounce/useDebounce';
import { EntitiesDataContext } from '../../../contexts/entitiesDataContext/entitiesDataContext';
import axios from 'axios';
import BoardMeetings from '../../pages/boardMeetings/BoardMeetings';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Boardmeeting = () => {

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
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    // for calendar
    const localizer = momentLocalizer(moment);
    const [open, setOpen] = useState(false);

    const cancelButtonRef = useRef(null);

    const [events, setEvents] = useState([
        {
            title: 'Event 1',
            start: new Date(2024, 0, 17, 10, 0),
            end: new Date(2024, 0, 17, 12, 0),
        },
    ]);
    const [newtask, setNewTask] = useState('');
    const [newtaskStartDate, setnewtaskStartDate] = useState('');

    const [newtaskEndDate, setnewtaskEndDate] = useState('');

    const handleSelect = ({ start, end }) => {
        setOpen(true);
        setnewtaskStartDate(start);
        setnewtaskEndDate(end);
        setNewTask('');
    };

    const handleSave = () => {
        setOpen(false);

        if (newtask) {
            const newEvent = {
                title: newtask,
                start: newtaskStartDate,
                end: newtaskEndDate,
            };
            setEvents([...events, newEvent]);
            setNewTask('');
        }
    };
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


    return (
        <div>
            <div className='flex justify-end my-2'>
                <Link to='/boardmeetings/new'>
                    <button className=' ms-2 create-btn mt-1 inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  text-orange-foreground shadow hover:bg-orange/90 h-9 px-3 py-1 shrink-0 bg-orange-600 text-white gap-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='w-5 h-5 '
                        >
                            <path d='M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z' />
                        </svg>
                        Create Board Meeting
                    </button></Link>
            </div>
            <BoardMeetings />
        </div>
    )
}

export default Boardmeeting