import { createContext, ReactNode, useState } from "react";
import { ItemStructure } from "../types/ItemStructure";
import { getItemToStructure, getRandomItemId } from "../utils/getItems";

type ItemContextType = {
  currentDragItemId: string;
  setCurrentDragItemId: (newState: string) => void;
  item: ItemStructure;
  setItem: (newState: ItemStructure) => void;
  isDraggable: boolean;
  setIsDraggable: (newState: boolean) => void;
};

const DEFAULT_VALUE: ItemContextType = {
  currentDragItemId: "",
  setCurrentDragItemId: () => {},
  item: {
    id: "",
    itemId: "",
    status: "pending",
    from: [],
  },
  setItem: () => {},
  isDraggable: false,
  setIsDraggable: () => {},
};

interface Props {
  children: ReactNode;
}

export const ItemContext = createContext<ItemContextType>(DEFAULT_VALUE);

export const ItemContextProvider = ({ children }: Props) => {
  const [currentDragItemId, setCurrentDragItemId] = useState(
    DEFAULT_VALUE.currentDragItemId,
  );
  const [item, setItem] = useState(() => {
    try {
      const storage = localStorage.getItem("sortedItem");
      return storage
        ? JSON.parse(storage)
        : getItemToStructure(getRandomItemId());
    } catch (error) {
      console.log(error);
      return DEFAULT_VALUE.item;
    }
  });
  const [isDraggable, setIsDraggable] = useState(DEFAULT_VALUE.isDraggable);

  return (
    <ItemContext.Provider
      value={{
        currentDragItemId: currentDragItemId,
        setCurrentDragItemId: setCurrentDragItemId,
        item,
        setItem,
        isDraggable,
        setIsDraggable,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
