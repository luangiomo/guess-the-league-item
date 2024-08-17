export const INITIAL_STATE: DragItemState = {
  itemId: undefined,
  isActive: false,
};

interface DragItemState {
  itemId: string | undefined;
  isActive: boolean;
}

interface Action {
  type: "drag" | "drop" | "drag_over" | "drag_leave" | "drag_end";
  id?: string;
  event: any;
}

export const dragItemReducer = (
  state: DragItemState,
  action: Action
): DragItemState => {
  const { type, id, event } = action;

  switch (type) {
    case "drag":
      // event?.dataTransfer?.setData("dragId", id);
      return {
        ...state,
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

    default:
      return state;
  }
};
