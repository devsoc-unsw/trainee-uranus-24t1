import BackIcon from "../assets/backIcon.png";

interface BackButtonProps {
  onClickHandler: () => void;
}

const BackButton = ({ onClickHandler }: BackButtonProps) => {
  return (
    <button
      className="w-11 h-11 inline-flex items-center justify-center rounded-full bg-secondary-bg-500"
      onClick={onClickHandler}
    >
      <img src={BackIcon} alt="Back" className="w-3/5 h-2/5 filter invert" />
    </button>
  );
};

export default BackButton;
