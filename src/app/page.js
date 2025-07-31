
'use client';
import { useState } from 'react';
import ChatWindow from "./components/ChatWindow";
import SideBar from "./components/SideBar";

const NEW_CHAT_ID = 'new';

function App() {
  const [conversations, setConversations] = useState([
    { id: 1, title: 'First Chat', messages: [{id: 1, text: "hello"}] },
    { id: 2, title: 'Second Chat', messages: [] },
    { id: 3, title: 'Third Chat', messages: [] },
  ]);
  const [activeConversation, setActiveConversation] = useState(conversations[0]);

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
  };

  const handleNewChat = () => {
    setActiveConversation({ id: NEW_CHAT_ID, title: 'New Chat', messages: [] });
  };

  const handleSendMessage = (text) => {
    const newMessage = { id: Date.now(), text, sender: 'user' };

    if (activeConversation.id === NEW_CHAT_ID) {
      // Create a new conversation
      const newConversation = {
        id: Date.now(),
        title: text.substring(0, 20), // Use the first 20 chars as title
        messages: [newMessage],
      };
      setConversations([newConversation, ...conversations]);
      setActiveConversation(newConversation);
    } else {
      // Add message to the active conversation
      const updatedConversations = conversations.map((conv) =>
        conv.id === activeConversation.id
          ? { ...conv, messages: [...conv.messages, newMessage] }
          : conv
      );
      setConversations(updatedConversations);
      setActiveConversation(updatedConversations.find(c => c.id === activeConversation.id));
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
      <ChatWindow 
        conversation={activeConversation} 
        onSendMessage={handleSendMessage} 
      />
    </div>
  );
}

export default App;
