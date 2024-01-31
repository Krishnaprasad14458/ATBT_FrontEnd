import React, {
  createContext,
  useEffect,
  useReducer,
} from "react";
import * as actions from './utils/usersActions'
import * as api from './utils/usersApis'
import userDataReducer from "./userDataReducer";
import axios from "axios";
import { apiUrl } from "../../utils/constants";
import { toast } from "react-toastify";
import { initialState } from "./utils/usersConfig";

export const UserDataContext = createContext();

const localStorageData = JSON.parse(localStorage.getItem("data"));

const UserDataProvider = ({ children }) => {
  const [usersState, usersDispatch] = useReducer(
    userDataReducer,
    initialState
  );

  console.log(usersState.pagination.loading, "loading")

  const getAllUsers = async () => {
    const { status, data } = await api.getAllUsers();
    if (status === 200) {
      usersDispatch(actions.setUsersData(data))
    }
  }

  const getPaginatedUsersData = async () => {
    const {currentPage,pageSize,sortBy,search} = usersState.pagination;
    usersDispatch(actions.setLoading())
    try {
      const { status, data } = await api.getPaginatedUsers(currentPage,pageSize,sortBy,search)
      if (status === 200) {
        usersDispatch(actions.setPaginatedUsers(data))
      }
    } catch (error) {
      console.error(error);
    } finally {
      usersDispatch(actions.setLoading())
    }
  };

  const getUser = async (userID) => {
    try {
      const { status, data } = await api.getUserById(userID);
      if (status === 200) {
        return data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createUser = async (userData) => {
    try {
      const { data, status } = await api.createUser(userData)
      if (status === 201) {
        getPaginatedUsersData()
        getAllUsers()
      }
    }
    catch (e) {
      console.error(e);
    }
  };

  const deleteUser = async(id) => {
    try {
      console.log(localStorageData?.token)
      const { data, status } = await api.deleteUser(id)
      if (status === 200) {
        getPaginatedUsersData()
        getAllUsers()
      }
    }
    catch (e) {
      console.error(e);
    }
  }

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
        deleteUser
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;