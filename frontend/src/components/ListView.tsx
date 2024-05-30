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
                bg-secondary-bg-500
                text-primary-50
                text-[1rem]
                rounded-full
                w-5
                h-5
                flex
                items-center
                justify-center
              "
              onClick={() => onSelect(index)}
            >
              {/* There's a weird offset without this */}
              <div className="mt-[-10%]">-</div>
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
