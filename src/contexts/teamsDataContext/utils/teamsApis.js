import axios from 'axios';
import { apiUrl } from "../../../utils/constants";
import { toast } from 'react-toastify';
const userData = JSON.parse(localStorage.getItem("data"))
const localToken = userData?.token
export const getAllTeams = async (token) => {
    const url = `${apiUrl}/team/list`;
    return axios.post(url, {}, {
        headers: { authorization: token || localToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo" },
    });
};

export const getTeams = async (page, pageSize, sortBy, search, token, filters) => {
    const url = `${apiUrl}/team/list?page=${page ?? null}&pageSize=${pageSize ?? null}&sortBy=${sortBy ?? null}&search=${search ?? null}`;
    return axios.post(url, {
        filters: {
            ...filters
        }
    }, {
        headers: { authorization: token || localToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo" },
    });
};

export const getTeamById = async (id, token) => {
    const url = `${apiUrl}/team/list/${id}`;
    return axios.get(url, {
        headers: { authorization: token || localToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo" },
    });
};

export const deleteTeam = async (id, token) => {
    const url = `${apiUrl}/team/delete/${id}`
    return toast.promise(
        axios.delete(url, {
            headers: { authorization: token || localToken },
        }),
        {
            pending: 'Deleting team',
            success: {
                render({ data }) {
                    return 'team Deleted';
                },
            },
            error: 'Unable to delete team 🤯',
        },
    );
};

export const createTeam = async (teamData, token) => {
    const url = `${apiUrl}/team/add`
    return toast.promise(
        axios.post(url, teamData, {
            headers: { authorization: token || localToken },
        }),
        {
            pending: 'verifying data',
            success: {
                render(data) {
                    return `Team created`
                }
            },
            error: 'Error in creating Team 🤯',
        },
    );
};

export const updateTeam = async (teamData, id, token) => {
    console.log(`${token} token is present in updateTeam api`);
    const url = `${apiUrl}/team/update/${id}`;
    return await toast.promise(
        axios.put(url, teamData, {
            headers: {
                authorization: token || localToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo",
                'Content-Type': 'multipart/form-data'
            }
        }),
        {
            pending: 'Updating Team...',
            success: {
                render({ data }) {
                    return `Team updated`
                }
            },
            error: 'Check team details 🤯',
        },
    )
}