import { column, row } from "../resources";
import { FaPencil } from "react-icons/fa6";

interface PencilEntryProps {
  descriptor: string;
  text: string;
  onEdit: () => void;
}

const PencilEntry: React.FC<PencilEntryProps> = ({ descriptor, text, onEdit }) => {
  return (
    <div className={column}>
      <div className="text-sm text-primary-300">{descriptor}</div>
      <div className={row}>
        <div className="font-bold text-2xl">{text}</div>
        <button onClick={onEdit}>
          <FaPencil className="text-secondary-bg-400 mx-2 h-[32px]"/>
        </button>
      </div>
    </div>
  );
};

export default PencilEntry;
