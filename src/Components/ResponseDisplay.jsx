import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import html from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('html', html);

const ResponseDisplay = ({ response }) => {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    if (response && response.candidates && response.candidates.length > 0) {
      const value = response.candidates[0].content.parts[0].text;

      // Regular expression to capture the language and code inside ``` blocks
      const regex = /```(\w*)\n([\s\S]*?)```/g;
      const blocks = [];
      let match;

      while ((match = regex.exec(value)) !== null) {
        const language = match[1] || 'plaintext'; // Default to plaintext if no language is provided
        const code = match[2];
        blocks.push({ language, code });
      }

      setCodeBlocks(blocks);
    }
  }, [response]);

  const renderResponse = () => {
    if (response.error) {
      return <p className="text-red-500">Error: {response.error}</p>;
    }

    if (response.candidates && response.candidates.length > 0) {
      return response.candidates.map((candidate, index) => (
        <div key={index} className="p-2 border-b border-gray-200 bg-gray-200 p-1">
          {candidate.content.parts.map((part, partIndex) => {
            // Remove the code block parts from the display text
            const filteredText = part.text.replace(/```[\s\S]*?```/g, '');
            return <p key={partIndex} className="text-gray-700">{filteredText.trim()}</p>;
          })}
        </div>
      ));
    }

    return <p className="text-gray-700">No response received.</p>;
  };

  const copyToClipboard = () => {
    const textToCopy = response.candidates.map(candidate => 
      candidate.content.parts.map(part => part.text).join(' ')
    ).join(' ');
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success('Response copied to clipboard!');
    }).catch(err => {
      toast.error('Failed to copy response');
    });
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-gray-800">Response:</h2>
      <div className="mt-2 bg-gray-50 md:p-4 rounded shadow-inner">

        {/* Code blocks with copy button */}
        {codeBlocks.map((block, index) => (
          <div key={index} className="relative mb-4">
            {/* Copy button positioned at the top right corner */}
            <button 
              onClick={() => navigator.clipboard.writeText(block.code)}
              className="absolute top-2 right-2 bg-blue-500 text-white p-1 text-sm rounded hover:bg-blue-600"
            >
              Copy
            </button>
            <SyntaxHighlighter language={block.language} style={dracula} className="rounded-lg p-2">
              {block.code}
            </SyntaxHighlighter>
          </div>
        ))}

        {/* Render the rest of the response excluding the code blocks */}
        {renderResponse()}
      </div>
    </div>
  );
};

export default ResponseDisplay;
