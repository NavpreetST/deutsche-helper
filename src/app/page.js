
'use client';
import { useEffect, useState } from 'react';
import ChatWindow from "./components/ChatWindow";
import SideBar from "./components/SideBar";

const NEW_CHAT_ID = 'new';

function App() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);

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
      if (activeConversation && activeConversation._id) {
        try {
          const response = await fetch(`/api/messages?conversationId=${activeConversation._id}`);
          const data = await response.json();
          if (data.success) {
            const updatedConversations = conversations.map((conv) =>
              conv._id === activeConversation._id
                ? { ...conv, messages: data.data }
                : conv
            );
            setConversations(updatedConversations);
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
  };

  const handleSendMessage = async (text) => {
    let currentConversation = activeConversation;

    if (currentConversation.id === NEW_CHAT_ID) {
      // Create a new conversation
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: text.substring(0, 20) }),
      });
      const data = await response.json();
      if (data.success) {
        currentConversation = data.data;
        setConversations([currentConversation, ...conversations]);
        setActiveConversation(currentConversation);
      }
    }

    const userMessage = {
      conversationId: currentConversation._id,
      text,
      sender: 'user',
    };

    // Save the user's message
    await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userMessage),
    });

    // Get the bot's response
    const botResponse = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: text }),
    });

    const reader = botResponse.body.getReader();
    const decoder = new TextDecoder();
    let botText = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      botText += decoder.decode(value);
    }

    const botMessage = {
      conversationId: currentConversation._id,
      text: botText,
      sender: 'bot',
    };

    // Save the bot's message
    await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(botMessage),
    });

    // Refresh messages for the active conversation
    const response = await fetch(`/api/messages?conversationId=${currentConversation._id}`);
    const data = await response.json();
    if (data.success) {
      const updatedConversations = conversations.map((conv) =>
        conv._id === currentConversation._id
          ? { ...conv, messages: data.data }
          : conv
      );
      setConversations(updatedConversations);
    }
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
          conversation={activeConversation} 
          onSendMessage={handleSendMessage} 
        />
      )}
    </div>
  );
}

export default App;
