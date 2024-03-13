import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login_bg from '../../Images/login_bg.jpg';
import logo from '../../Images/logo.png';
import { AuthContext } from '../../contexts/authContext/authContext';

function ResetPassword() {
  const navigate = useNavigate();
  const { changePassword } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [validityEmail, setValidityEmail] = useState();
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setValidityEmail('Please  enter email id');
      return;
    } else if (!emailPattern.test(email)) {
      setValidityEmail('Invalid email id');
      // setValidityEmail("Oops! It seems the entered email is not registered");

      return;
      // errors.email = 'Invalid email address';
    } else {
      setValidityEmail('');
    }
    if (!email.trim()) {
    } else {
      const res = await changePassword({ email });
      res === 200 && navigate('/login');
      console.log('recieved', res);
    }
  };
  return (
    <main className='relative overflow-hidden'>
      <img
        src={login_bg}
        alt='background image'
        className='absolute w-screen h-screen'
      />
      <div className='relative flex justify-center h-screen items-center'>
        <div className='w-96 rounded-lg overflow-hidden shadow-2xl p-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <img
              className='mx-auto h-10 w-auto mb-8'
              src={logo}
              alt='Company Logo'
            />
            <h2 className='mb-3 text-center text-lg font-semibold text-gray-900'>
              Reset your Password
            </h2>
            <p className='mb-10 text-center text-sm'>
              Enter your email id to reset your password.
            </p>
          </div>
          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form
              className='space-y-6'
              action='#'
              method='POST'
            >
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email ID <span className='text-[#dc2626]'>*</span>
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder='Enter your Email ID'
                    type='email'
                    autoComplete='email'
                    required
                    className='p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6'
                  />
                  <p className='text-[#dc2626] text-xs mt-1'>{validityEmail}</p>
                </div>
              </div>
              <div>
                <button
                  type='submit'
                  onClick={handleSubmit}
                  className='flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
                >
                  Request Reset Link
                </button>
                {/* <div className="text-sm text-center mt-4">
                                    <Link to="/" className="font-semibold text-black-100 hover:text-orange-500">Back to Sign In</Link>
                                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ResetPassword;
