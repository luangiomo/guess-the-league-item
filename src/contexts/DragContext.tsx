import { createContext, ReactNode, useState } from "react";

type DragContextType = {
  currentDragId: string;
  setCurrentDragId: (newState: string) => void;
  isDraggable: boolean;
  setIsDraggable: (newState: boolean) => void;
};

const DEFAULT_VALUE: DragContextType = {
  currentDragId: "",
  setCurrentDragId: () => {},
  isDraggable: false,
  setIsDraggable: () => {},
};

interface DragContextProviderProps {
  children: ReactNode;
}

export const DragContext = createContext<DragContextType>(DEFAULT_VALUE);

export const DragContextProvider = ({ children }: DragContextProviderProps) => {
  const [currentDragId, setCurrentDragId] = useState(
    DEFAULT_VALUE.currentDragId,
  );
  const [isDraggable, setIsDraggable] = useState(DEFAULT_VALUE.isDraggable);

  return (
    <DragContext.Provider
      value={{
        currentDragId,
        setCurrentDragId,
        isDraggable,
        setIsDraggable,
      }}
    >
      {children}
    </DragContext.Provider>
  );
};
