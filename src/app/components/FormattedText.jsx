import React from 'react';

const FormattedText = ({ text }) => {
  const formatText = (inputText) => {
    let formattedText = inputText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    return { __html: formattedText };
  };

  return <p dangerouslySetInnerHTML={formatText(text)} />;
};

export default FormattedText;
