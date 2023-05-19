import React, { useContext } from 'react'
import { FiEdit } from 'react-icons/fi'
import { TiDeleteOutline } from 'react-icons/ti'
import { Context } from '../../context/TelegramContext'
import { EditMessage } from '../EditMessage'

export const Message = ({ message }) => {
    const { darkModeStyle, editingMessageId,
        handleUpdateMessage, setEditingMessageId, deleteMessage, choosenContact, contacts } = useContext(Context)
    const reverse = message.receiverId !== choosenContact.id ? 'flex-row-reverse' : ''
    const incomingMessageStyle = ['w-[100%] flex justify-end items-end mb-2  relative', reverse].join(' ');
    return (
        <div key={message?.id} className={incomingMessageStyle}>
            <div className={darkModeStyle}>
                <h1 className='font-bold text-blue-400 flex items-center justify-between gap-3'>
                    {contacts && contacts.map(contact => (contact.id === message.receiverId) &&
                        (<div className='flex gap-2' key={contact.id}>
                            <span>{contact.firstName}</span>
                            <span>{contact.lastName}</span>
                        </div>)
                    )}
                    {editingMessageId === message?.id ? (
                        <EditMessage message={message} onUpdate={handleUpdateMessage} />
                    ) : (
                        <FiEdit onClick={() => setEditingMessageId(message.id)} />
                    )}
                    < TiDeleteOutline onClick={() => deleteMessage(message.id)} /></h1>
                <h1 key={message.id}>{message.emoji}{message.text}</h1>
                <p className='text-sm text-end text-gray-400'>{message.date}</p>
            </div>
        </div>
    )
}
