"use client"
import {useState, useRef} from 'react'

const Input = ({onSendMessage}) => {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  // const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef(null);

  const handleListen = () => {
  if (isListening) {
    // If we're listening, we need to stop.
    // The machine is in our ref, so we use it.
    recognitionRef.current.stop();

    // We can also confidently set isListening to false here.
    setIsListening(false);

  } else {
    // If we're not listening, we need to start.

    // 1. Create the new machine.
    const recognition = new webkitSpeechRecognition();
    
    // 2. Put it in our ref box so we can access it later.
    recognitionRef.current = recognition;
    
    // 3. Configure it...
    recognition.lang = 'de';
    recognition.interimResults = true;

    // 4. Set up the event handlers...
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setInputValue(transcript);
    };

    // This is a good place to handle the end of speech.
    recognition.onend = () => {
      setIsListening(false);
    };

    // 5. Start the machine that we just configured.
    recognition.start();

    // 6. Set our state to true so the UI updates.
    setIsListening(true);
  }
};


    const handleSubmit = e =>{
      e.preventDefault();
      console.log("form submitted.");
      onSendMessage(inputValue);
      setInputValue("");
    }
  return (
    
  <form 
  onSubmit={handleSubmit} 
  className="flex items-center w-full p-2 rounded-full bg-[#212121] border border-[#2E2E2E]"
>
  {/* We can add a "prefix" button later if we want */ }

  <input
    type="text"
    placeholder="Enter your text"
    value={inputValue}
    // className="border-2 border-transparent"
    onChange={(e) => setInputValue(e.target.value)}
    
    className="flex-1 bg-transparent text-white placeholder-gray-400 border-none focus:ring-0"
  />

  <button
    type="submit"
    className="p-2 rounded-full bg-[#8A42F4] text-white hover:bg-[#772CE8] disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={inputValue.trim() === ""}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009.82 16.57l4.982-1.424a1 1 0 00.992-.992l-1.424-4.982a1 1 0 00-1.403-.39l-1.428 5a1 1 0 001.409 1.169l7-14a1 1 0 000-1.788l-14-7z" />
    </svg>
  </button>
  <button className='p-2 rounded-full text-[#A3A3A3] hover:bg-[#313131]' onClick={handleListen}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
      <path fillRule="evenodd" d="M7 3a1 1 0 00-1 1v6a5 5 0 0010 0V4a1 1 0 00-1-1h-1.28A5.966 5.966 0 0010 2a5.966 5.966 0 00-4.72 1H4a1 1 0 00-1 1v6a7 7 0 1014 0V4a1 1 0 00-1-1h-1.28A5.966 5.966 0 0010 2a5.966 5.966 0 00-4.72 1H4z" clipRule="evenodd" />
    </svg>
  </button>
{/* onClick = {() => {handleListen()}} */}
</form>
);
}

export default Input