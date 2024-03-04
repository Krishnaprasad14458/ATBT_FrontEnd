import axios from 'axios';
import { apiUrl } from "../../../utils/constants";
import { toast } from 'react-toastify';
const userData = JSON.parse(localStorage.getItem("data"))
const localToken = userData?.token
export const getAllEntities = async (token) => {
    const url = `${apiUrl}/entity/list`;
    return axios.get(url, {
        headers: { authorization: token || localToken },
    });
};

export const getEntities = async (page, pageSize, sortBy, search, token) => {
    const url = `${apiUrl}/entity/list?page=${page ?? null}&pageSize=${pageSize ?? null}&sortBy=${sortBy ?? null}&search=${search ?? null}`;
    return axios.get(url, {
        headers: { authorization: token || localToken },
    });
};

export const getEntityById = async (id, token) => {
    const url = `${apiUrl}/entity/list/${id}`;
    return axios.get(url, {
        headers: { authorization: token || localToken },
    });
};

export const deleteEntity = async (id, token) => {
    const url = `${apiUrl}/entity/delete/${id}`
    return toast.promise(
        axios.delete(url, {
            headers: { authorization: token || localToken },
        }),
        {
            pending: 'Deleting entity',
            success: {
                render({ data }) {
                    return 'entity Deleted';
                },
            },
            error: 'Unable to delete entity 🤯',
        },
    );
};

export const createEntity = async (entityData, token) => {
    const url = `${apiUrl}/entity/add`
    return toast.promise(
        axios.post(url, entityData, {
            headers: { authorization: token || localToken },
        }),
        {
            pending: 'verifying data',
            success: {
                render(data) {
                    return `Entity created`
                }
            },
            error: 'Error in creating Entity 🤯',
        },
    );
};

