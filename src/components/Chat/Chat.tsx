import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import TextInput from '../ChatText/TextInput.tsx';
import balao from '@/assets/balao_duvida.svg';
import feather from '@/assets/feather.svg';
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
        <h1>RPG BOT</h1>
        <div className="messages_area">
          {messages.map((message) => (
            // 2. Cada mensagem agora usa a classe 'message_bubble'
            <div className="message_bubble" key={message.id}>
              <p>{message.text}</p>
            </div>
          ))}
          {/* Este div vazio ajuda a rolagem a funcionar corretamente */}
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
