import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import TextInput from '../ChatText/TextInput.tsx';
import balao from '@/assets/balao_duvida.svg';
import feather from '@/assets/feather.svg';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'oracle';
  fullText?: string;
}
function Chat() {
  //mensagens que sao ser displayadas na caixa
  const [messages, setMessages] = useState<Message[]>([]);
  //nova mensagem que vai vir do usuario
  const [newMessage, setNewMessage] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  
  const lastMessage = messages[messages.length - 1];

  const showLoadingDots = isLoading && (!lastMessage || lastMessage.sender === 'user');

    const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessage.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const currentMessage = newMessage;
    setNewMessage('');
    setIsLoading(true);

    try {

      const apiUrl = import.meta.env.VITE_API_URL;
      
      if (!apiUrl) {
        throw new Error("A URL da API não está configurada no arquivo .env");
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ message: currentMessage }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Erro na resposta da API: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      

      const fullOracleText = data.message; 

      if (typeof fullOracleText !== 'string') {
          throw new Error("Formato de resposta da API inesperado.");
      }

      const oracleResponse: Message = {
        id: Date.now(),
        text: '',
        sender: 'oracle',
        fullText: fullOracleText,
      };

      setMessages((prevMessages) => [...prevMessages, oracleResponse]);

    } catch (error) {
      console.error("Falha ao comunicar com o oráculo Pythia:", error);
      const errorResponse: Message = {
        id: Date.now(),
        text: '',
        sender: 'oracle',
        fullText: "Desculpe, viajante. Minhas visões estão turvas... Tente novamente mais tarde.",
      };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    }

  };


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (
      lastMessage &&
      lastMessage.sender === 'oracle' &&
      lastMessage.fullText &&
      lastMessage.text.length < lastMessage.fullText.length
    ) {
      const intervalId = setInterval(() => {
        setMessages((prevMessages) => {
          const currentLastMessage = prevMessages[prevMessages.length - 1];

          if (!currentLastMessage || !currentLastMessage.fullText) {
            clearInterval(intervalId);
            return prevMessages;
          }

          if (
            currentLastMessage.text.length ===
            currentLastMessage.fullText.length
          ) {
            clearInterval(intervalId);
            return prevMessages;
          }

          const newMessages = [...prevMessages];
          const nextCharIndex = currentLastMessage.text.length;

          newMessages[newMessages.length - 1].text +=
            currentLastMessage.fullText[nextCharIndex];

          if (
            newMessages[newMessages.length - 1].text.length ===
            currentLastMessage.fullText.length
          ) {
            clearInterval(intervalId);
            setIsLoading(false);
          }

          return newMessages;
        });
      }, 15);

      return () => clearInterval(intervalId);
    }
  }, [messages]);
  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };
  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      closeDialog();
    }
  };
  return (
    <div className="chat_wrapper">
      <button onClick={openDialog}>
        <img className="question_ballon" src={balao}></img>
      </button>

      <dialog
        ref={dialogRef}
        className="meu-dialog"
        onClick={handleDialogClick}
      >
        <h2>Ola Viajante!</h2>
        <p>
          Pythia é um oráculo digital criado para ajudar Mestres de RPG a forjar
          cenários, tecer histórias e dar vida a personagens.
        </p>
        <h2>Como funciona?</h2>
        <p>
          É simples: comece me dando uma ideia, uma palavra-chave ou um
          conceito. Peça por "uma taverna suspeita", "um vilão que usa magia de
          sangue" ou "uma missão para resgatar um artefato perdido". A partir da
          sua faísca de inspiração, eu criarei os detalhes para você. O que
          vamos criar hoje?
        </p>
        <button className="fechar" onClick={closeDialog}>
          Fechar
        </button>
      </dialog>
      <div className="chat_container">
        <div className="logo">
          <h1>Pythia</h1>
          {/* <img className="globo" src={globo}></img> */}
        </div>
        <div className={`messages_area ${isLoading ? 'scroll-locked' : ''}`}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message_row ${
                message.sender === 'user' ? 'user_row' : 'oracle_row'
              }`}
            >
              <div className="message_bubble">
                <div className="caixa_mensagem">
                  <p className="message_text">{message.text}</p>
                </div>
                <div className="caixa_remetente">
                  <p>{message.sender === 'user' ? 'Viajante' : 'Pythia'}</p>
                </div>
              </div>
            </div>
          ))}
          {showLoadingDots && (
      <div className="message_row oracle_row" id="loading-bubble">
        <div className="message_bubble">
          <div className="caixa_mensagem">
            {/* Usamos a classe CSS que criamos */}
            <p><span className="loading-dots"></span></p> 
          </div>
          <div className="caixa_remetente">
            <p>Pythia</p>
          </div>
        </div>
      </div>
    )}
          <div ref={messagesEndRef} />
        </div>
        <form className="input_area" onSubmit={handleSendMessage}>
          <TextInput
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
          />
          <button type="submit" disabled={isLoading}>
            <img className="feather" src={feather}></img>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
