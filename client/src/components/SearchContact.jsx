import React, { useContext } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from 'react-redux'
import { Context } from '../context/TelegramContext';

export const SearchContact = () => {
    const { handleSearch, setShowMenuBurger, showMenuBurger } = useContext(Context)

    const bgDark = useSelector(state => state.toolkit.bgDark);
    const onDarkMode = bgDark ? 'text-black' : '';
    const darkHowerBurger = bgDark ? 'hover:bg-slate-600 rounded-full px-2 py-2' : 'hover:bg-slate-300 rounded-full px-2 py-2';
    const styleSeContact = ['w-[100%] py-2 flex gap-2 justify-around items-center', onDarkMode]

    return (
        <div className={styleSeContact.join(' ')}>
            <div className={darkHowerBurger} >
                <RxHamburgerMenu onClick={() => setShowMenuBurger(!showMenuBurger)} className={bgDark ? 'text-white text-3xl' : 'text-3xl text-gray-500'} />
            </div>
            <div className='w-[80%] rounded-full relative'>
                <AiOutlineSearch className='absolute z-10 text-2xl top-3 left-3 text-gray-400' />
                <input onChange={(e) => handleSearch(e)} className='rounded-full w-[100%] h-[45px] outline-none focus:border-blue-500 pl-11 pr-2 py-1 border-[2px] border-gray-300' type="search" placeholder='Search contact' />
            </div>

        </div>
    )
}
