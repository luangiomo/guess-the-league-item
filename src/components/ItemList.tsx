import { useContext } from "react";
import { ItemContext } from "../contexts/ItemContext";
import { Item } from "../types/Item";
import { ItemCategory } from "../types/ItemCategory";
import { getItemsByCategory } from "../utils/getItems";
import ItemPicture from "./ItemPicture";

interface Props {
  category: ItemCategory;
  showTitle?: boolean;
}

function ItemList({ category, showTitle }: Props) {
  const { currentDragItemId, setCurrentDragItemId, setIsDraggable } =
    useContext(ItemContext);

  let title: string;
  let items: Item[];

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
      <ul className="grid grid-cols-8 gap-1.5">
        {items.map((item) => (
          <li
            key={item.id}
            draggable
            onDragStart={() => {
              setIsDraggable(true);
              setCurrentDragItemId(item.id),
                console.log("comecei pegar o item", currentDragItemId);
            }}
            onDragEnd={() => {
              setIsDraggable(false);
              setCurrentDragItemId(""),
                console.log("terminei de pegar o item", currentDragItemId);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
            }}
          >
            <ItemPicture item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
