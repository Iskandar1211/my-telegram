import React, { useContext, useState } from 'react'
import { Context } from '../../context/TelegramContext';

export const Login = () => {
    const { setLoggedIn } = useContext(Context);

    const [user, setUser] = useState({
        id: '',
        login: '',
        password: '',
    })
    const onUserInput = (key) => (e) => {
        setUser(
            { ...user, [key]: e.target.value }
        )
    }
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: user.login, password: user.password })
        });

        if (response.ok) {
            setLoggedIn(true);
        } else {
            setError('Неверный логин и пароль');
            if (user.login === '' && user.password === '') {
                setError('Поля не должны быть пустыми');
            }
        }
    };
    return (
        <div className='flex flex-col justify-center items-center gap-3 w-[500px] h-[350px] bg-black/70 rounded-xl' >
            <div className='text-white text-center '>
                <p className='text-red-500 text-3xl mb-2'>{error}</p>
                <h1 className='text-2xl'>Telegram Desktop</h1>
                <p>Добро пожаловать в Telegram  для ПК.</p>
                <p>Быстро и безопасный официальный клиент.</p>
            </div>
            <input className='bg-transparent border outline-green-500 border-gray-500 w-[350px] 
            h-[50px] rounded-xl px-3 text-white' type="text" placeholder='Leanne'
                onChange={onUserInput('login')} value={user.login} />
            <input className='bg-transparent border outline-green-500 border-gray-500 w-[350px]
             h-[50px] rounded-xl px-3 text-white' type="password" placeholder='asd123'
                onChange={onUserInput('password')} value={user.password} />
            <div className='flex gap-3 justify-end w-[70%]'>
                <button className='bg-slate-500 px-6 py-2 hover:bg-slate-600 rounded text-white' onClick={handleLogin}>Login</button>
            </div>

        </div>

    )
}
