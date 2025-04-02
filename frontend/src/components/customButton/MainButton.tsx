type MainButtonProps = {
    text: string;
  };
  
  const MainButton: React.FC<MainButtonProps> = ({ text }) => {
    return (
      <button
        style={{ borderRadius: "8px" }}
        className="text-sm font-medium bg-[#fb5770] text-white hover:bg-[#e44d63] px-8 rounded-lg h-11 focus:outline-none"
      >
        {text}
      </button>
    );
  };
  
  export default MainButton;
  