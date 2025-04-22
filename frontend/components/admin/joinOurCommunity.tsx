import React from "react";

const JoinOurCommunity: React.FC = () => {
  const users = Array(5).fill("https://via.placeholder.com/150"); // Placeholder user images, replace with actual user data

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-green-200 rounded ">
      <div className="flex flex-wrap justify-center mb-5">
        <img
          className="w-24 h-24 rounded-full border-2 border-gray-300 m-2"
          src={users[4]}
          alt="User"
        />
        {users.slice(1, 2).map((user, index) => (
          <img
            key={index}
            className="w-20 h-20 rounded-full border-2 border-gray-300 m-2"
            src={user}
            alt="User"
          />
        ))}
      </div>
      <div className="flex flex-wrap justify-center mb-10">
        {users.slice(2, 4).map((user, index) => (
          <img
            key={index}
            className="w-20 h-20 rounded-full border-2 border-gray-300 m-2"
            src={user}
            alt="User"
          />
        ))}
        <img
          className="w-24 h-24 rounded-full border-2 border-gray-300 m-2"
          src={users[4]}
          alt="User"
        />
        {users.slice(4, 5).map((user, index) => (
          <img
            key={index}
            className="w-20 h-20 rounded-full border-2 border-gray-300 m-2"
            src={user}
            alt="User"
          />
        ))}
      </div>
      <h1 className="text-4xl text-white mb-4">Join Our Community</h1>
      <p className="text-center text-white mb-10">
        A wonderful place to share knowledge and meet new people.
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Join Now
      </button>
    </div>
  );
};

export default JoinOurCommunity;
