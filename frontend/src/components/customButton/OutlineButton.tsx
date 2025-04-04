type OutlineButtonProps = {
    text: string;
};
import { FaRegSquarePlus } from "react-icons/fa6";

const OutlineButton: React.FC<OutlineButtonProps> = ({ text }) => {
    return (
        <button
            style={{
                borderRadius: "20px",
            }}
            className="flex items-center gap-2 justify-center text-sm font-medium border border-[#fb5770] bg-white text-[#fb5770] hover:bg-[#fb5770] hover:text-white px-8 rounded-lg h-11 focus:outline-none"
        >
            {text} <FaRegSquarePlus />
        </button>
    );
};

export default OutlineButton;
