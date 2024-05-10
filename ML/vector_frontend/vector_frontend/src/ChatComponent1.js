import React, { useState } from 'react';
import ProfileCard from './ProfileCard'; // Ensure this is correctly imported

const ChatComponent = ({ sendMessage }) => {
  const [messages, setMessages] = useState([]);
  const [profiles, setProfiles] = useState([]); // State to hold profile data
  const [queryString, setQueryString] = useState('');

  const handleInputChange = (event) => {
    setQueryString(event.target.value);
  };

  const handleSubmit = async () => {
    if (!queryString.trim()) return;
    setMessages((prevMessages) => [...prevMessages, { text: queryString, isUser: true }]);
    
    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: queryString }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setProfiles(data); // Set the profiles with the fetched data
    } catch (error) {
      // In case of error, add an error message. Adjust as needed.
      setMessages((prevMessages) => [...prevMessages, { text: `Error: ${error.message}`, isUser: false }]);
    }
    
    setQueryString(''); // Clear input field
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen bg-gray-100">
      <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
            {message.text}
          </div>
        ))}
        {/* Render profiles using ProfileCard components */}
        {profiles.map(profile => (
          <ProfileCard key={profile.userId} profile={profile} />
        ))}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <input
            type="text"
            placeholder="Write your message!"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            value={queryString}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            >
              <span className="font-bold">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
