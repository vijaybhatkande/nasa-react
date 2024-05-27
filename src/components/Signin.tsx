// ./src/App.js
// import React from 'react';

import { useState } from "react";
import axios from 'axios'
import React from "react";
import { useNavigate } from 'react-router-dom';
function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  return <div className="h-screen flex justify-center flex-col">

    <div className="flex justify-center">
      <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <div className="px-10">
          <div className="text-3xl font-extrabold">
            NASA
          </div>
        </div>
        <div>
          {/* <div className="px-10">
              <div className="text-3xl font-bold">
                Log in
              </div>
            </div> */}
          <div className="pt-2">
            <label className="block mb-2 text-sm text-black font-semibold pt-4">Username</label>
            <input type="text" onChange={(e) => {
              setUsername(e.target.value)
            }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="J...@gmail.com" required />
            <label className="block mb-2 text-sm text-black font-semibold pt-4">Password</label>
            <input type="password" onChange={(e) => {
              setPassword(e.target.value)
            }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="1234" required />
            <button type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5" onClick={async () => {
              console.log('username', username);
              const data = {
                username: username,
                password: password
              };
              await axios.post('http://localhost:8080/api/logIn', data).then(async (res) => {
                const response = res.data
                console.log(response);
                sessionStorage.setItem('User', JSON.stringify(response.user))
                navigate('/dashboard');

              })
            }}>Log in</button>
          </div>
        </div>
      </a>
    </div>
  </div>

}

export default Login;