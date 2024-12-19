import { useContext, useEffect, useState } from "react";
import { DragContext } from "../contexts/DragContext";
import { ItemType } from "../types/ItemType";
import { ItemCategory } from "../types/ItemCategoryType";
import { getImageByItemId } from "../utils/getImageUrl";
import { getItemsByCategory } from "../utils/getItems";

interface Props {
  category: ItemCategory;
  showTitle?: boolean;
  class?: [];
  text?: string;
}

function ItemList({ category, showTitle }: Props) {
  const { setCurrentDragId, setIsDraggable } = useContext(DragContext);
  const [filteredList, setfilteredList] = useState<ItemType[]>([]);
  const [filter, setFilter] = useState("");
  let title: string;
  let items: ItemType[];

  switch (category) {
    case "all": {
      title = "Todos os itens";
      items = getItemsByCategory(category);
      console.log(items);
      break;
    }
    case "basics": {
      title = "Iniciais & Básicos";
      items = getItemsByCategory(category);
      console.log(items);
      break;
    }
    case "epics": {
      title = "Épicos";
      items = getItemsByCategory(category);
      console.log(items);
      break;
    }
    case "legendaries": {
      title = "Lendários";
      items = getItemsByCategory(category);
      console.log(items);
      break;
    }
  }

  return (
    <div>
      {showTitle && (
        <p className="mb-2 select-none text-lg font-semibold text-white">
          {title}
        </p>
      )}
      <ul className="flex flex-wrap gap-1 md:grid md:grid-cols-6">
        {items.map((item) => (
          <li
            className="h-8 w-8 cursor-grab overflow-hidden border border-[#292929] hover:border-white hover:brightness-150 md:h-10 md:w-10"
            style={{
              backgroundSize: "contain",
              backgroundImage: `url(${getImageByItemId(item.id)})`,
            }}
            key={item.id}
            draggable
            onDragStart={() => {
              setIsDraggable(true);
              setCurrentDragId(item.id);
            }}
            onDragEnd={() => {
              setIsDraggable(false);
              setCurrentDragId("");
            }}
            onDragLeave={(e) => {
              e.preventDefault();
            }}
          ></li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
