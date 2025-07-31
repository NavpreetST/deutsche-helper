'use client';
import React from 'react';
import Input from './Input';
import FormattedText from './FormattedText';

const ChatWindow = ({ conversation }) => {
  return (
    <div className="flex flex-col flex-1 h-full bg-[#171717] text-white">
      <div className="font-bold flex justify-center text-[#F5F5F5] text-2xl p-4 border-b border-[#2E2E2E]">
        {conversation.title}
      </div>
      {/* Message List Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex flex-col space-y-4">
          {conversation.messages?.map((message, index) => (
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
        <Input onSendMessage={() => {}} />
      </div>
    </div>
  );
};

export default ChatWindow;
