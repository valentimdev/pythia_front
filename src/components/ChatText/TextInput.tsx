import React from 'react'
import './TextInput.css';
interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; 
}
function TextInput({ value, onChange, placeholder }: TextInputProps) {
  return (
    <div className='text_input'>
      <input type="text"className="input_text"
        value={value}
      onChange={onChange}
      placeholder={placeholder}>
    </input></div>
  )
}

export default TextInput