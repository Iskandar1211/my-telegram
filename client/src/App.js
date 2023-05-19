import { Telegram } from './components/Telegram';
import './App.css';
import { TelegramContext } from './context/TelegramContext';

function App() {
  return (
    <div className="">
      <TelegramContext>
        <Telegram />
      </TelegramContext>
    </div>
  );
}

export default App;
