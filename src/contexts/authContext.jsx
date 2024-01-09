import React, { createContext, useEffect, useReducer } from "react";
import authReducer from "../reducers/authReducer";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const localStorageData = JSON.parse(localStorage.getItem("data"));

  const initialAuth = {
    user: localStorageData?.user || {},
    token: localStorageData?.token || "",
  };

  const [authState, authDispatch] = useReducer(authReducer, initialAuth);

  const adminLogin = async (loginData) => {
    try {
      const { status, data } = await toast.promise(
        axios.post(`http://3.111.0.222/adminlogin`, loginData),
        {
          pending: 'logging In...',
          success: {render({data: {data: {adminData: {fullname}}}}){
            console.log(fullname)
            return `Welcome ${fullname}`
          }},
          error: 'Wrong Credentials 🤯',
        },
      )
      console.log(data, status)
      if (status === 200) {
        localStorage.setItem(
          "data",
          JSON.stringify({ user: data?.adminData, token: data?.token })
        );
        authDispatch({ type: "SET_USER", payload: data?.adminData });
        authDispatch({ type: "SET_TOKEN", payload: data?.token });
        navigate(location?.state?.from?.pathname || "/sidebar");
      }
    } catch (e) {
      console.error(e);
    }
  };

const changePassword = async (emailData) => {
    console.log(emailData, "npd")
    try {
      const { status, data } = await toast.promise(
        axios.post(`http://3.111.0.222/changepassword`, emailData),
        {
          pending: 'verifying email',
          success: {render({data: {data: {message}}}){
            console.log(message)
            return `${message}`
          }},
          error: 'invalid email 🤯',
        },
      )
      console.log(data)
    //   if (status === 200) {
    //     localStorage.setItem(
    //       "data",
    //       JSON.stringify({ user: data?.adminData, token: data?.token })
    //     );
    //     authDispatch({ type: "SET_USER", payload: data?.adminData });
    //     authDispatch({ type: "SET_TOKEN", payload: data?.token });
    //     navigate(location?.state?.from?.pathname || "/");
    //   }
    } catch (e) {
      console.error(e);
    }
  };

  const resetPassword = async ({id,password}) => {
    console.log(id, password)
    try {
      if(id === 13) return toast.error("unautorized Access 🤯");
      
      const { status, data } = await toast.promise(
        axios.put(`http://3.111.0.222/resetpassword/${id}`, {password}),
        {
          pending: 'verifying data',
          success: {render({data: {data: {updated}}}){
            console.log(updated)
            return `${updated}`
          }},
          error: 'unautorized Access 🤯',
        },
      )
      
      console.log(data)
    //   if (status === 200) {
    //     localStorage.setItem(
    //       "data",
    //       JSON.stringify({ user: data?.adminData, token: data?.token })
    //     );
    //     authDispatch({ type: "SET_USER", payload: data?.adminData });
    //     authDispatch({ type: "SET_TOKEN", payload: data?.token });
    //     navigate(location?.state?.from?.pathname || "/");
    //   }
    } catch (e) {
      console.error(e);
    }
  };

  const userLogout = () => {
    localStorage.removeItem("data");
    authDispatch({ type: "SET_USER", payload: {} });
    authDispatch({ type: "SET_TOKEN", payload: "" });
    navigate("/");
  };

  useEffect(() => {
    if (localStorageData) {
      authDispatch({ type: "SET_USER", payload: localStorageData?.user });
      authDispatch({ type: "SET_TOKEN", payload: localStorageData?.token });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ authState, adminLogin, changePassword, resetPassword, userLogout, localStorageData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;