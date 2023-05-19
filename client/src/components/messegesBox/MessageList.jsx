import React, { useContext, useEffect, useRef } from 'react'
import { Context } from '../../context/TelegramContext';
import { Message } from './Message';

export const MessageList = () => {
    const { filteredMessages, choosenContact, mListStyle, messages } = useContext(Context)
    const messageList = useRef();

    useEffect(() => {
        messageList.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (
        <div className={`${mListStyle}, messegeList pb-[100px]`} >
            <div >
                {(choosenContact) && filteredMessages.map(message => (
                    <Message
                        key={message.id}
                        message={message}
                    />
                ))}
                <div ref={messageList} />
            </div>
        </div>
    )
}
