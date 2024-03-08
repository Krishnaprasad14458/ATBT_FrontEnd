import React, { createContext, useContext, useEffect, useReducer } from 'react';
import * as actions from './utils/entitiesActions';
import * as api from './utils/entitiesApis';
import entitiesDataReducer from './entitiesDataReducer';
import { useNavigate } from 'react-router-dom';
import { initialState } from './utils/entitiesConfig';
import { AuthContext } from '../authContext/authContext';
import { useAsyncThrow } from '../../hooks/asyncErrors/useAsyncThrow';
import { useAsyncCatch } from '../../hooks/asyncErrors/useAsyncCatch';

export const EntitiesDataContext = createContext();

const EntitiesDataProvider = ({ children }) => {
  const throwError = useAsyncCatch();

  const [entitiesState, entitiesDispatch] = useReducer(
    entitiesDataReducer,
    initialState
  );

  const { authState } = useContext(AuthContext);

  const getAllEntities = async () => {
    try {
      const { data, status } = await api.getAllEntities(authState?.token);
      console.log(data, status, 'entities');
      if (status === 200) {
        entitiesDispatch(actions.setEntities(data));
      } else {
        return null;
      }
    } catch (error) {
      // console.error(`the error is ${error}`);
      throwError(error);
    }
  };

  const getDashboardEntitiesData = async () => {
    const { currentPage, perPage, sortBy, search } =
      entitiesState.dashboardEntities;
    entitiesDispatch(actions.setLoading('DASHBOARD'));
    try {
      const { data, status } = await api.getEntities(
        currentPage,
        perPage,
        sortBy,
        search,
        authState?.token
      );
      console.log(data, status, 'entities');
      if (status === 200) {
        entitiesDispatch(actions.setPaginatedEntities('DASHBOARD', data));
      } else {
        return null;
      }
    } catch (error) {
      // console.error(`the error is: ${error}`);
      throwError(error);
    } finally {
      entitiesDispatch(actions.setLoading('DASHBOARD'));
    }
  };

  const getpaginatedEntitiesData = async () => {
    const { currentPage, perPage, sortBy, search } = entitiesState.entitiesList;
    entitiesDispatch(actions.setLoading('ENTITES'));
    try {
      const { data, status } = await api.getEntities(
        currentPage,
        perPage,
        sortBy,
        search,
        authState?.token
      );
      console.log(data, status, 'entities');
      if (status === 200) {
        entitiesDispatch(actions.setPaginatedEntities('ENTITES', data));
      } else {
        return null;
      }
    } catch (error) {
      // console.error(`the error is ${error}`);
      throwError(error);
    } finally {
      entitiesDispatch(actions.setLoading('ENTITES'));
    }
  };

  const deleteEntitybyId = async (id) => {
    try {
      const { status } = await api.deleteEntity(id, authState?.token);
      if (status === 200) {
        getpaginatedEntitiesData();
        getDashboardEntitiesData();
        getAllEntities();
      } else {
        return null;
      }
    } catch (error) {
      // console.error(`the error is ${error}`);
      throwError(error);
    }
  };

  const getEntitybyId = async (id) => {
    try {
      const data = await api.getEntityById(id, authState?.token);
      getpaginatedEntitiesData();
      getDashboardEntitiesData();
      return data;
    } catch (error) {
      // console.error(`the error is ${error}`);
      throwError(error);
    }
  };

  const createEntity = async (entityData) => {
    try {
      const { data, status } = await api.createEntity(
        entityData,
        authState?.token
      );
      if (status === 201) {
        getpaginatedEntitiesData();
        getDashboardEntitiesData();
        getAllEntities();
      }
      return { data, status };
    } catch (error) {
      // console.error(`the error is ${error}`);
      throwError(error);
    }
  };
  const updateEntity = async (entityData, id) => {
    console.log(
      `${authState.token} token is present in updateEntity ${entityData}`
    );
    for (var pair of entityData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    try {
      console.log('navig');
      const { data, status } = await api.updateEntity(
        entityData,
        id,
        authState?.token
      );
      console.log(data, status, 'navig');
      getDashboardEntitiesData();
      getpaginatedEntitiesData();
      getAllEntities();
      if (status === 200) {
        getDashboardEntitiesData();
        getpaginatedEntitiesData();
        getAllEntities();
      }
      return { data, status };
    } catch (error) {
      throwError(error);
    }
  };
  useEffect(() => {
    if (authState?.token) {
      getpaginatedEntitiesData();
      getDashboardEntitiesData();
      getAllEntities();
    }
    // eslint-disable-next-line
  }, [
    entitiesDispatch,
    entitiesState?.entitiesList?.currentPage,
    entitiesState?.entitiesList?.search,
    entitiesState?.entitiesList?.perPage,
    entitiesState?.dashboardEntities?.currentPage,
    entitiesState?.dashboardEntities?.search,
    entitiesState?.dashboardEntities?.perPage,
    authState?.token,
  ]);

  return (
    <EntitiesDataContext.Provider
      value={{
        entitiesState,
        entitiesDispatch,
        getpaginatedEntitiesData,
        deleteEntitybyId,
        createEntity,
        getEntitybyId,
        updateEntity,
      }}
    >
      {children}
    </EntitiesDataContext.Provider>
  );
};

export default EntitiesDataProvider;
