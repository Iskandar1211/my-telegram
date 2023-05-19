import React, { useContext } from 'react'
import { Context } from '../context/TelegramContext'
import { ContactList } from './ContactList'
import { LoginPage } from './loginPage/LoginPage'
import { MessageBox } from './messegesBox/MessageBox'
import { ShowBurgerMenu } from './ShowBurgerMenu'


export const Telegram = () => {
    const { loggedIn } = useContext(Context)

    return (
        <>
            {loggedIn ?
                <div className='flex relative'>
                    <ContactList />
                    <MessageBox />
                    <ShowBurgerMenu />
                </div>
                : <div style={{ backgroundImage: "url(loginBg.jpg)", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='flex justify-center h-[100vh] items-center bg-gray-300'>
                    <LoginPage />
                </div>
            }
        </>

    )
}
