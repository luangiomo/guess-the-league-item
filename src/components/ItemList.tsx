import { DragEvent, useState } from "react";
import { getItemById } from "../utils/getItems";

export interface Item {
  id: string;
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  gold: {
    base: number;
    purchasable: boolean;
    total: number;
    sell: number;
  };
  tags: string[];
  maps?: any;
  stats?: any;
  into?: string[];
  from?: string[];
}

interface Props {
  items: Item[];
}

const RIOT_API_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/";

function ItemList({ items }: Props) {
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

  return (
    <>
      <div className="grid grid-cols-8 gap-1.5">
        {items?.map((item) => (
          <img
            draggable
            onDragStart={(e) => handleOnDrag(e, item)}
            className="overflow-hidden rounded-sm h-10 w-10 border border-black cursor-grab"
            key={item.id}
            src={`${RIOT_API_URL}${item.image.full}`}
          />
        ))}
      </div>
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
            src={`${RIOT_API_URL}${item.image.full}`}
            alt={item.name}
          />
        ))}
      </div>
    </>
  );
}

export default ItemList;
