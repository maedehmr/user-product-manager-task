"use client";

interface ListItemsProps<T> {
  items: T[];
  getKey: (item: T) => React.Key;
  getLabel: (item: T) => string;
  onItemClick: (item: T) => void;
  icon?: React.ReactNode;
}

const ListItems = <T,>({
  items,
  getKey,
  getLabel,
  onItemClick,
  icon,
}: ListItemsProps<T>) => {
  return (
    <ul>
      {items.length === 0 ? (
        <div className="p-2 text-gray-500">Not found</div>
      ) : (
        items.map((item) => (
          <li
            key={getKey(item)}
            onClick={() => onItemClick(item)}
            className="cursor-pointer p-1 hover:bg-gray-100 flex items-center"
          >
            {icon && <span className="mr-2">{icon}</span>}
            {getLabel(item)}
          </li>
        ))
      )}
    </ul>
  );
};

export default ListItems;
