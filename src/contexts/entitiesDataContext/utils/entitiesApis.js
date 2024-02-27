import axios from 'axios';
import { apiUrl } from "../../../utils/constants";
import { toast } from 'react-toastify';
const userData = JSON.parse(localStorage.getItem("data"))
const token = userData?.token
export const getAllEntities = async () => {
    const url = `${apiUrl}/entity/list`;
    return axios.get(url, {
        headers: { authorization: token },
    });
};

export const getEntities = async (page, pageSize, sortBy, search) => {
    const url = `${apiUrl}/entity/list?page=${page ?? null}&pageSize=${pageSize ?? null}&sortBy=${sortBy ?? null}&search=${search ?? null}`;
    return axios.get(url, {
        headers: { authorization: token },
    });
};

export const getEntityById = async (id) => {
    const url = `${apiUrl}/entity/list/${id}`;
    return axios.get(url, {
        headers: { authorization: token },
    });
};

export const deleteEntity = async (id) => {
    const url = `${apiUrl}/entity/delete/${id}`
    return toast.promise(
        axios.delete(url, {
            headers: { authorization: token },
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

export const createEntity = async (entityData) => {
    const url = `${apiUrl}/entity/add`
    return toast.promise(
        axios.post(url, entityData, {
            headers: { authorization: token },
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

