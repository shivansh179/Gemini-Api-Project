import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PromptInput = ({ setResponse, setLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.info('Loading...', {
      autoClose: false,
      toastId: 'loadingToast'
    });

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB4clmAL10UGC4fm7zxH4tqNgv-yM8nY3w',
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setResponse(response.data);
    } catch (error) {
      console.error('Error generating response:', error);
      setResponse({ error: 'Error generating response, please check the console for more details.' });
    } finally {
      setLoading(false);
      toast.dismiss('loadingToast');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-gray-700">Enter your prompt:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Send
      </button>
    </form>
  );
};

export default PromptInput;
