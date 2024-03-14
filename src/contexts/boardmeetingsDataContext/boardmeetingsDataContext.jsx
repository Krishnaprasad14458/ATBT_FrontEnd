import React, { createContext, useContext, useEffect, useReducer } from 'react';
import * as actions from './utils/boardmeetingsActions';
import * as api from './utils/boardmeetingsApis';
import BoardMeetingsDataReducer from './boardmeetingsDataReducer';
import { useNavigate } from 'react-router-dom';
import { initialState } from './utils/boardmeetingsConfig';
import { AuthContext } from '../authContext/authContext';
import { useAsyncThrow } from '../../hooks/asyncErrors/useAsyncThrow';
import { useAsyncCatch } from '../../hooks/asyncErrors/useAsyncCatch';

export const BoardMeetingsDataContext = createContext();

const BoardMeetingsDataProvider = ({ children }) => {
  const throwError = useAsyncCatch();

  const [boardmeetingsState, boardmeetingsDispatch] = useReducer(
    BoardMeetingsDataReducer,
    initialState
  );

  const { authState } = useContext(AuthContext);

  const getAllBoardMeetings = async () => {
    try {
      const { data, status } = await api.getAllBoardMeetings(authState?.token);
      console.log(data, status, 'boardmeetings');
      if (status === 200) {
        boardmeetingsDispatch(actions.setBoardMeetings(data));
      } else {
        return null;
      }
    } catch (error) {
      // console.error(`the error is ${error}`);
      throwError(error);
    }
  };

  const getDashboardBoardMeetingsData = async () => {
    const { currentPage, perPage, sortBy, search, filters } =
      boardmeetingsState.dashboardBoardMeetings;
    boardmeetingsDispatch(actions.setLoading('DASHBOARD'));
    try {
      const { data, status } = await api.getBoardMeetings(
        currentPage,
        perPage,
        sortBy,
        search,
        authState?.token,
        filters
      );
      console.log(data, status, 'boardmeetings');
      if (status === 200) {
        boardmeetingsDispatch(actions.setPaginatedBoardMeetings('DASHBOARD', data));
      } else {
        return null;
      }
    } catch (error) {
      // console.error(`the error is: ${error}`);
      throwError(error);
    } finally {
      boardmeetingsDispatch(actions.setLoading('DASHBOARD'));
    }
  };

  const getpaginatedBoardMeetingsData = async () => {
    const { currentPage, perPage, sortBy, search, filters } =
      boardmeetingsState.boardmeetingsList;
    boardmeetingsDispatch(actions.setLoading('BOARDMEETING'));
    try {
      const { data, status } = await api.getBoardMeetings(
        currentPage,
        perPage,
        sortBy,
        search,
        authState?.token,
        filters
      );
      console.log(data, status, 'boardmeeting');
      if (status === 200) {
        boardmeetingsDispatch(actions.setPaginatedBoardMeetings('BOARDMEETING', data));
      } else {
        return null;
      }
    } catch (error) {
      // console.error(`the error is ${error}`);
      throwError(error);
    } finally {
      boardmeetingsDispatch(actions.setLoading('BOARDMEETING'));
    }
  };

  const deleteBoardMeetingbyId = async (id) => {
    try {
      const { status } = await api.deleteBoardMeeting(id, authState?.token);
      if (status === 200) {
        getpaginatedBoardMeetingsData();
        getDashboardBoardMeetingsData();
        getAllBoardMeetings();
      } else {
        return null;
      }
    } catch (error) {
      // console.error(`the error is ${error}`);
      throwError(error);
    }
  };

  const getBoardMeetingbyId = async (id) => {
    try {
      const data = await api.getBoardMeetingById(id, authState?.token);
      getpaginatedBoardMeetingsData();
      getDashboardBoardMeetingsData();
      return data;
    } catch (error) {
      // console.error(`the error is ${error}`);
      throwError(error);
    }
  };

  const createBoardMeeting = async (boardmeetingData) => {
    try {
      const { data, status } = await api.createBoardMeeting(
        boardmeetingData,
        authState?.token
      );
      if (status === 201) {
        getpaginatedBoardMeetingsData();
        getDashboardBoardMeetingsData();
        getAllBoardMeetings();
      }
      return { data, status };
    } catch (error) {
      // console.error(`the error is ${error}`);
      throwError(error);
    }
  };
  const updateBoardMeeting = async (boardmeetingData, id) => {
    console.log(
      `${authState.token} token is present in updateBoardMeeting ${boardmeetingData}`
    );
    for (var pair of boardmeetingData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    try {
      console.log('navig');
      const { data, status } = await api.updateBoardMeeting(
        boardmeetingData,
        id,
        authState?.token
      );
      console.log(data, status, 'navig');
      getDashboardBoardMeetingsData();
      getpaginatedBoardMeetingsData();
      getAllBoardMeetings();
      if (status === 200) {
        getDashboardBoardMeetingsData();
        getpaginatedBoardMeetingsData();
        getAllBoardMeetings();
      }
      return { data, status };
    } catch (error) {
      throwError(error);
    }
  };
  useEffect(() => {
    if (authState?.token) {
      getpaginatedBoardMeetingsData();
      getDashboardBoardMeetingsData();
      getAllBoardMeetings();
    }
    // eslint-disable-next-line
  }, [
    boardmeetingsDispatch,
    boardmeetingsState?.boardmeetingsList?.currentPage,
    boardmeetingsState?.boardmeetingsList?.search,
    boardmeetingsState?.boardmeetingsList?.perPage,
    boardmeetingsState?.boardmeetingsList?.filters,
    boardmeetingsState?.dashboardBoardMeetings?.currentPage,
    boardmeetingsState?.dashboardBoardMeetings?.search,
    boardmeetingsState?.dashboardBoardMeetings?.perPage,
    boardmeetingsState?.dashboardBoardMeetings?.filters,
    authState?.token,
  ]);

  return (
    <BoardMeetingsDataContext.Provider
      value={{
        boardmeetingsState,
        boardmeetingsDispatch,
        getpaginatedBoardMeetingsData,
        deleteBoardMeetingbyId,
        createBoardMeeting,
        getBoardMeetingbyId,
        updateBoardMeeting,
        setFilters: actions.setFilters,
      }}
    >
      {children}
    </BoardMeetingsDataContext.Provider>
  );
};

export default BoardMeetingsDataProvider;
