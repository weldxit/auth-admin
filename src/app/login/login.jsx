// pages/login.js
"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Login = () => {
    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  useEffect(() => {
    // Check if a token exists in the cookie
    const token = Cookies.get('token');
    const role = Cookies.get('role');

    // If a token exists, redirect the user to the appropriate page
    if (token && role) {
      // const decodedToken = jwt_decode(token);
      const userRole = role;

      if (userRole === 'admin') {
        router.replace('/admin'); // Use replace to avoid keeping the login page in the history
      } else {
        router.replace('/user');
      }
    }
  }, []);
  const handleLogin = async () => {
    console.log("reaced", username, password)
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Assuming the server sends back a token in the response
        const {token,user} = data;
        // console.log(token, user)
  
        // // Use a library like jsonwebtoken to decode the token and extract user information
        // const decodedToken = jwt_decode(token);
  
        // // Extract the user role from the decoded token
        const userRole = user.role;
  
        // Set the token securely using cookies
        Cookies.set('token', token, { secure: true, sameSite: 'strict' });
        Cookies.set('role', userRole, { secure: true, sameSite: 'strict' });

        // Use the user role to redirect to the appropriate page
        if (userRole === 'admin') {
          router.push('/admin');
        } else {
          router.push('/user');
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-extrabold text-center">Login</h2>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="mt-1 p-2 w-full border rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={handleLogin}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
