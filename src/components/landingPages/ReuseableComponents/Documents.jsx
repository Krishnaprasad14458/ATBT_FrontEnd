import React, { useState, Fragment, useRef, useEffect, useContext } from 'react';
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
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
const Documents = () => {
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
            <div className='mt-4'>Documents</div>
        </div>
    )
}

export default Documents