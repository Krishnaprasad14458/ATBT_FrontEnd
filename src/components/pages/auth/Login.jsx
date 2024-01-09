
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/authContext';
import { UserDataContext } from '../../../contexts/usersDataContext';
import login_bg from './../../common/Images/login_bg.jpg';
import logo from './../../common/Images/logo.png';
import axios from 'axios';


const Login = () => {
    const { adminLogin } = useContext(AuthContext);
    const { usersState } = useContext(UserDataContext);
    console.log(usersState,"uss")
    const [formData, setFormData] = useState({ email: '', password: '' })
    const handleFormData = (e) => {
        const {name, value} = e.target;
        setFormData((previous) => ({ ...previous, [name]: value }))
    }
    
    const loginHandler = (e) => {
        e.preventDefault();
        console.log(formData)
        if (!formData.email.trim() || !formData.password.trim()) {
        } else {
          adminLogin(formData);
        }
      };
    
    return (
        <main className="relative flex flex-1 flex-col overflow-hidden sm:px-6 lg:px-8">
            <img src={login_bg} alt="background image" className="absolute left-1/2 top-0 -ml-[47.5rem] w-[122.5rem] max-w-none" />
            <div className="absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"></div>
            <div className="relative flex justify-center h-screen items-center">
                <div className="w-96 rounded-lg overflow-hidden shadow-2xl p-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-10 w-auto" src={logo} alt="Company Logo" />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" onChange={handleFormData} value={formData.email} type="email" autoComplete="email" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    <div className="text-sm">
                                        <a href="/changepassword" className="font-semibold text-orange-600 hover:text-orange-500">Forgot password?</a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input id="password" name="password" onChange={handleFormData} value={formData.password} type="password" autoComplete="current-password" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <button type="submit" onClick={loginHandler}
                                    className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login