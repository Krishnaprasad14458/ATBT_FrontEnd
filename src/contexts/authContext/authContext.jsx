import React, { createContext, useEffect, useReducer } from 'react';
import authReducer from './authReducer';
import axios from 'axios';
import { redirect, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { apiUrl } from '../../utils/constants';
import { setupAuthenticationErrorHandler } from './utils/setupAthenticationErrorHandler';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const navigate = useNavigate();
  // const location = useLocation();

  const localStorageData = JSON.parse(localStorage.getItem('data'));

  const initialAuth = {
    user: localStorageData?.user || {},
    token: localStorageData?.token || '',
    role: localStorageData?.role || {},
  };

  const [authState, authDispatch] = useReducer(authReducer, initialAuth);
  const adminLogin = async (loginData) => {
    try {
      const { data, status } = await toast.promise(
        axios.post(`${apiUrl}/auth/login`, loginData),
        {
          pending: {
            render() {
              return 'Logging In...';
            },
          },
          success: {
            render({
              data: {
                data: {
                  user: { name },
                },
              },
            }) {
              return `Welcome ${name}`;
            },
          },
          error: {
            render({
              data: {
                response: { data },
              },
            }) {
              // When the promise reject, data will contains the error
              return `error: ${data.message}`;
              // return <MyErrorComponent message={data.message} />;
            },
          },
        }
      );
      console.log(data, 'data');
      if (status === 200) {
        localStorage.setItem(
          'data',
          JSON.stringify({
            user: data?.user,
            token: data?.token,
            role: data?.role,
          })
        );
        authDispatch({ type: 'SET_USER', payload: data?.user });
        authDispatch({ type: 'SET_TOKEN', payload: data?.token });
        authDispatch({ type: 'SET_ROLE', payload: data?.role });
        // navigate(location?.state?.from?.pathname || "/");
        return redirect('/');
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const changePassword = async ({ email }) => {
    try {
      const { status } = await toast.promise(
        axios.put(`${apiUrl}/auth/forgotpassword?email=${email}`, {
          headers: {
            authorization: authState?.token,
          },
        }),
        {
          pending: 'verifying email',
          success: {
            render({
              data: {
                data: { message },
              },
            }) {
              return `${message}`;
            },
          },
          error: 'Oops! It seems the entered email is not registered 🤯',
        }
      );
      if (status === 200) {
        // navigate("/login");
        Swal.fire({
          title: 'Reset Password Success!',
          text: 'Check your email for reset instructions.',
          icon: 'success',
        });
      }
      return redirect('/login');
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const resetPassword = async ({ id, password }) => {
    try {
      const { data, status } = await toast.promise(
        axios.put(
          `${apiUrl}/auth/changepassword/${id}`,
          {
            newPassword: password,
          },
          {
            headers: {
              authorization: authState?.token,
            },
          }
        ),
        {
          pending: 'verifying data',
          success: {
            render({
              data: {
                data: { updated },
              },
            }) {
              return `Password Updated`;
            },
          },
          error: 'Unauthorized Access 🤯',
        }
      );
      console.log(status, 'status');
      if (status === 200) {
        // navigate("/login");
        return redirect('/login');
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const userLogout = () => {
    localStorage.removeItem('data');
    authDispatch({ type: 'SET_USER', payload: {} });
    authDispatch({ type: 'SET_TOKEN', payload: '' });
    // navigate("/");
    return redirect('/');
  };

  useEffect(() => {
    if (localStorageData) {
      authDispatch({ type: 'SET_USER', payload: localStorageData?.user });
      authDispatch({ type: 'SET_TOKEN', payload: localStorageData?.token });
      // setupAuthenticationErrorHandler(userLogout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authState,
        adminLogin,
        changePassword,
        resetPassword,
        userLogout,
        localStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
