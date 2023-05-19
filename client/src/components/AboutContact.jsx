import React, { useContext } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlinePhone } from 'react-icons/hi'
import { BsPencil } from "react-icons/bs";
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdAlternateEmail } from "react-icons/md"
import { RxSwitch } from "react-icons/rx"
import { useSelector } from 'react-redux';
import { Context } from '../context/TelegramContext';

export const AboutContact = () => {
    const bgDark = useSelector(state => state.toolkit.bgDark);
    const { showAboutContact, setShowAboutContact, showContact } = useContext(Context);

    const darkModeStyle = bgDark ? 'bg-black/70 text-white' : 'bg-white';
    const aboutContainer = !showAboutContact ? 'h-[100vh] w-[0px] searchMessegeNone searchMessege' : 'w-[600px] h-[100vh] searchMessege';
    const searchContainerStyles = [darkModeStyle, aboutContainer].join(' ');
    const hiddenMapContacts = !showAboutContact ? 'hidden' : '';
    const aboutMapContactStyle = ['px-5 flex flex-col gap-3 mt-7', hiddenMapContacts].join(' ')
    return (
        <div className={searchContainerStyles}>
            <div className='w-[100%] h-[10vh]  py-2 pr-2 pl-2 flex gap-2 justify-between items-center divSeach'>
                <div className='hover:bg-slate-300 rounded-full px-2 py-2' >
                    <AiOutlineClose onClick={() => setShowAboutContact(false)} className='text-3xl text-gray-500 cursor-pointer' />
                </div>
                <p className='text-3xl'>Информация</p>
                <div className='hover:bg-slate-300 rounded-full px-2 py-2' >
                    <BsPencil className='text-2xl text-gray-500 cursor-pointer' />
                </div>
            </div>
            <div className='py-2 divSeach w-[100%]' >
                {showContact && showContact.map(contact => (
                    <div key={contact.id} className='flex flex-col gap-5 items-center text-2xl cursor-pointer ' onClick={() => setShowAboutContact(!showAboutContact)}>
                        <div className='flex flex-col relative items-center ' >
                            <img className='w-[100%] h-[300px] ' src={contact.img} alt={contact.firstName} />
                            <p className='text-3xl absolute bottom-2 bg-black/20 px-2 left-2 text-white'>{contact.firstName} {contact.lastName}</p>
                        </div>
                    </div>
                ))}
            </div>
            {showContact.map(contact => (
                <div key={contact.id} className={aboutMapContactStyle}>
                    <div className='flex items-center gap-10'>
                        <HiOutlinePhone className='text-3xl text-gray-500' />
                        <div className='text-xl'>
                            <p>{contact.phone}</p>
                            <p className='text-gray-500 text-sm'>Телефон</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-10'>
                        <MdAlternateEmail className='text-3xl text-gray-500' />
                        <div className='text-xl'>
                            <p>{contact.email}</p>
                            <p className='text-gray-500 text-sm'>Имя пользователья</p>
                        </div>
                    </div>
                    <div className='flex gap-10 justify-between'>
                        <div className='flex gap-10'>
                            <IoMdNotificationsOutline className='text-3xl text-gray-500' />
                            <p className='text-xl'>Уведомление</p>
                        </div>
                        <RxSwitch className='text-3xl text-blue-500' />
                    </div>
                </div>
            ))}
        </div>
    )
}