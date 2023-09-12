import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

// async function login(e) {
//   e.preventDefault();

//   try {
//     const response = await axios.post('http://localhost:4000/login', { username, password });

//     if (response.status === 200) {
//       // Authentication was successful; you can redirect the user or perform other actions here.
//       console.log('Login successful');
//     } else {
//       // Handle authentication failure (e.g., show an error message)
//       console.error('Login failed');
//     }
//   } catch (error) {
//     // Handle network or other errors
//     console.error('Network error:', error);
//   }
// }


const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  async function login(e){
    e.preventDefault();

    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type' : 'application/json'},
      credentials: 'include', 
    });

    if( response.ok ){
      nav("/");
    }
    else{
      alert('Wrong credentials');
    }
  }
  

  return ( 
    <form className='login' onSubmit={login}>
        <h1> Login </h1>
        <input type='text' 
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value) }
        />
        <input type='password' 
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value) }
        />
        <button> Login </button>
    </form>
  )
}

export default LoginPage