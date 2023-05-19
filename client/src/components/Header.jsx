import React, { useContext, useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { FaEllipsisV } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Context } from '../context/TelegramContext';
import { HeaderEllipseModal } from './HeaderEllipseModal';

export const Header = () => {
  const bgDark = useSelector(state => state.toolkit.bgDark);
  const { showContact, showSearchMesseges, setShowSeachMessages, showAboutContact, setShowAboutContact } = useContext(Context)
  const [showElModal, setShowElModal] = useState(false);
  const onDark = bgDark ? 'bg-black/70 text-white' : 'bg-white';
  const headerStyle = ['w-[100%] relative h-[10vh]  flex items-center justify-between pr-4', onDark];
  const iconsHover = bgDark ? 'hover:bg-gray-500 p-2 rounded-full' : 'hover:bg-gray-200 p-2 rounded-full';
  return (
    <div className={headerStyle.join(' ')}>
      {showContact && showContact.map(contact => (
        <div key={contact.id} className='flex gap-5 items-center text-2xl ml-10 cursor-pointer ' onClick={() => setShowAboutContact(!showAboutContact)}>
          <div className='flex items-center' >
            <img className='w-[55px] h-[55px] rounded-full' src={contact.img} alt={contact.firstName} />
          </div>
          <div className='m-0 text-[14px]'>
            <p className='text-3xl'>{contact.firstName} {contact.lastName}</p>
            {contact.status ? <span className='bg-green-500 px-3 py-1 rounded text-white'>Online</span> : <span className='bg-orange-500 px-3 py-1 rounded text-white'>Offline</span>}
          </div>
        </div>
      ))}
      <div className='flex items-center gap-3'>
        <span className={iconsHover}><AiOutlineSearch onClick={() => setShowSeachMessages(!showSearchMesseges)} className='z-10 text-3xl top-2 text-gray-400' /></span>
        <span className={iconsHover}><FaEllipsisV onClick={() => setShowElModal(!showElModal)} className='text-2xl' /></span>
      </div>
      {showElModal && <HeaderEllipseModal />}
    </div>
  )
}
