import { DragEvent, useState } from "react";
import {
  Item,
  ItemCategory,
  getItemById,
  getItemsByType,
} from "../utils/getItems";
import { getImageUrl } from "../utils/getImageUrl";

interface Props {
  type: ItemCategory;
  showTitle: boolean;
}

function ItemList({ type, showTitle }: Props) {
  const handleOnDrag = (e: DragEvent, item: Item) => {
    e.dataTransfer.setData("itemId", item.id);
  };

  const handleOnDrop = (e: DragEvent) => {
    const itemId = e.dataTransfer.getData("itemId") as string;
    const item: Item = getItemById(itemId);
    setActive(false);
    setSelectedItems([...selectedItems, item]);
  };

  const handleOnDragOver = (e: DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleOnDragLeave = (e: DragEvent) => {
    setActive(false);
  };

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [active, setActive] = useState<boolean>(false);

  let title: string = "";
  let items: Item[] = [];

  switch (type) {
    case "all": {
      title = "Todos os itens";
      items = getItemsByType(type);
      break;
    }
    case "basics": {
      title = "Iniciais & Básicos";
      items = getItemsByType(type);
      break;
    }
    case "epics": {
      title = "Épicos";
      items = getItemsByType(type);
      break;
    }
    case "legendaries": {
      title = "Lendários";
      items = getItemsByType(type);
      break;
    }
  }

  return (
    <div>
      {showTitle && (
        <p className="select-none mb-2 text-lg font-semibold text-white">
          {title}
        </p>
      )}
      <ul className="grid grid-cols-8 gap-1.5">
        {items?.map((item) => (
          <li key={item.id}>
            <img
              className="overflow-hidden rounded-sm h-10 w-10 border border-black cursor-grab"
              src={getImageUrl(item.image.full)}
              draggable
              onDragStart={(e) => handleOnDrag(e, item)}
            />
          </li>
        ))}
      </ul>

      <div
        className={`min-h-20 border mt-6 grid grid-cols-8 gap-1.5 ${
          active ? "border-red-500" : "border-white"
        }`}
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        onDragLeave={handleOnDragLeave}
      >
        {selectedItems?.map((item, index) => (
          <img
            key={index}
            className="overflow-hidden rounded-sm h-10 w-10 border border-black"
            src={getImageUrl(item.image.full)}
            alt={item.name}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemList;
