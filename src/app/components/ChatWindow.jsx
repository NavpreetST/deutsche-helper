"use client"
import React from 'react'
import { useState } from 'react'
import Input from './Input';

const ChatWindow = () => {
    
    
    
    
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage]= useState();


   // In ChatWindow.js

const handleSendMessage = async (textFromInput) => {
  // console.log("ChatWindow.js: Received this value:", textFromInput);
  // 1. Immediately add the user's message to the chat
  const userMessage = {
    id: `msg${Date.now()}`, // Using timestamp for a more unique ID
    text: textFromInput,
    sender: 'user'
  };
  setMessages(prevMessages => [...prevMessages, userMessage]);

  try {
    // 2. Send the user's message to our new API endpoint
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: textFromInput }), // Send in the expected format
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    const botMessage = {
      id: `msg${Date.now() + 1}`,
      text: data.reply, // Use the reply from the API
      sender: 'bot'
    };

    // 3. Add the bot's response to the chat
    setMessages(prevMessages => [...prevMessages, botMessage]);

  } catch (error) {
    console.error("Failed to send message:", error);
    // Optional: Add an error message to the chat UI
    const errorMessage = {
      id: `err${Date.now()}`,
      text: 'Sorry, something went wrong. Please try again.',
      sender: 'bot'
    };
    setMessages(prevMessages => [...prevMessages, errorMessage]);
  }
};
    // const handleSendMessages = (textFromInput) =>{
    //     console.log(textFromInput)
    //     const newMessage = {
    //         id: `msg${messages.length + 1}`,
    //         text: textFromInput,
    //         sender: 'user'
    //     }
    //     setMessages([...messages, newMessage]);
    //     setNewMessage(null);
    //     console.log(messages)
    // }


  return (
    <div className="flex flex-col h-screen bg-violet-300 text-white">
      <div className="font-bold flex  justify-center text-violet-950  ">
    Teletraan-1

    </div>
      {/* Message List Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-2">
          {/* Messages will be mapped here */}
          {messages?.map((message) => (
            <div
              key={message.id}
              className={`p-2 rounded-lg max-w-lg ${
                message.sender === "user"
                  ? "bg-blue-300 self-end"
                  : "bg-gray-500 self-start"
              }`}
            >
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4">
        <Input onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatWindow