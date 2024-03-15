import React from 'react';

const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video pt-[20%] md:px-24 px-6 absolute text-white bg-gradient-to-r from-black">
      <h1 className='text-2xl md:text-4xl font-bold'>{title}</h1>
      <p className='hidden md:inline-block py-6 w-1/4 text-lg'>{overview}</p>
      <div className='my-4 md:m-0'>
        <button className="bg-white text-black py-1 px-1 md:py-2 md:px-4 text-lg rounded-lg hover:bg-opacity-50"> ▶️ Play</button>
        <button  className="hidden md:inline-block bg-gray-500 text-white p-2 px-6 text-lg bg-opacity-50 rounded-lg mx-2">More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;