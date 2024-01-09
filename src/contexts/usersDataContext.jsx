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
      users:[]
    };
  
    const [usersState, usersDispatch] = useReducer(
      userDataReducer,
      initialState
    );
  
    const getUsersData = async () => {
      try {
        const { status, data } = await axios.get("http://3.111.0.222/userdata");
        if (status === 201) {
          console.log(data,"ud")
          usersDispatch({
            type: "SET_USERS_DATA",
            payload: data,
          });
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
      // eslint-disable-next-line
    }, [usersDispatch]);
  
    return (
      <UserDataContext.Provider
        value={{
          usersState,
          usersDispatch,
          getUsersData,
          getUser
        }}
      >
        {children}
      </UserDataContext.Provider>
    );
  };
  
  export default UserDataProvider;