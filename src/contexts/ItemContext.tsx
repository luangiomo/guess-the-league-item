import { createContext, ReactNode, useState } from "react";
import { ItemStructure } from "../utils/getItems";

type ItemContextType = {
  selectedItem: string;
  setSelectedItem: (newState: string) => void;
  item: ItemStructure;
  setItem: (newState: ItemStructure) => void;
};

const DEFAULT_VALUE: ItemContextType = {
  selectedItem: "",
  setSelectedItem: () => {},
  item: {
    id: "",
    itemId: "",
    status: "pending",
  },
  setItem: () => {},
};

interface Props {
  children: ReactNode;
}

export const ItemContext = createContext<ItemContextType>(DEFAULT_VALUE);

export const ItemContextProvider = ({ children }: Props) => {
  const [selectedItem, setSelectedItem] = useState(DEFAULT_VALUE.selectedItem);
  const [item, setItem] = useState(DEFAULT_VALUE.item);

  return (
    <ItemContext.Provider
      value={{ selectedItem, setSelectedItem, item, setItem }}
    >
      {children}
    </ItemContext.Provider>
  );
};
