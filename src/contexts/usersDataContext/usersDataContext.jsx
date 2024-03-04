import React, { createContext, useEffect, useReducer, useContext } from 'react';
import * as actions from './utils/usersActions';
import * as api from './utils/usersApis';
import userDataReducer from './userDataReducer';
import { initialState } from './utils/usersConfig';
import { AuthContext } from '../authContext/authContext';
import { useNavigate, useSubmit } from 'react-router-dom';

export const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const [usersState, usersDispatch] = useReducer(userDataReducer, initialState);

  const { authState } = useContext(AuthContext);

  const getAllUsers = async () => {
    console.log(`${authState.token} token is present in getAllUsers`);
    const { status, data } = await api.getAllUsers(authState?.token);
    if (status === 200) {
      usersDispatch(actions.setUsersData(data));
    }
  };

  const getDashboardUsersData = async () => {
    console.log(`${authState.token} token is present in getDashboardUsersData`);
    const { currentPage, pageSize, sortBy, search } = usersState.dashboard;
    usersDispatch(actions.setLoading('DASHBOARD'));
    try {
      const { status, data } = await api.getDashboardUsers(
        currentPage,
        pageSize,
        sortBy,
        search,
        authState?.token
      );
      if (status === 200) {
        console.log(data, 'udud is 200');
        usersDispatch(actions.setDashboardUsers(data, 'DASHBOARD'));
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      usersDispatch(actions.setLoading('DASHBOARD'));
    }
  };

  const getSettingsUsersData = async () => {
    console.log(`${authState.token} token is present in getSettingsUsersData`);
    const { currentPage, pageSize, sortBy, search } = usersState.settings;
    usersDispatch(actions.setLoading('SETTINGS'));
    try {
      const { status, data } = await api.getSettingsUsers(
        currentPage,
        pageSize,
        sortBy,
        search,
        authState?.token
      );
      if (status === 200) {
        // throw new Error('Parameter is not a number!');
        usersDispatch(actions.setDashboardUsers(data, 'SETTINGS'));
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      usersDispatch(actions.setLoading('SETTINGS'));
    }
  };

  const getUser = async (userID) => {
    console.log(`${authState.token} token is present in getUser`);
    try {
      const { status, data } = await api.getUserById(userID, authState?.token);
      if (status === 200) {
        return data;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const createUser = async (userData) => {
    console.log(`${authState.token} token is present in createUser`);
    try {
      console.log('navig');
      const { data, status } = await api.createUser(userData, authState?.token);
      console.log(data, status, 'navig');
      if (status === 201) {
        getDashboardUsersData();
        getSettingsUsersData();
        getAllUsers();
      }
      return { data, status };
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const updateUser = async (userData, id) => {
    console.log(`${authState.token} token is present in updateUser`);
    try {
      console.log('navig');
      const { data, status } = await api.updateUser(
        userData,
        id,
        authState?.token
      );
      console.log(data, status, 'navig');
      getDashboardUsersData();
      getSettingsUsersData();
      getAllUsers();
      if (status === 200) {
        getDashboardUsersData();
        getSettingsUsersData();
        getAllUsers();
        // navigate(`/`)
      }
      return { data, status };
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const deleteUser = async (id) => {
    console.log(`${authState.token} token is present in deleteUser`);
    try {
      const { data, status } = await api.deleteUser(id, authState?.token);
      if (status === 200) {
        getDashboardUsersData();
        getSettingsUsersData();
        getAllUsers();
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const toggleUser = async (id, toggleData) => {
    console.log(`${authState.token} token is present in toggleUser`);
    try {
      const { data, status } = await api.toggleUser(
        id,
        toggleData,
        authState?.token
      );
      if (status === 200) {
        getDashboardUsersData();
        getSettingsUsersData();
        getAllUsers();
      }
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  useEffect(() => {
    if (authState?.token) {
      getDashboardUsersData();
      getSettingsUsersData();
    }
    // eslint-disable-next-line
  }, [
    usersDispatch,
    usersState?.dashboard?.currentPage,
    usersState?.dashboard?.search,
    usersState?.dashboard?.pageSize,
    usersState?.settings?.sortBy,
    usersState?.settings?.currentPage,
    usersState?.settings?.search,
    usersState?.settings?.pageSize,
    usersState?.settings?.sortBy,
    authState?.token,
  ]);
  useEffect(() => {
    if (authState?.token) {
      getAllUsers();
      getSettingsUsersData();
    }
  }, [authState?.token]);

  return (
    <UserDataContext.Provider
      value={{
        usersState,
        usersDispatch,
        createUser,
        getUser,
        getDashboardUsersData,
        getSettingsUsersData,
        deleteUser,
        toggleUser,
        updateUser,
        setSortBy: actions.setSortBy,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
