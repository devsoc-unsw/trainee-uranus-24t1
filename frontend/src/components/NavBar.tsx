import { FC } from "react";
import { FaUser } from "react-icons/fa";
import { FaMessage, FaHouse } from "react-icons/fa6";
import { NavigateFunction } from "react-router-dom";

interface NavBarProps {
  navigate: NavigateFunction;
  index: number;
}

const NavBar: FC<NavBarProps> = ({ navigate, index }) => {
  const activeIndex = index;

  const paths = ["/", "/profile", "/messages"];

  const handleClickFactory = (index: number) => {
    return () => {
      navigate(paths[index]);
    };
  };

  const dynamicStyleFactory = (index: number) => {
    return (index === activeIndex ? "text-primary-500" : "text-white") + " w-[30px] h-[30px]";
  };

  return (
    <div
      className="
      flex
      flex-row
      justify-around
      bg-secondary-bg-200
      w-full
      p-3"
    >
      <button
				onClick={handleClickFactory(0)}
				className="flex-1 h-full flex justify-center"
			>
				<FaHouse className={dynamicStyleFactory(0)} />
			</button>
			<button
				onClick={handleClickFactory(1)}
				className="flex-1 h-full flex justify-center"
			>
				<FaUser className={dynamicStyleFactory(1)} />
			</button>
      
			<button
				onClick={handleClickFactory(2)}
				className="flex-1 h-full flex justify-center"
			>
				<FaMessage className={dynamicStyleFactory(2)} />
			</button>
    </div>
  );
};

export default NavBar;
