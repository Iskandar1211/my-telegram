import React, { useContext } from 'react'
import { FiBookmark } from "react-icons/fi";
import { CiUser, CiSettings } from "react-icons/ci";
import { BsMoonStars } from "react-icons/bs";
import { FaToggleOff, FaToggleOn, FaHubspot } from "react-icons/fa";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { AiOutlineBug } from "react-icons/ai";
import { TbLetterK } from "react-icons/tb";
import { IoExitOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import { setBgDark } from '../toolkitRedux/toolkitReducer';
import { Context } from '../context/TelegramContext';

export const ShowBurgerMenu = () => {
    const {showMenuBurger, setLoggedIn} = useContext(Context)
    const bgDark = useSelector(state => state.toolkit.bgDark);
    const dispatch = useDispatch();
    const darkModeStyle = bgDark ? 'bg-black/90 text-white' : 'bg-gray-100/100';
    const animateShowing = !showMenuBurger ? 'scale-0 transition-all' : 'scale-1 transition-all';
    const stylesForBurgerMenu = [animateShowing, 'absolute left-7 top-[70px]  w-[270px] px-3 py-3 text-xl items-start text-gray-500 flex flex-col gap-2'];
    const itemsHoverEffect = bgDark ? 'hover:bg-gray-600' : 'hover:bg-gray-300';
    const stylesItems = ['flex gap-3 items-center  w-[100%] rounded cursor-pointer', itemsHoverEffect];
    const exit = () => {
        setLoggedIn(false)
        window.location.reload()
    }
    return (
        <div className={`${stylesForBurgerMenu.join(' ')}, ${'showBurger'}, ${darkModeStyle}`}>
            <p className={stylesItems.join(' ')}><FiBookmark className='' />Избранное</p>
            <p className={stylesItems.join(' ')}><CiUser />Контакты</p>
            <p className={stylesItems.join(' ')}><CiSettings />Настройки</p>
            <p onClick={() => dispatch(setBgDark())} className={stylesItems.join(' ')}><BsMoonStars />Ночной режим{bgDark ? <FaToggleOn /> : <FaToggleOff />}</p>
            <p className={stylesItems.join(' ')}><FaHubspot /> Анимация <FaToggleOn /></p>
            <p className={stylesItems.join(' ')}><RxQuestionMarkCircled />Вазможности телеграм</p>
            <p className={stylesItems.join(' ')}><AiOutlineBug />Report Bug</p>
            <p className={stylesItems.join(' ')}><TbLetterK /> Swith to K Version</p>
            <p onClick={exit} className='flex gap-3 items-center hover:bg-red-950  w-[100%] rounded cursor-pointer' style={{ color: 'red' }}><IoExitOutline /> Выход</p>
            <div>
            </div>
        </div>
    )
}
