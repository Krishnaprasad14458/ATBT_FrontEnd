import axios from "axios";
import { apiUrl } from "../../../utils/constants";
import { toast } from "react-toastify";
const userData = JSON.parse(localStorage.getItem("data"));
const localToken = userData?.token;
export const getAllBoardMeetings = async (token) => {
  const url = `${apiUrl}/boardmeeting/list`;
  return axios.post(
    url,
    {},
    {
      headers: {
        authorization:
          token ||
          localToken ||
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo",
      },
    }
  );
};

export const getBoardMeetings = async (
  page,
  pageSize,
  sortBy,
  search,
  token,
  filters
) => {
  const url = `${apiUrl}/boardmeeting/list?page=${page ?? null}&pageSize=${
    pageSize ?? null
  }&sortBy=${sortBy ?? null}&search=${search ?? null}`;
  return axios.post(
    url,
    {
      filters: {
        ...filters,
      },
    },
    {
      headers: {
        authorization:
          token ||
          localToken ||
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo",
      },
    }
  );
};

export const getBoardMeetingById = async (id, token) => {
  const url = `${apiUrl}/boardmeeting/list/${id}`;
  return axios.get(url, {
    headers: {
      authorization:
        token ||
        localToken ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo",
    },
  });
};

export const deleteBoardMeeting = async (id, token) => {
  const url = `${apiUrl}/boardmeeting/delete/${id}`;
  return toast.promise(
    axios.delete(url, {
      headers: { authorization: token || localToken },
    }),
    {
      pending: "Deleting boardMeeting",
      success: {
        render({ data }) {
          return "boardMeeting Deleted";
        },
      },
      error: "Unable to delete boardMeeting 🤯",
    }
  );
};

export const createBoardMeeting = async (
  boardmeetingData,
  boardMeetingFor,
  boardMeetingForID,
  token
) => {
  const url = `${apiUrl}/boardmeeting/add?${boardMeetingFor}=${boardMeetingForID}`;
  return toast.promise(
    axios.post(url, boardmeetingData, {
      headers: { authorization: token || localToken },
    }),
    {
      pending: "verifying data",
      success: {
        render(data) {
          return `BoardMeeting created`;
        },
      },
      error: "Error in creating BoardMeeting 🤯",
    }
  );
};

export const updateBoardMeeting = async (boardmeetingData, id, token) => {
  console.log(`${token} token is present in updateBoardMeeting api`);
  const url = `${apiUrl}/boardmeeting/update/${id}`;
  return await toast.promise(
    axios.put(url, boardmeetingData, {
      headers: {
        authorization:
          token ||
          localToken ||
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo",
        "Content-Type": "multipart/form-data",
      },
    }),
    {
      pending: "Updating BoardMeeting...",
      success: {
        render({ data }) {
          return `BoardMeeting updated`;
        },
      },
      error: "Check BoardMeeting details 🤯",
    }
  );
};
