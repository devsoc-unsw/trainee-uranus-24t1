import { column, row } from "../resources";
import { FaPencil } from "react-icons/fa6";
import LoadContainer from "./LoadContainer";

interface PencilEntryProps {
  descriptor: string;
  text: string;
  onEdit: () => void;
  loading?: boolean;
}

const PencilEntry: React.FC<PencilEntryProps> = ({
  descriptor,
  text,
  onEdit,
  loading,
}) => {
  return (
    <div className={column}>
      <div className="text-sm text-primary-300">{descriptor}</div>
      <LoadContainer loading={loading} className="h-[30px] w-[150px]">
        <div className={row}>
          <div className="font-bold text-2xl">{text}</div>
          <button onClick={onEdit}>
            <FaPencil className="text-secondary-bg-400 mx-2 h-[32px]" />
          </button>
        </div>
      </LoadContainer>
    </div>
  );
};

export default PencilEntry;
