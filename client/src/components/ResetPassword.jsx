import React, {useState} from "react";
import {useParams, useNavigate} from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from "react-icons/io"

const ResetPassword = () => {
    const {token} = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
          setMessage('Passwords do not match');
          return;
        }

        fetch(`https://geocel-enterprises.onrender.com/reset-password/${token}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({new_password: newPassword}),
        })
        .then((resp) => {
            if (!resp.ok) throw new Error ('password reset failed')
            return resp.json();    
        })
        .then((data) => {
            setMessage(data.message)
            setTimeout(() => {
                navigate('/login')
            }, 3000);
        })
        .catch((error) => {
            console.error(error)
            setMessage('Password reset failed. Please try again.')
        })
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-100">
          <div className="container mx-auto px-4 py-5">
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <h1 className="text-2xl text-center text-gray-800 mb-4">Reset Password</h1>
                  {message && (
                    <p className={`text-center ${message.includes('successfully') ? 'text-blue-500' : 'text-red-500'}`}>
                      {message}
                    </p>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="newPassword" className="block text-gray-800 text-sm font-bold mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text": "password"}
                          id="newPassword"
                          placeholder="••••••••"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 px-2 flex items-center text-gray-700"
                          onClick={togglePasswordVisibility}
                        >
                         {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                       </button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="newPassword" className="block text-gray-800 text-sm font-bold mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        placeholder="••••••••"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-gray-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default ResetPassword;