import React from 'react';

const Sidebar = ({ children }) => {
  return (
    <div className="bg-background border-r border-border w-[260px] p-4">
      {children}
    </div>
  );
};

export default Sidebar;