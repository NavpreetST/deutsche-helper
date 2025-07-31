'use client';
import { useEffect, useState } from 'react';
import ChatWindow from "./components/ChatWindow";
import SideBar from "./components/SideBar";

const NEW_CHAT_ID = 'new';

function App() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [chatWindowKey, setChatWindowKey] = useState(Date.now());

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('/api/chats');
        const data = await response.json();
        if (data.success) {
          setChats(data.data);
          if (data.data.length > 0) {
            setActiveChat(data.data[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (activeChat && activeChat._id && !activeChat.messages) {
        try {
          const response = await fetch(`/api/chats/${activeChat._id}`);
          const data = await response.json();
          if (data.success) {
            setActiveChat(data.data);
          }
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      }
    };

    fetchMessages();
  }, [activeChat]);

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
  };

  const handleNewChat = () => {
    setActiveChat({ id: NEW_CHAT_ID, title: 'New Chat', messages: [] });
    setChatWindowKey(Date.now());
  };

  const handleSendMessage = async (text) => {
    let currentChat = activeChat;
    const userMessage = { text, sender: 'user' };

    // Optimistic update for user message
    setActiveChat(prev => ({ ...prev, messages: [...(prev.messages || []), userMessage] }));

    if (currentChat.id === NEW_CHAT_ID) {
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: text.substring(0, 30), messages: [userMessage] }),
      });
      const data = await response.json();
      if (data.success) {
        currentChat = data.data;
        setChats([currentChat, ...chats]);
        setActiveChat(currentChat);
      } else {
        return;
      }
    }

    // Get bot response
    const botResponseStream = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    });

    const reader = botResponseStream.body.getReader();
    const decoder = new TextDecoder();
    let botText = '';
    const botMessage = { text: '', sender: 'bot' };
    
    // Optimistic update for bot message placeholder
    setActiveChat(prev => ({ ...prev, messages: [...prev.messages, botMessage] }));

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      botText += decoder.decode(value);
      setActiveChat(prev => ({
        ...prev,
        messages: prev.messages.map((msg, index) => 
          index === prev.messages.length - 1 ? { ...msg, text: botText } : msg
        ),
      }));
    }

    // Save final bot message to DB
    await fetch(`/api/chats/${currentChat._id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: botText, sender: 'bot' }),
      }
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar
        conversations={chats}
        onSelectConversation={handleSelectChat}
        activeConversation={activeChat}
        onNewChat={handleNewChat}
      />
      {activeChat && (
        <ChatWindow 
          key={chatWindowKey}
          conversation={activeChat} 
          onSendMessage={handleSendMessage} 
        />
      )}
    </div>
  );
}

export default App;
