import axios from 'axios';
import { apiUrl } from "../../../utils/constants";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const userData = JSON.parse(localStorage.getItem("data"))
const localToken = userData?.token
console.log(userData?.token, "bla")
export const getAllUsers = async (token) => {
    console.log(`${token} token is present in getAllUsers api`);
    const url = `${apiUrl}/user/list`;
    return axios.post(url, {}, {
        headers: { authorization: token || localToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo" },
    });
};

export const getDashboardUsers = async (page, pageSize, sortBy, search, token) => {
    console.log(`${token} token is present in getDashboardUsers api`);
    const url = `${apiUrl}/user/list?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&search=${search}`;
    return axios.post(url, {}, {
        headers: { authorization: token || localToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo" },
    });
};

export const getSettingsUsers = async (page, pageSize, sortBy, search, filters, token) => {
    console.log(`${token} token is present in getSettingsUsers api`);
    const url = `${apiUrl}/user/list?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&search=${search}`;
    return axios.post(url, {
        filters: {
            ...filters
        }
    }, {
        headers: { authorization: token || localToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo" },
    });
};

export const getUserById = async (id, token) => {
    console.log(`${token} token is present in getUserById api`);
    const url = `${apiUrl}/user/list/${id}`;
    return axios.get(url, {
        headers: { authorization: token || localToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo" },
    });
};

export const createUser = async (userData, token) => {
    console.log(`${token} token is present in createUser api`);
    const url = `${apiUrl}/user/create-user`;
    return await toast.promise(
        axios.post(url, userData, {
            headers: {
                authorization: token || localToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo",
                'Content-Type': 'multipart/form-data'
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

export const updateUser = async (userData, id, token) => {
    console.log(`${token} token is present in updateUser api`);
    const url = `${apiUrl}/user/update/${id}`;
    return await toast.promise(
        axios.put(url, userData, {
            headers: {
                authorization: token || localToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo",
                'Content-Type': 'multipart/form-data'
            }
        }),
        {
            pending: 'Updating...',
            success: {
                render({ data }) {
                    return `User updated`
                }
            },
            error: 'Check user details 🤯',
        },
    )
}

export const deleteUser = async (id, token) => {
    console.log(`${token} token is present in deleteUser api`);
    const url = `${apiUrl}/user/delete-user/${id}`;
    return await toast.promise(
        axios.delete(url, {
            headers: {
                authorization: token || localToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo",
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

export const toggleUser = async (id, data, token) => {
    console.log(`${token} token is present in deleteUser api`);
    const url = `${apiUrl}/toggle/${id}`
    // const confirmed = await Swal.fire({
    //     title: 'Are you sure?',
    //     text: 'Do you want to toggle your online status?',
    //     icon: 'question',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes, toggle it!',
    //     confirmButtonTextColor: "pink"
    // });
    return axios.put(url, { ...data }, {
        headers: { authorization: token || localToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo" },
    });
}
