
import React, { useContext, useState } from 'react'
import login_bg from '../../Images/login_bg.jpg';
import logo from '../../Images/logo.png';
import { AuthContext } from '../../contexts/authContext/authContext';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
function ChangePassword() {
    const { id } = useParams();
    const { resetPassword } = useContext(AuthContext);
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            resetPassword({
                id, password
            })
        } else {
            toast.error("Passwords did not match!");
        }
    }

    return (
        <main className="relative flex flex-1 flex-col overflow-hidden sm:px-6 lg:px-8">
            <img src={login_bg} alt="background image" className="absolute left-1/2 top-0 -ml-[47.5rem] w-[122.5rem] max-w-none" />
            <div className="absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"></div>
            <div className="relative flex justify-center h-screen items-center">
                <div className="w-96 rounded-lg overflow-hidden shadow-2xl p-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-10 w-auto" src={logo} alt="Company Logo" />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">Change Password</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="passowrd" className="block text-sm font-medium leading-6 text-gray-900" >Enter New Password <span className='text-[#dc2626]'>*</span></label>
                                <div className="mt-2">
                                    <input id="passowrd" name="passowrd" type="passowrd" onChange={e => setPassword(e.target.value)}
                                        placeholder="Enter new password" value={password} autoComplete="passowrd" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm New Password <span className='text-[#dc2626]'>*</span></label>

                                </div>
                                <div className="mt-2">
                                    <input id="confirmPassword" name="confirmPassword" type="password" placeholder='Confirm new password' onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} autoComplete="confirmPassword" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <button type="submit" onClick={handleSubmit} className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm  leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ChangePassword;
