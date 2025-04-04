import '../.././index.css'
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative flex flex-col items-center space-y-4">
        {/* Pen Icon */}
        <div className="w-12 h-12 bg-[#fb5770] rounded-full flex justify-center items-center animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="w-8 h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 2.487a2.25 2.25 0 013.18 3.18L9.375 16.334a4.5 4.5 0 01-1.687 1.108l-3.458 1.153 1.153-3.458a4.5 4.5 0 011.108-1.687l10.154-10.154z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6.75L17.25 13.5"
            />
          </svg>
        </div>

        {/* Ink Drops */}
        <div className="flex space-x-2">
          <div className="w-2 h-6 bg-[#fb5770] rounded-full animate-[drop_1.5s_ease-in-out_infinite]"></div>
          <div className="w-2 h-8 bg-[#fb5770] rounded-full animate-[drop_1.8s_ease-in-out_infinite]"></div>
          <div className="w-2 h-6 bg-[#fb5770] rounded-full animate-[drop_2s_ease-in-out_infinite]"></div>
        </div>

        {/* Loading Text */}
        <p className="text-[#fb5770] font-semibold text-lg animate-pulse">
          Loading your Review...
        </p>
      </div>
    </div>
  );
};

export default Loading;

