import React, {
    createContext,
    useEffect,
    useReducer,
  } from "react";
  import userDataReducer from "../reducers/userDataReducer";
  import axios from "axios";

  export const UserDataContext = createContext();


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

    const getPaginatedUsersData = async (pageNo=1,search="") => {
      try {
        usersDispatch({
          type: "SET_LOADING"
        })
        const { status, data: {users} } = await axios.get(`https://atbtmain.teksacademy.com/user/list?page=${pageNo}&pageSize=5&sortBy=userName&search=${search}`);
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
  
    useEffect(() => {
      // getUsersData();
      getPaginatedUsersData(usersState?.pagination?.currentPage,usersState?.pagination?.search);
      // eslint-disable-next-line
    }, [usersDispatch,usersState?.pagination?.currentPage,usersState?.pagination?.search]);
  
    return (
      <UserDataContext.Provider
        value={{
          usersState,
          usersDispatch,
          // getUsersData,
          getUser,
          getPaginatedUsersData,
        }}
      >
        {children}
      </UserDataContext.Provider>
    );
  };
  
  export default UserDataProvider;