import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Authentication/Login';
import Signup from './Authentication/SignUp';
import PhoneNumberVerification from './Authentication/LoginWithNumber';
import PrivateRoute from './Authentication/PrivateRoute';
import PromptInput from './Components/InputPrompt';
import ResponseDisplay from './Components/ResponseDisplay';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'; // Ensure this line is present to import Tailwind CSS

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-600 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Gemini API Prompt</h1>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/phone_login" element={<PhoneNumberVerification />} />
          <Route path="/InputPrompt" element={
            <PrivateRoute>
              <div className="bg-white shadow-md rounded p-4 w-full max-w-md">
                <PromptInput setResponse={setResponse} setLoading={setLoading} />
                {loading && <div className="text-center mt-4">Loading...</div>}
                {response && <ResponseDisplay response={response} />}
              </div>
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
