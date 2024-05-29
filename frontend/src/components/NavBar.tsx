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
    return index === activeIndex ? "text-primary-500" : "text-white";
  };

  return (
    <div
      className="
      flex
      flex-row
      justify-around
      bg-secondary-bg-200
      w-full
      p-3
      [&>*]:w-[30px]
      [&>*]:h-[30px]"
    >
      <FaHouse
        onClick={handleClickFactory(0)}
        className={dynamicStyleFactory(0)}
      />
      <FaUser
        onClick={handleClickFactory(1)}
        className={dynamicStyleFactory(1)}
      />
      <FaMessage
        onClick={handleClickFactory(2)}
        className={dynamicStyleFactory(2)}
      />
    </div>
  );
};

export default NavBar;
