import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import TextInput from '../ChatText/TextInput.tsx';
import balao from '@/assets/balao_duvida.svg';
import feather from '@/assets/feather.svg';
import globo from '@/assets/globo_olho.svg';
import ChatBox from '../ChatBox/ChatBox.tsx';

interface Message {
  id: number;
  text: string;
}
function Chat() {
  //mensagens que sao ser displayadas na caixa
  const [messages, setMessages] = useState<Message[]>([]);
  //nova mensagem que vai vir do usuario
  const [newMessage, setNewMessage] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("teste")

    if (newMessage.trim() === '') {
      return;
    }
    setMessages([
      ...messages,
      { id: Date.now(), text: newMessage }, 
    ]);
    setNewMessage('');
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="chat_wrapper">
      <img className="question_ballon" src={balao}></img>
      <div className="chat_container">
        <div className="logo">
        <h1>Pythia</h1>
        {/* <img className="globo" src={globo}></img> */}
        </div>
        <div className="messages_area">
          {messages.map((message) => (
            <div className="message_bubble" key={message.id}>
              <p className="usuario_text">{message.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form  className="input_area" onSubmit={handleSendMessage}>
          <TextInput 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."/>
          <button type="submit"><img className="feather" src={feather}></img>
          </button>
          </form>
        </div>
      </div>
    
  );
}

export default Chat;
