import Chatbot from 'react-chatbot-kit'
import './Chatbot.css'
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';
import 'react-chatbot-kit/build/main.css'


function Chatb() {
    return (
      <div className="App">
        <header className="App-header">
        <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser}/>
        </header>
      </div>
    );
  }
  
  export default Chatb;