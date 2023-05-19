import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux'
import { Context } from '../context/TelegramContext';
import { ContactMessageText } from './ContactMessageText';

export const Contact = ({contact}) => {
    const bgDark = useSelector(state => state.toolkit.bgDark);
    const { showHeaderContact, onContactClick, selectShoose, choosenContact } = useContext(Context);
    const [action, setAction] = useState(false);

    const [count, setCount] = useState(0);

    const getCount = (id) => {
        setCount(id)
    }

    const hoverBgDark = bgDark ? 'hover:bg-slate-600' : 'hover:bg-slate-300'
    const choseBgDark = bgDark ? 'bg-slate-600' : 'bg-slate-300'
    const contactStyle = [
        'flex items-center gap-5 text-2xl cursor-pointer rounded pl-2 py-2 relative',
        contact.id === (choosenContact && choosenContact.id) ? choseBgDark : '', hoverBgDark];
    return (
        <div onClick={() => {
            showHeaderContact(contact.id);
            onContactClick(contact.id);
            selectShoose();
            setAction(!action)
        }}
            className={contactStyle.join(' ')}>
            <img className='w-[55px] h-[55px] rounded-full' src={contact.img} alt={contact.firstName} />
            <div>
                <p>{ contact.firstName} {contact.lastName}</p>
                <div className='text-[17px]'>{
                    <ContactMessageText getCount={getCount} contact={contact}/>}</div>
            </div>
            <div className='text-[16px] bg-green-500 px-3 rounded-3xl text-white absolute right-2'>
                {count && count}
            </div>
        </div>
    )
}
