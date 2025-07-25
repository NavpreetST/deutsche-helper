"use client"
import {useState} from 'react'

const Input = ({onSendMessage}) => {
  const [inputValue, setInputValue] = useState('');


    const handleSubmit = e =>{
      e.preventDefault();
      console.log("form submitted.");
      onSendMessage(inputValue);
      setInputValue("");
    }
  return (
  // We're putting the layout classes on the <form> because it's the PARENT
  // of the input and the button.
  <form 
  onSubmit={handleSubmit} 
  className="flex items-center w-full p-2 rounded-full bg-gray-800 border border-gray-600"
>
  {/* We can add a "prefix" button later if we want */ }

  <input
    type="text"
    placeholder="Enter your text"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    // The CHILD input.
    // flex-1 makes it grow.
    // bg-transparent makes its background invisible.
    // border-none and focus:ring-0 get rid of any default borders or outlines.
    className="flex-1 min-w-11/12 bg-transparent text-white placeholder-gray-400 border-none focus:ring-0"
  />

  <button
    type="submit"
    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={inputValue.trim() === ""}
  >
    {/* This is a simple Send icon. You can replace it with text or a better SVG icon later. */}
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009.82 16.57l4.982-1.424a1 1 0 00.992-.992l-1.424-4.982a1 1 0 00-1.403-.39l-1.428 5a1 1 0 001.409 1.169l7-14a1 1 0 000-1.788l-14-7z" />
    </svg>
  </button>

</form>
);
}

export default Input