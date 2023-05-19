import React, { useContext } from 'react'
import { Contact } from './Contact';
import { SearchContact } from './SearchContact';
import { useSelector } from 'react-redux'
import { Context } from '../context/TelegramContext';


export const ContactList = () => {
  const bgDark = useSelector(state => state.toolkit.bgDark);
  const { filterContacts } = useContext(Context)

  const darkModeStyle = bgDark ? 'bg-black/70 text-white' : '';
  const contactListStyle = [`px-3 py-3 h-[100vh] w-[30%] contactList`, darkModeStyle].join(' ');

  return (
    <div className={contactListStyle}  >
      <SearchContact />
      <div className='flex flex-col gap-1 '>
        {filterContacts.map(contact => (
          < Contact
            key={contact.id}
            contact={contact}
          />
        ))}
      </div>
    </div>
  )
}
