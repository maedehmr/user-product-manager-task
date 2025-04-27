import { ChangeEventHandler } from "react";

interface SearchInputProps {
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  onChange,
}) => {
  return (
    <input
      placeholder={placeholder}
      onChange={onChange}
      className="w-full mb-2 p-2 border rounded"
    />
  );
};

export default SearchInput;
