import React, { useState } from 'react'

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST', 
            body: JSON.stringify({username,password}),
            headers: {'Content-Type': 'application/json'},
        });

        // Below code also works

        // if( response.ok === false )
        // {
        //     alert('register failed');
        // }
 
        if( response.status === 200 )
        {
            alert('Congratulations! Successful Registered')
        }
        else
        {
            alert('Registeration Failed ! Try again later');
        }
    }
    
    return (
        <form className='register' onSubmit={register}>
            <h1> Register </h1>
            <input type='text' 
                placeholder='Username' 
                value={username} 
                onChange={e => setUsername(e.target.value) } />
            <input type='password' 
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value) }/>
            <button> Register </button>
        </form>
  )
}

export default RegisterPage