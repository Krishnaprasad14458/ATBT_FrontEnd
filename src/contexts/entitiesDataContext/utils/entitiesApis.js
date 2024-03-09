import axios from 'axios';
import { apiUrl } from "../../../utils/constants";
import { toast } from 'react-toastify';
const userData = JSON.parse(localStorage.getItem("data"))
const localToken = userData?.token
export const getAllEntities = async (token) => {
    const url = `${apiUrl}/entity/list`;
    return axios.post(url, {}, {
        headers: { authorization: token || localToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo" },
    });
};

export const getEntities = async (page, pageSize, sortBy, search, token, filters) => {
    const url = `${apiUrl}/entity/list?page=${page ?? null}&pageSize=${pageSize ?? null}&sortBy=${sortBy ?? null}&search=${search ?? null}`;
    return axios.post(url, {
        filters: {
            ...filters
        }
    }, {
        headers: { authorization: token || localToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo" },
    });
};

export const getEntityById = async (id, token) => {
    const url = `${apiUrl}/entity/list/${id}`;
    return axios.get(url, {
        headers: { authorization: token || localToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo" },
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

export const updateEntity = async (entityData, id, token) => {
    console.log(`${token} token is present in updateEntity api`);
    const url = `${apiUrl}/entity/update/${id}`;
    return await toast.promise(
        axios.put(url, entityData, {
            headers: {
                authorization: token || localToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo",
                'Content-Type': 'multipart/form-data'
            }
        }),
        {
            pending: 'Updating Entity...',
            success: {
                render({ data }) {
                    return `Entity updated`
                }
            },
            error: 'Check entity details 🤯',
        },
    )
}