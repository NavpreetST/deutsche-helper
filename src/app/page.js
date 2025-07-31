
'use client';
import { useState } from 'react';
import ChatWindow from "./components/ChatWindow";
import SideBar from "./components/SideBar";

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

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar
        conversations={conversations}
        onSelectConversation={handleSelectConversation}
        activeConversation={activeConversation}
      />
      <ChatWindow conversation={activeConversation} />
    </div>
  );
}

export default App;
