import React, {
    createContext,
    useEffect,
    useReducer,
  } from "react";
  import userDataReducer from "../reducers/userDataReducer";
  import axios from "axios";
  import { apiUrl } from "../utils/constants";
import { toast } from "react-toastify";

  export const UserDataContext = createContext();

  const localStorageData = JSON.parse(localStorage.getItem("data"));

  console.log(localStorageData?.token,"token")


  const UserDataProvider = ({ children }) => {
    const initialState = {
      users:[],
      pagination:{
        paginatedUsers:[],
        currentPage:1,
        search: "",
        totalPages: null,
        loading: false,
      }
    };
  
    const [usersState, usersDispatch] = useReducer(
      userDataReducer,
      initialState
    );

    console.log(usersState)

    const getAllUsers = async () => {
      const { status, data: {users} } = await axios.get(`${apiUrl}/user/list`);
      console.log(users,status)
      if (status === 200) {
        usersDispatch({
          type: "SET_USERS_DATA",
          payload: {
            data:users,
          }
        })
      }
    }

    const getPaginatedUsersData = async () => {
      try {
        usersDispatch({
          type: "SET_LOADING"
        })
        const { status, data: {users} } = await axios.get(`${apiUrl}/user/list?page=${usersState.pagination.currentPage}&pageSize=5&sortBy=userName&search=${usersState.pagination.search}`);
        console.log(users)
        if (status === 200) {
          usersDispatch({
            type: "SET_PAGINATED_USERS",
            payload: {
              data:users,
              currentPage: 1,
            }
          })
          usersDispatch({
            type: "SET_LOADING"
          })
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    const getUser = async (userID) => {
      try {
        const { status, data } = await axios.get(`/api/userdata/${userID}`);
        if (status === 200) {
          return data;
        }
      } catch (e) {
        console.error(e);
      }
    };

    const createUser = async (userData) => {
      console.log(userData)
      try {
        const { data, status } = await toast.promise(
          axios.post(`${apiUrl}/admin/create-user`, {...userData}, {
            headers: {
              authorization: localStorageData?.token,
            }
          }),
          {
            pending: 'Creating User...',
            success: {
              render({ data}) {
                return `user created`
              }
            },
            error: 'Check user details 🤯',
          },
        )
        console.log(data,status)
        if (status === 201) {
          getPaginatedUsersData()
          getAllUsers()
        }
      }
      catch (e) {
        console.error(e);
      }
    };
  
    useEffect(() => {
      // getUsersData();
      getPaginatedUsersData();
      // eslint-disable-next-line
    }, [usersDispatch,usersState?.pagination?.currentPage,usersState?.pagination?.search]);
    useEffect(() => {
      getAllUsers()
      // eslint-disable-next-line
    }, []);
  
    return (
      <UserDataContext.Provider
        value={{
          usersState,
          usersDispatch,
          createUser,
          getUser,
          getPaginatedUsersData,
        }}
      >
        {children}
      </UserDataContext.Provider>
    );
  };
  
  export default UserDataProvider;