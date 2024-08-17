import { useContext } from "react";
import { ItemContext } from "../contexts/ItemContext";
import { Item, ItemCategory, getItemsByCategory } from "../utils/getItems";
import ItemPicture from "./ItemPicture";

interface Props {
  category: ItemCategory;
  showTitle?: boolean;
}

function ItemList({ category, showTitle }: Props) {
  const { setSelectedItem } = useContext(ItemContext);

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
        <p className="select-none mb-2 text-lg font-semibold text-white">
          {title}
        </p>
      )}
      <ul className="grid grid-cols-8 gap-1.5">
        {items.map((item) => (
          <li
            draggable
            key={item.id}
            onDragStart={() => {
              setSelectedItem(item.id);
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
