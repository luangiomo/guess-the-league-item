import { createContext, ReactNode, useState } from "react";
import { ItemStructure } from "../types/ItemStructure";
import { getItemToStructure, getRandomItemId } from "../utils/getItems";

type ItemContextType = {
  currentDragItemId: string;
  setCurrentDragItemId: (newState: string) => void;
  item: ItemStructure;
  setItem: (newState: ItemStructure) => void;
  isDragable: boolean;
  setIsDragable: (newState: boolean) => void;
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
  isDragable: false,
  setIsDragable: () => {},
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
  const [isDragable, setIsDragable] = useState(DEFAULT_VALUE.isDragable);

  return (
    <ItemContext.Provider
      value={{
        currentDragItemId: currentDragItemId,
        setCurrentDragItemId: setCurrentDragItemId,
        item,
        setItem,
        isDragable,
        setIsDragable,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
