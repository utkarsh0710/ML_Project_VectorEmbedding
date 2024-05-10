import React from 'react';

const ProfileCard = ({ profile }) => {
  return (
    <div className="flex items-center justify-end w-60% mx-auto">
      {/* Render profile details */}
      <div className="flex items-center space-x-4 py-3 border-b-2 border-gray-200">
        <div className="relative">
          <span className="absolute text-green-500 right-0 bottom-0">
            <svg width="20" height="20">
              <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
            </svg>
          </span>
          <img
            src={`https://ui-avatars.com/api/?name=${profile.name}&background=random`}
            alt=""
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <div className="text-lg">
            <span className="text-gray-700">{profile.name}</span>
          </div>
          <span className="text-sm text-gray-600">{profile.workExperience[0].role}</span>
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          {/* Add buttons for interactions */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border h-8 w-8 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
          {/* Add more buttons if needed */}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
