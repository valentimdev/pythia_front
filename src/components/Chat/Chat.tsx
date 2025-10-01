import React from 'react'
import "./Chat.css";
import TextInput from '../ChatText/TextInput.tsx';
import balao from '@/assets/balao_duvida.svg'
function Chat() {
  return (
    <div className='chat_wrapper'> 
        <img className="question_ballon"src={balao}></img>
        <div className='chat_container'>
            <h1>RPG BOT</h1>
            <TextInput />
        </div>
    </div>
  )
}

export default Chat