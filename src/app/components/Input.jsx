"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

const Input = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleListen = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      const recognition = new webkitSpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = "de";
      recognition.interimResults = true;
      recognition.onresult = (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
        setInputValue(transcript);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.start();
      setIsListening(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(inputValue);
    setInputValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full p-2 rounded-full bg-[#212121]"
    >
      <input
        type="text"
        placeholder="Enter your text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1 bg-transparent text-white placeholder-gray-400 border-none focus:ring-0"
      />

      <motion.button
        type="submit"
        className="p-2 rounded-full bg-[#8A42F4] text-white disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={inputValue.trim() === ""}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2z" />
        </svg>
      </motion.button>
      <motion.button
        className="p-2 rounded-full text-[#A3A3A3] hover:bg-[#313131]"
        onClick={handleListen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          scale: isListening ? [1, 1.2, 1] : 1,
          transition: isListening
            ? { duration: 1, repeat: Infinity }
            : { duration: 0.2 },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
          <path
            fillRule="evenodd"
            d="M7 3a1 1 0 00-1 1v6a5 5 0 0010 0V4a1 1 0 00-1-1h-1.28A5.966 5.966 0 0010 2a5.966 5.966 0 00-4.72 1H4a1 1 0 00-1 1v6a7 7 0 1014 0V4a1 1 0 00-1-1h-1.28A5.966 5.966 0 0010 2a5.966 5.966 0 00-4.72 1H4z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>
    </form>
  );
};

export default Input;
