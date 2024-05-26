import BackIcon from "../assets/backIcon.png";

interface BackButtonProps {
  onBack: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
  return (
    <button onClick={onBack} className="w-11 h-11 inline-flex items-center justify-center rounded-full bg-secondary-bg-500"
    >
      <img
        src={BackIcon}
        alt="Back"
        className="w-3/5 h-2/5 filter invert"
      />
    </button>
  );
};

export default BackButton;
