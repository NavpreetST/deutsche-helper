import React from 'react';

const FormattedText = ({ text }) => {
  const formatText = (inputText) => {
    let formattedText = inputText.replace(/\*\*([\s\S]*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\*([\s\S]*?)\*/g, '<em>$1</em>');
    return { __html: formattedText };
  };

  return <p dangerouslySetInnerHTML={formatText(text)} />;
};

export default FormattedText;
