import { ReactNode, createContext, useContext, useReducer } from "react";

interface DragItemState {
  itemId: string | undefined;
  isActive: boolean;
}

type DragActions = "drag" | "drop" | "drag_over" | "drag_leave" | "drag_end";

interface Action {
  type: DragActions;
  event: any;
}

export const DragItemContext = createContext(null);
export const DragItemDispatchContext = createContext(null);

interface Props {
  children: ReactNode;
}

function DragItemProvider({ children }: Props) {
  const [draggedItem, dispatch] = useReducer(dragItemReducer, initalState);

  return (
    <DragItemContext.Provider value={draggedItem}>
      <DragItemDispatchContext.Provider value={dispatch}>
        {children}
      </DragItemDispatchContext.Provider>
    </DragItemContext.Provider>
  );
}

const dragItemReducer = (
  state: DragItemState,
  action: Action
): DragItemState => {
  const { type, event } = action;

  switch (type) {
    case "drag":
      const id = event.dataTransfer.getData("dragId");
      return {
        isActive: true,
        itemId: id,
      };
    case "drop":
      // const newDragId: string | undefined = event
      //   ? event.dataTransfer?.getData("dragId")
      //   : undefined;
      // if (state.itemId === newDragId) {
      //   return {
      //     ...state,
      //     isActive: false,
      //   };
      // }
      return {
        itemId: id,
        isActive: false,
      };
    case "drag_over": {
      return {
        ...state,
        isActive: true,
      };
    }
    case "drag_leave": {
      return {
        itemId: undefined,
        isActive: false,
      };
    }
    case "drag_end": {
      return {
        itemId: undefined,
        isActive: false,
      };
    }
    default: {
      throw Error("Unknown action: " + type);
    }
  }
};

export function useDragItem() {
  return useContext(DragItemContext);
}

export function useDragItemDispatch() {
  return useContext(DragItemDispatchContext);
}

const initalState: DragItemState = {
  itemId: undefined,
  isActive: false,
};

export default DragItemProvider;
