import React from 'react';
import { toast } from 'react-toastify';

const ResponseDisplay = ({ response }) => {
  const renderResponse = () => {
    if (response.error) {
      return <p className="text-red-500">Error: {response.error}</p>;
    }

    if (response.candidates && response.candidates.length > 0) {
      return response.candidates.map((candidate, index) => (
        <div key={index} className="p-2 border-b border-gray-200">
          {candidate.content.parts.map((part, partIndex) => (
            <p key={partIndex} className="text-gray-700">{part.text}</p>
          ))}
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
      <div className="mt-2 bg-gray-50 p-4 rounded shadow-inner">
        {renderResponse()}
      </div>
      <button onClick={copyToClipboard} className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600">
        Copy Response
      </button>
    </div>
  );
};

export default ResponseDisplay;
