import { cardStyle, row } from "../resources";
import Dropdown from "./Dropdown";

interface ListViewProps {
  contents: string[];
  selected: boolean[];
  onSelect: (index: number) => void;
}

const ListView: React.FC<ListViewProps> = ({
  contents,
  selected,
  onSelect,
}) => {
  return (
    <div className={`${row} flex-wrap`}>
      {contents.map((content, index) => {
        if (!selected[index]) {
          return undefined;
        }
        return (
          <div className="relative inline-block" key={index}>
            <div className={cardStyle}>{content}</div>
            <button
              className="
                absolute
                -top-0
                -left-0
                bg-primary-400
                text-primary-50
                text-[1rem]
                rounded-full
                w-[20px]
                h-[20px]
                flex
                items-center
                justify-center
              "
              onClick={() => onSelect(index)}
            >
              -
            </button>
          </div>
        );
      })}

      <Dropdown
        contents={contents}
        selected={selected}
        onSelect={(_, i) => onSelect(i)}
      />
    </div>
  );
};

export default ListView;
