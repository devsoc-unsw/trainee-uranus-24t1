import { row } from "../resources";
import LoadContainer from "./LoadContainer";

interface ListSearchProps {
  contents: string[];
  selected: boolean[];
  searchInput: string;
  onSelect: (index: number) => void;
  loading?: boolean;
}

const ListSearch: React.FC<ListSearchProps> = ({
  contents,
  selected,
  searchInput,
  onSelect,
  loading,
}) => {
  return (
    <div
      className={`${row} flex-wrap h-full justify-between content-start overflow-y-auto`}
    >
      {loading ? new Array(7).fill(<LoadContainer loading={true} className="h-[50px] w-[48%] mb-[7%]" />) : contents.map((content, index) => {
        if (
          !content.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
        ) {
          return undefined;
        }

        return (
          <button
            key={`${index}`}
            id={`${index}`}
            className={`
              rounded-full
              transition-all
              duration-250
              border-4
              border-secondary-bg-500
              h-[50px]
              w-[48%]
              mb-[7%]
              flex
              items-center
              justify-center

              ${
                selected[index]
                  ? "bg-secondary-bg-500 text-white"
                  : " text-secondary-bg-500 bg-white"
              }
            `}
            onClick={() => onSelect(index)}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};

export default ListSearch;
