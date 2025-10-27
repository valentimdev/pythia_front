import React, { useRef, useEffect } from 'react'; 
import './TextInput.css';

interface TextInputProps {
  value: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

function TextInput({ value, onChange, placeholder,onKeyDown }: TextInputProps) {

  const textareaRef = useRef<HTMLTextAreaElement>(null);

 
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`; 
    }
  }, [value]); 
  return (
    <div className='text_input'>

      <textarea
        className="input_text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        ref={textareaRef} 
        rows={1}         
      >
      </textarea>
    </div>
  );
}

export default TextInput;