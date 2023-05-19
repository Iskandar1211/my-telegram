import { useSelector } from 'react-redux';
import { Header } from '../Header';
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'
import { SearchMessage } from '../SearchMessage';
import { AboutContact } from '../AboutContact';

export const MessageBox = () => {
  const bgDark = useSelector(state => state.toolkit.bgDark);

  return (
    <div className='flex w-[70%] h-[100vh]'>
      <div className='h-[100vh] w-[100%] bg-green-200' style={bgDark ? { backgroundImage: 'url(bg-dark-telegram.png)' } : { backgroundImage: 'url(bg-telegram.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <Header />
        <MessageList />
        <MessageInput />
      </div>
      {<AboutContact />}
      { <SearchMessage />}
    </div>
  )
}
