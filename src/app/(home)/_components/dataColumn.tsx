import { ChangeEventHandler, ReactNode } from "react";
import SearchInput from "./searchInput";

interface SearchProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

interface DataColumnProps {
  children: ReactNode;
  searchInput?: SearchProps;
}

const DataColumn: React.FC<DataColumnProps> = ({ children, searchInput }) => {
  return (
    <div className="border rounded-lg p-2">
      {searchInput && <SearchInput onChange={searchInput.onChange} />}
      <ul>{children}</ul>
    </div>
  );
};

export default DataColumn;
