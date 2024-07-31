import React, {useState, useEffect} from "react";



const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [timer, setTimer] = useState(30);
  
    

    useEffect(() => {
        let interval;
        if (isButtonDisabled) {
          interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
          }, 1000);
        }
        if (timer === 0) {
          clearInterval(interval);
          setIsButtonDisabled(false);
          setTimer(30);
        }
        return () => clearInterval(interval);
      }, [isButtonDisabled, timer]);


    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:5000/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email }),
        })
        .then((resp) => {
            if (!resp.ok) throw new Error('Password reset request failed')
            return resp.json();

        })
        .then((data) => {
            setMessage(data.message);
            setIsButtonDisabled(true)
        })
        .catch((error) => {
            console.error(error)
            setMessage('Password reset request failed. Please try again.')
        })
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-100">
          <div className="container mx-auto px-4 py-5">
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <h1 className="text-2xl text-center text-gray-800 mb-4">Forgot Password</h1>
                  {message && (
                    <p className={`text-center ${message.includes('If an account with that email exists') ? 'text-blue-500' : 'text-red-500'}`}>
                      {message}
                    </p>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-800 text-sm font-bold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button
                        type="submit"
                        className={`bg-gray-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isButtonDisabled}
                    >
                      Send Reset Link
                    </button>
                    {isButtonDisabled && (
                      <div className="mt-2 text-center text-gray-700">
                        Resend available in {timer} seconds
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    );

}

export default ForgotPassword;