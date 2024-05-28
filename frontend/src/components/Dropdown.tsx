import { useState } from "react";
import { column } from "../resources";

interface DropdownProps {
  contents: string[];
  selected: boolean[];
  onSelect: (option: string, index: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  contents,
  selected,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative inline-block text-left">
      <button
        className="
          rounded-full
          my-[10px]
          mx-2
          bg-secondary-bg-500
          text-primary-50
          w-[25px]
          h-[25px]
          flex
          items-center
          justify-center
        "
        onClick={() => setIsOpen(!isOpen)}
      >
        +
      </button>

      {isOpen && (
        <div className={column} >
          {contents.map((option, index) => {
            if (selected[index]) {
              return undefined;
            }

            return (
              <button
                key={option}
                className="text-left px-3 py-1 hover:bg-secondary-bg-100 w-full text-secondary-bg-600"
                onClick={() => {
                  onSelect(option, index);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
