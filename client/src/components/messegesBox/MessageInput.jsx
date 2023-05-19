import React, { useContext } from 'react'
import { CiFaceSmile } from "react-icons/ci";
import { MdAttachFile } from "react-icons/md";
import { BiMicrophone } from "react-icons/bi";
import EmojiPicker from 'emoji-picker-react'
import { Context } from '../../context/TelegramContext';

export const MessageInput = () => {

  const { inputMessageStyle, emojiVisible, setEmojiSelect, setEmojiVisible, addNewMessage,
    handleChange, newMessage, emojiSelect, microStyle } = useContext(Context);
  return (
    <div className='h-[10vh]  flex items-center gap-3 px-3 relative bottom-2 w-[100%]'>
      <div className={inputMessageStyle.join(" ")} >
        {/* <div className={!emojiVisible ? 'hidden' : 'block absolute top-[-450px]'}>
          <EmojiPicker onEmojiClick={(e) => {
            setEmojiSelect(e.emoji)
            setEmojiVisible(!emojiVisible)
          }} />
        </div> */}
        <CiFaceSmile onClick={() => setEmojiVisible(!emojiVisible)} className='text-3xl text-gray-500 cursor-pointer hover:text-blue-500' />
        <form className='w-[100%] flex' onSubmit={addNewMessage}>
          <input
            type="text"
            placeholder='Сообщение '
            className='w-[100%] outline-none h-[100%] px-2 bg-transparent'
            onChange={handleChange}
            value={newMessage.text}
          />
          {emojiSelect && (
            <span className="mx-2" role="img" aria-label="emoji">
              {emojiSelect}
            </span>
          )}
          <MdAttachFile className='text-3xl text-gray-500 cursor-pointer hover:text-blue-500' />
        </form>
      </div>
      <div className={`${microStyle} hover:bg-blue-500 hover:text-white`}>
        <BiMicrophone className='text-3xl text-gray-400 cursor-pointer  ' />
      </div>
    </div >
  )
}
