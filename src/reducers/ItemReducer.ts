import { ItemRecipeType } from "../types/ItemRecipeType";
import { getRecipeFromItemId } from "../utils/getItems";

export type ActionProps =
  | { type: "add_item"; position: string; currentDragId: string }
  | { type: "delete_item"; position: string }
  | {
      type: "switch_items";
      newItem: {
        id: string;
        position: string;
      };
      oldItem: {
        id: string;
        position: string;
      };
    }
  | {
      type: "change_full_item";
      id: string;
    }
  | {
      type: "check_status";
    };

export function itemReducer(
  state: ItemRecipeType,
  action: ActionProps,
): ItemRecipeType {
  switch (action.type) {
    case "add_item":
      return {
        ...state,
        from: state.from?.map((child) =>
          child.position === action.position
            ? {
                ...child,
                droppedId: action.currentDragId,
                status: "pending",
              }
            : {
                ...child,
                from: child.from?.map((grandchild) =>
                  grandchild.position === action.position
                    ? {
                        ...grandchild,
                        droppedId: action.currentDragId,
                        status: "pending",
                      }
                    : grandchild,
                ),
              },
        ),
      };
    case "switch_items":
      return {
        ...state,
        from: state.from?.map((child) => {
          if (child.position === action.newItem.position) {
            return {
              ...child,
              droppedId: action.oldItem.id,
              status: action.oldItem.id !== "" ? "pending" : "empty",
            };
          }
          if (child.position === action.oldItem.position) {
            return {
              ...child,
              droppedId: action.newItem.id,
              status: action.newItem.id !== "" ? "pending" : "empty",
            };
          }
          return {
            ...child,
            from: child.from?.map((grandchild) => {
              if (grandchild.position === action.newItem.position) {
                return {
                  ...grandchild,
                  droppedId: action.oldItem.id,
                  status: action.oldItem.id !== "" ? "pending" : "empty",
                };
              }
              if (grandchild.position === action.oldItem.position) {
                return {
                  ...grandchild,
                  droppedId: action.newItem.id,
                  status: action.newItem.id !== "" ? "pending" : "empty",
                };
              }
              return grandchild;
            }),
          };
        }),
      };
    case "delete_item":
      return {
        ...state,
        from: state.from?.map((child) =>
          child.position === action.position
            ? {
                ...child,
                droppedId: "",
                status: "empty",
              }
            : {
                ...child,
                from: child.from?.map((grandchild) =>
                  grandchild.position === action.position
                    ? {
                        ...grandchild,
                        droppedId: "",
                        status: "empty",
                      }
                    : grandchild,
                ),
              },
        ),
      };
    case "change_full_item": {
      return getRecipeFromItemId(action.id);
    }
    case "check_status":
      return {
        ...state,
        from: state.from?.map((child) => {
          return {
            ...child,
            status: child.id === child.droppedId ? "valid" : "invalid",
            from: child.from?.map((grandchild) => {
              return {
                ...grandchild,
                status:
                  grandchild.id === grandchild.droppedId ? "valid" : "invalid",
              };
            }),
          };
        }),
      };
    default:
      throw new Error();
  }
}
