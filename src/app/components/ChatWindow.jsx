"use client"
import React from 'react'
import { useState } from 'react'
import Input from './Input';

const ChatWindow = () => {
    
    
    
    
    const [messages, setMessages] = useState([]);

    const [latestMessage, setLatestMessage] = useState(null);

    


    
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
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    // const data = await response.json();


    const botMessageID = `bot-msg-${Date.now() +1}`
    const botMessage = {
      id: `${botMessageID}`,
      text: "", // Use the reply from the API
      sender: 'bot'
    };
    setMessages(prevMessages => [...prevMessages, botMessage]);



    while (true) {



      const {value, done} = await reader.read();
      
      if(done){
        break;
      }
      const chunk = decoder.decode(value)
      
      setMessages((prevMessages) =>
        prevMessages.map((msg) => {
          if (msg.id === botMessageID) {
            // This is the one we want to update!
            // Return a NEW object with the updated text.
            return { ...msg, text: msg.text + chunk };
          } else {
            // This is not the message we're looking for.
            // Return it unchanged.
            return msg;
          }
        })
      );
    }

    // 3. Add the bot's response to the chat
    // setMessages(prevMessages => [...prevMessages, botMessage]);

  } catch (error) {
    console.error("Failed to send message:", error);
    // Optional: Add an error message to the chat UI
    const errorMessage = {
      id: `err${Date.now()}`,
      text: 'Sorry, something went wrong. Please try again.',
      sender: 'bot'
    };

  }
};
   

  return (
    <div className="flex flex-col flex-1 h-full bg-[#171717] text-white">
      <div className="font-bold flex justify-center text-[#F5F5F5] text-2xl p-4 border-b border-[#2E2E2E]">
        Teletraan-1
      </div>
      {/* Message List Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex flex-col space-y-4">
          {/* Messages will be mapped here */}
          {messages?.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg max-w-lg ${
                message.sender === "user"
                  ? "bg-[#8A42F4] text-white self-end rounded-br-none"
                  : "bg-[#212121] text-[#F5F5F5] self-start rounded-bl-none"
              }`}
            >
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[#2E2E2E]">
        <Input onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatWindow