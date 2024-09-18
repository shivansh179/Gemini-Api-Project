import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PromptInput = ({ setResponse, setLoading }) => {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    // Adjust the height of the textarea based on its content
    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset height to auto to calculate new height
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
      }
    };

    adjustHeight(); // Adjust height on initial render

    // Adjust height whenever the prompt changes
    // Cleanup function to avoid unnecessary updates
    const resizeObserver = new ResizeObserver(adjustHeight);
    if (textareaRef.current) {
      resizeObserver.observe(textareaRef.current);
    }

    return () => {
      if (textareaRef.current) {
        resizeObserver.unobserve(textareaRef.current);
      }
    };
  }, [prompt]);

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
    <div>
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Gemini API Prompt</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-gray-700">Enter your prompt:</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            ref={textareaRef}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded mt-1 resize-none overflow-hidden"
            placeholder="Type your prompt here..."
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  );
};

export default PromptInput;
