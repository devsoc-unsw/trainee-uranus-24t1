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
          bg-secondary-bg-400
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
        <div className={column}>
          {contents.map((option, index) => {
            if (selected[index]) {
              return undefined;
            }

            return (
              <button
                key={option}
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
