'use client';
import React from 'react';

const SideBar = ({ conversations, onSelectConversation, activeConversation, onNewChat }) => {
  return (
    <div className="bg-[#0D0D0D] border-r border-[#2E2E2E] w-[260px] p-4 flex flex-col">
      <button 
        className="bg-[#8A42F4] text-white font-bold py-2 px-4 rounded-lg mb-4 hover:bg-[#772CE8]"
        onClick={onNewChat}
      >
        + New Chat
      </button>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation._id}
            className={`p-3 rounded-lg text-white cursor-pointer ${
              activeConversation && activeConversation._id === conversation._id ? 'bg-[#212121]' : 'hover:bg-[#212121]'
            }`}
            onClick={() => onSelectConversation(conversation)}>
          
            {conversation.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
