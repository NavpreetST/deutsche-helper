import React from 'react';

const CodeBlock = ({ code }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="bg-background border border-border rounded-md p-4 my-4 font-mono text-text-secondary relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-panel-secondary text-text-tertiary px-2 py-1 rounded-md text-xs hover:bg-[#313131]"
      >
        Copy
      </button>
      <pre><code>{code}</code></pre>
    </div>
  );
};

export default CodeBlock;