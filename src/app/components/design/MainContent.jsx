import React from 'react';

const MainContent = ({ children }) => {
  return (
    <div className="flex-1 p-8">
      {children}
    </div>
  );
};

export default MainContent;