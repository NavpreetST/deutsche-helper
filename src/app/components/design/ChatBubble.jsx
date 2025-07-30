import React from 'react';
import clsx from 'clsx';

const ChatBubble = ({ sender, message }) => {
  const isUser = sender === 'user';

  const bubbleClasses = clsx(
    'p-3 max-w-[80%] rounded-lg',
    {
      'bg-accent-primary text-white rounded-br-none': isUser,
      'bg-panel-primary text-text-primary rounded-bl-none': !isUser,
    }
  );

  const alignmentClass = isUser ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex ${alignmentClass} mb-4`}>
      <div className={bubbleClasses}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatBubble;