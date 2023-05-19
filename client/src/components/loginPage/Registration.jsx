import React, {  useState } from 'react'

export const Registration = ({ setRegistrad }) => {

    const [user, setUser] = useState({
        id: '',
        login: '',
        password: '',
        firstName: "",
        lastName: "",
        countMessage: 0,
        status: true,
        phone: "",
        email: "",
        img: "",
        messege: ""
    })
    console.log(user);
    const onUserInput = (key) => (e) => {
        setUser(
            { ...user, id: crypto.randomUUID(), [key]: e.target.value }
        )
    }

    const [registredText, setRegistredText] = useState('Registration');
    const onRegister = () => {
        setRegistredText('Registered')
        fetch('http://localhost:3001/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...user, id: crypto.randomUUID() })
        })
        setUser({
            id: '',
            login: '',
            password: ''
        })
    };
    const [error, setError] = useState('');

    const inputsStyles = ['bg-white border outline-green-500 border-gray-500 w-[350px] h-[60px] rounded-xl px-3 '].join(' ')
    const registrationStyle = [' px-6 py-2 hover:bg-green-600 rounded text-white',
        registredText === 'Registration' ? 'bg-green-500' : 'bg-orange-500'].join(' ');
    return (
        <div className='flex flex-col justify-center items-center gap-3 w-[500px] h-[600px] bg-black/70 rounded-xl py-3' >
            <div className='text-white text-center '>
                <p className='text-red-500 text-3xl mb-2'>{error}</p>
                <h1 className='text-2xl'>Telegram Desktop</h1>
                <p>Добро пожаловать в Telegram  для ПК.</p>
                <p>Быстро и безопасный официальный клиент.</p>
            </div>
            <input className={inputsStyles} type="text" placeholder='login'
                onChange={onUserInput('login')} value={user.login} />

            <input className={inputsStyles} type="password" placeholder='password'
                onChange={onUserInput('password')} value={user.password} />

            <input className={inputsStyles} type="text" placeholder='firstName'
                onChange={onUserInput('firstName')} value={user.firstName} />

            <input className={inputsStyles} type="text" placeholder='lastName'
                onChange={onUserInput('lastName')} value={user.lastName} />

            <input className={inputsStyles} type="text" placeholder='phone'
                onChange={onUserInput('phone')} value={user.phone} />

            <input className={inputsStyles} type="text" placeholder='email'
                onChange={onUserInput('email')} value={user.email} />

            <input className={inputsStyles} type="text" placeholder='img'
                onChange={onUserInput('img')} value={user.img} />

            <div className='flex gap-3 justify-end w-[70%]'>
                <button className={registrationStyle} onClick={() => { onRegister(); setRegistrad(true) }}>{registredText}</button>
            </div>
        </div>
    )
}
