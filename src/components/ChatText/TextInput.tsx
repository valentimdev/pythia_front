import React, { useRef, useEffect } from 'react'; // 1. Importações necessárias
import './TextInput.css';

interface TextInputProps {
  value: string;
  // 2. Mude a interface para 'HTMLTextAreaElement'
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

function TextInput({ value, onChange, placeholder }: TextInputProps) {
  // 3. Adicione o ref
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 4. Adicione este hook para o auto-crescimento
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reseta para poder encolher
      textarea.style.height = `${textarea.scrollHeight}px`; // Define para a altura do conteúdo
    }
  }, [value]); // Executa toda vez que o valor mudar

  return (
    <div className='text_input'>
      {/* 5. Mude <input> para <textarea> */}
      <textarea
        className="input_text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={textareaRef} // Conecte o ref
        rows={1}          // Começa com 1 linha
      >
      </textarea>
    </div>
  );
}

export default TextInput;