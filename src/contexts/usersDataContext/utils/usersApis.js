import axios from 'axios';
import { apiUrl } from "../../../utils/constants";
import { toast } from 'react-toastify';

export const getAllUsers = async () => {
    const url = `${apiUrl}/user/list`;
    return axios.get(url);
};

export const getPaginatedUsers = async (page, pageSize, sortBy, search) => {
    const url = `${apiUrl}/user/list?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&search=${search}`;
    return axios.get(url);
};

export const getUserById = async (id) => {
    const url = `${apiUrl}/user/list/${id}`;
    return axios.get(url);
};

export const createUser = async (userData, token) => {
    const url = `${apiUrl}/admin/create-user`;
    // console.log(localStorageData?.token)
    return await toast.promise(
        axios.post(url, { ...userData }, {
            headers: {
                authorization: token,
            }
        }),
        {
            pending: 'Creating User...',
            success: {
                render({ data }) {
                    return `user created`
                }
            },
            error: 'Check user details 🤯',
        },
    )
}

export const deleteUser = async (id, token) => {
    const url = `${apiUrl}/admin/delete-user/${id}`;
    return await toast.promise(
        axios.delete(url, {
            headers: {
                authorization: token,
            }
        }),
        {
            pending: 'Deleting User',
            success: {
                render({ data }) {
                    return `user Deleted`
                }
            },
            error: 'Unable to delete user 🤯',
        },
    )
}
