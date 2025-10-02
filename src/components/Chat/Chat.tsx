import React from 'react'
import "./Chat.css";
import TextInput from '../ChatText/TextInput.tsx';
import balao from '@/assets/balao_duvida.svg'
import feather from '@/assets/feather.svg'
import ChatBox from '../ChatBox/ChatBox.tsx';
function Chat() {
  return (
    <div className='chat_wrapper'> 
        <img className="question_ballon"src={balao}></img>
        <div className='chat_container'>
            <h1>RPG BOT</h1>
            <div className='chat_log'></div>
            <div className="input_area">
              <TextInput />
              <img className="feather"src={feather}></img>
              </div>
        </div>
    </div>
  )
}

export default Chat