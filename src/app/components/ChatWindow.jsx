"use client"
import { useEffect, useState } from 'react';
import Input from './Input';
import FormattedText from './FormattedText';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        const data = await response.json();
        if (data.success) {
          setMessages(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async (textFromInput) => {
    const userMessage = {
      text: textFromInput,
      sender: 'user',
    };

    // Immediately update the UI with the user's message
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Save the user's message to the database
    await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userMessage),
    });

    try {
      // Get the bot's response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: textFromInput }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botResponse = '';

      const botMessageID = `bot-msg-${Date.now()}`;
      const botMessage = {
        id: botMessageID,
        text: "",
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const chunk = decoder.decode(value);
        botResponse += chunk;

        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === botMessageID
              ? { ...msg, text: botResponse }
              : msg
          )
        );
      }

      // Save the bot's message to the database
      await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: botResponse, sender: 'bot' }),
      });

    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage = {
        id: `err${Date.now()}`,
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
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
          {messages?.map((message, index) => (
            <div
              key={message._id || index}
              className={`p-3 rounded-lg max-w-lg ${
                message.sender === "user"
                  ? "bg-[#8A42F4] text-white self-end rounded-br-none"
                  : "bg-[#212121] text-[#F5F5F5] self-start rounded-bl-none"
              }`}
            >
              <FormattedText text={message.text} />
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
};

export default ChatWindow;
