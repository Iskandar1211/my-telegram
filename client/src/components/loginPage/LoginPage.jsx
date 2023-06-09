import React, { useState } from 'react'
import { Login } from './Login';
import { Registration } from './Registration';

export const LoginPage = () => {
    const [registred, setRegistrad] = useState(true);


    return (
        <div>
            {!registred ? <Registration setRegistrad={setRegistrad} /> : <Login />}
        </div>
    )
}
