import React, { createContext, useEffect, useReducer } from 'react';
import authReducer from './authReducer';
import axios from 'axios';
import { redirect, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { apiUrl } from '../../utils/constants';
import { setupAuthenticationErrorHandler } from './utils/setupAthenticationErrorHandler';
import atbtApi from '../../serviceLayer/interceptor';
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
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
              return `error: ${data?.message}`;
              // return <MyErrorComponent message={data.message} />;
            },
          },
        }
      );
      console.log(data, 'data');
      if (status === 200) {
        window.location.reload();
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
      // throw e;
    }
  };
//   const adminLogin = async (loginData) => {
//     // const authDispatch = useAuthDispatch();
//     try { 
//         const { data, status } = await toast.promise(
//             axios.post(`${apiUrl}/auth/login`, loginData),
//             {
//                 pending: {
//                     render() {
//                         return "Logging In...";
//                     },
//                 },
//                 success: {
//                     render({ data }) {
//                         const { name } = data.data.user;
//                         return `Welcome ${name}`;
//                     },
//                 },
//                 error: {
//                     render({ data }) {
//                         const errorMessage = data?.response?.data?.message || "Login failed";
//                         return `Error: ${errorMessage}`;
//                     },
//                 },
//             }
//         );

//         console.log(data, status, "data status");

//         if (status === 200) {
//             localStorage.setItem(
//                 "data",
//                 JSON.stringify({
//                     user: data.user,
//                     token: data.token,
//                     role: data.role,
//                 })
//             );
//             authDispatch({ type: "SET_USER", payload: data.user });
//             authDispatch({ type: "SET_TOKEN", payload: data.token });
//             authDispatch({ type: "SET_ROLE", payload: data.role });
//             return redirect("/");
//         } else {
//             throw new Error(`Unexpected status code: ${status}`);
//         }
//     } catch (e) {
//         console.error("Login error:", e);
        
//         if (e.response) {
//             if (e.response.status === 401) {
//                 toast.error("Unauthorized: Incorrect login credentials.");
//             } else if (e.response.status === 404) {
//                 toast.error("Login endpoint not found (404). Please check the API URL.");
//             } else if (e.response.data && e.response.data.message) {
//                 toast.error(`Login failed: ${e.response.data.message}`);
//             } else {
//                 toast.error(`An error occurred: ${e.response.status}`);
//             }
//         } else {
//             toast.error("An unexpected error occurred. Please try again later.");
//         }

//         // throw e; // Rethrow the error if needed for further handling
//     }
// };
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
        localStorage.removeItem('data');
        authDispatch({ type: 'SET_USER', payload: {} });
        authDispatch({ type: 'SET_TOKEN', payload: '' });
        // navigate("/login");
        Swal.fire({
          title: 'Reset Password Success!',
          text: 'Check your email for reset instructions.',
          icon: 'success',
        });
      }
      console.log('res', status);
      return status;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
const resetPassword = async ({ id, password }) => {
    console.log("hi", atbtApi)
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
        localStorage.removeItem('data');
        authDispatch({ type: 'SET_USER', payload: {} });
        authDispatch({ type: 'SET_TOKEN', payload: '' });
      }
      return status;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  const resetPasswordWhenLoggedIn = async ({ id, oldpassword, newpassword }) => {
    console.log("hie", atbtApi)
try {
      const { data, status } = await toast.promise(
        axios.put(
          `${apiUrl}/auth/renewpassword/${id}`,
          {
            oldPassword: oldpassword,
            newPassword: newpassword,
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
        localStorage.removeItem('data');
        authDispatch({ type: 'SET_USER', payload: {} });
        authDispatch({ type: 'SET_TOKEN', payload: '' });
      }
      return status;
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
        resetPasswordWhenLoggedIn,
        localStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
