import React from 'react'
import { HiOutlineBellSlash, HiOutlineCheckCircle } from "react-icons/hi2";
import { BsFlag } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector } from 'react-redux';

export const HeaderEllipseModal = () => {
    const bgDark = useSelector(state => state.toolkit.bgDark);
    const darkModeStyle = bgDark ? 'bg-black/70 text-white' : 'bg-gray-100/100';
    const styleHeaderEllipse = ['flex flex-col gap-2 absolute w-[240px] px-4 py-2 h-[150px] top-[80px] rounded-xl right-5', darkModeStyle]
    return (
        <div className={styleHeaderEllipse.join(" ")}>
            <p className='flex gap-2 items-center hover:bg-gray-200 px-1 rounded cursor-pointer'> <HiOutlineBellSlash />Убрать звук</p>
            <p className='flex gap-2 items-center hover:bg-gray-200 px-1 rounded cursor-pointer'><HiOutlineCheckCircle /> Выберите сообщения</p>
            <p className='flex gap-2 items-center hover:bg-gray-200 px-1 rounded cursor-pointer'><BsFlag />Пожаловаться</p>
            <p className='text-red-600 border-t-2 pt-1 border-gray-300 flex gap-2 items-center hover:bg-gray-200 px-1 rounded cursor-pointer'> <MdOutlineDeleteOutline /> Покинуть группу</p>
        </div>
    )
}
