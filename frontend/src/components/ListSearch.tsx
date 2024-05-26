import { row } from "../resources";


interface ListSearchProps {
  contents: string[];
  selected: boolean[];
  searchInput: string;
  onSelect: (index: number) => void;
}

const ListSearch: React.FC<ListSearchProps> = ({ contents, selected, searchInput, onSelect }) => {
  return (
    <div className={`${row} flex-wrap h-full justify-between content-start overflow-y-auto`}>
      {contents.map((content, index) => {
        if (!content.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())) {
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
              mb-[4%]
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
          >{content}</button>
        );
      })}
    </div>
  );
};

export default ListSearch;
