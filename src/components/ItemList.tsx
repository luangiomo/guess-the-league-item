import { useContext } from "react";
import { DragContext } from "../contexts/DragContext";
import { ItemCategory } from "../types/ItemCategoryType";
import { ItemType } from "../types/ItemType";
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
  let title: string;
  let items: ItemType[];

  switch (category) {
    case "all": {
      title = "Todos os itens";
      items = getItemsByCategory(category);
      break;
    }
    case "basics": {
      title = "Iniciais & Básicos";
      items = getItemsByCategory(category);
      break;
    }
    case "epics": {
      title = "Épicos";
      items = getItemsByCategory(category);
      break;
    }
    case "legendaries": {
      title = "Lendários";
      items = getItemsByCategory(category);
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
