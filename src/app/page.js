'use client';
import { useEffect, useState } from 'react';
import ChatWindow from "./components/ChatWindow";
import SideBar from "./components/SideBar";

const NEW_CHAT_ID = 'new';

function App() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [chatWindowKey, setChatWindowKey] = useState(Date.now());

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch('/api/conversations');
        const data = await response.json();
        if (data.success) {
          setConversations(data.data);
          if (data.data.length > 0) {
            setActiveConversation(data.data[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (activeConversation && activeConversation._id && !activeConversation.messages) {
        try {
          const response = await fetch(`/api/messages?conversationId=${activeConversation._id}`);
          const data = await response.json();
          if (data.success) {
            setActiveConversation(prev => ({ ...prev, messages: data.data }));
          }
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      }
    };

    fetchMessages();
  }, [activeConversation]);

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
  };

  const handleNewChat = () => {
    setActiveConversation({ id: NEW_CHAT_ID, title: 'New Chat', messages: [] });
    setChatWindowKey(Date.now());
  };

  const handleSendMessage = async (text) => {
    let currentConversation = activeConversation;
    const userMessage = { text, sender: 'user' };

    // Optimistic update for user message
    setActiveConversation(prev => ({ ...prev, messages: [...(prev.messages || []), userMessage] }));

    if (currentConversation.id === NEW_CHAT_ID) {
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: text.substring(0, 30) }),
      });
      const data = await response.json();
      if (data.success) {
        currentConversation = data.data;
        currentConversation.messages = [userMessage]; // Add the first message
        setConversations([currentConversation, ...conversations]);
        setActiveConversation(currentConversation);
      } else {
        // Handle error - maybe show a toast notification
        return;
      }
    }

    // Save user message to DB
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...userMessage, conversationId: currentConversation._id }),
    });

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
    setActiveConversation(prev => ({ ...prev, messages: [...prev.messages, botMessage] }));

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      botText += decoder.decode(value);
      setActiveConversation(prev => ({
        ...prev,
        messages: prev.messages.map((msg, index) => 
          index === prev.messages.length - 1 ? { ...msg, text: botText } : msg
        ),
      }));
    }

    // Save final bot message to DB
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: botText, sender: 'bot', conversationId: currentConversation._id }),
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar
        conversations={conversations}
        onSelectConversation={handleSelectConversation}
        activeConversation={activeConversation}
        onNewChat={handleNewChat}
      />
      {activeConversation && (
        <ChatWindow 
          key={chatWindowKey}
          conversation={activeConversation} 
          onSendMessage={handleSendMessage} 
        />
      )}
    </div>
  );
}

export default App;