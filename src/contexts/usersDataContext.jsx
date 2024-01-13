import React, {
    createContext,
    useEffect,
    useReducer,
  } from "react";
  import userDataReducer from "../reducers/userDataReducer";
  import axios from "axios";

  export const UserDataContext = createContext();

  const apiToken = process.env.REACT_APP_API_TOKEN;


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

    const getUsersData = async () => {
      try {
        const { status, data } = await axios.get("https://www.atbtbeta.teksacademy.com/userdata",{
          headers:{ authorization: apiToken },
        });
        if (status === 201) {
          usersDispatch({
            type: "SET_USERS_DATA",
            payload: data,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getPaginatedUsersData = async (pageNo=1,search="") => {
      try {
        usersDispatch({
          type: "SET_LOADING"
        })
        const { status, data } = await axios.post(`https://www.atbtbeta.teksacademy.com/userdata?page=${pageNo}&search=${search}`);
        if (status === 201) {
          usersDispatch({
            type: "SET_PAGINATED_USERS",
            payload: data
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
  
    useEffect(() => {
      getUsersData();
      getPaginatedUsersData(usersState?.pagination?.currentPage,usersState?.pagination?.search);
      // eslint-disable-next-line
    }, [usersDispatch,usersState?.pagination?.currentPage,usersState?.pagination?.search]);
  
    return (
      <UserDataContext.Provider
        value={{
          usersState,
          usersDispatch,
          getUsersData,
          getUser,
          getPaginatedUsersData,
        }}
      >
        {children}
      </UserDataContext.Provider>
    );
  };
  
  export default UserDataProvider;