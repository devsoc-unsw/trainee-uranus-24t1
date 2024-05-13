import { useState } from 'react';
import dashCircle from '../../images/dashCircle.svg'

interface AdaptableButtonProps {
    label: string;
    showDash?: boolean;
    disabled?: boolean;
}

const AdaptableButton: React.FC<AdaptableButtonProps> = ({
    label,
    showDash = false,
    disabled = false
}) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (!disabled && !showDash) {
            setIsClicked(prevState => !prevState);
        }
    };

    const dynamicStyle = disabled ? 'text-tertiary-500 bg-tertiary-bg-500 border-tertiary-bg-500' : 
    isClicked ? 'bg-secondary-bg-500 border-secondary-bg-500 text-white' : 'text-secondary-bg-500 border-secondary-bg-500 bg-white hover:bg-secondary-bg-500 hover:text-white';

    return (
        <button
            className={`rounded-full transition-all duration-250 px-4 py-2 border-2 outline-none relative overflow-visible ${dynamicStyle}`}
            onClick={!disabled ? handleClick : undefined}
        >
            {showDash && (
                <img src={dashCircle} alt="Dash Icon" className="absolute top-0 left-0 w-5 h-5 mt-[-9px] ml-[-6.5px] filter" />
            )}
            {label}
        </button>
    );
};

export default AdaptableButton;

