import { useItemStructure } from "../hooks/useItemStructure";
import { ItemStructure } from "../types/ItemStructure";

type ActionProps =
  | { type: "add_item"; itemId: string; currentDragItemId: string }
  | { type: "delete_item"; itemId: string }
  | {
      type: "switch_items";
      itemId: string;
      previousItemId: string;
    };

let item = {} as ItemStructure;

export function itemReducer(
  state: ItemStructure,
  action: ActionProps,
): ItemStructure {
  switch (action.type) {
    case "add_item":
      item = {
        ...state,
        from: state.from?.map((child) =>
          child.id === action.itemId
            ? {
                ...child,
                newItemId: action.currentDragItemId,
                status: "pending",
              }
            : child.id === action.itemId[0]
              ? {
                  ...child,
                  from: child.from?.map((grandchild) =>
                    grandchild.id === action.itemId
                      ? {
                          ...grandchild,
                          newItemId: action.currentDragItemId,
                          status: "pending",
                        }
                      : grandchild,
                  ),
                }
              : child,
        ),
      };
      localStorage.setItem("item", JSON.stringify(item));
      return item;
    case "switch_items":
      console.log(action.previousItemId);
      console.log(action.itemId);
      item = {
        ...state,
        from: state.from?.map((child) => {
          if (child.id === action.itemId) {
            console.log("entrei if itemId");
            return {
              ...child,
              newItemId: findNewItemByItemId(action.previousItemId),
              status: "pending",
            };
          } else if (child.id === action.itemId[0]) {
            console.log("entrei else if itemId grandchild");
            return {
              ...child,
              from: child.from?.map((grandchild) =>
                grandchild.id === action.itemId
                  ? {
                      ...grandchild,
                      newItemId: findNewItemByItemId(action.previousItemId),
                      status: "pending",
                    }
                  : grandchild,
              ),
            };
          }
          if (child.id === action.previousItemId) {
            console.log(action.previousItemId);
            console.log("entrei if previousId");
            return {
              ...child,
              newItemId: findNewItemByItemId(action.itemId),
              status: "pending",
            };
          } else if (child.id === action.previousItemId[0]) {
            console.log("entrei else grandchild previousId");
            return {
              ...child,
              from: child.from?.map((grandchild) =>
                grandchild.id === action.previousItemId
                  ? {
                      ...grandchild,
                      newItemId: findNewItemByItemId(action.itemId),
                      status: "pending",
                    }
                  : grandchild,
              ),
            };
          }
          return child;
        }),
      };
      console.log(item);
      localStorage.setItem("item", JSON.stringify(item));
      return item;
    case "delete_item":
      item = {
        ...state,
        from: state.from?.map((child) =>
          child.id === action.itemId
            ? {
                ...child,
                newItemId: "",
                status: "pending",
              }
            : child.id === action.itemId[0]
              ? {
                  ...child,
                  from: child.from?.map((grandchild) =>
                    grandchild.id === action.itemId
                      ? {
                          ...grandchild,
                          newItemId: "",
                          status: "pending",
                        }
                      : grandchild,
                  ),
                }
              : child,
        ),
      };
      localStorage.setItem("item", JSON.stringify(item));
      return item;
    default:
      throw new Error();
  }

  function findNewItemByItemId(id: string): string {
    let newItemId: string | undefined;

    newItemId = state.from?.find((child) => child.id === id)?.newItemId;
    if (newItemId != undefined) {
      console.log(newItemId);
      return newItemId;
    }

    newItemId = state.from
      ?.find((child) => child.id === id[0])
      ?.from?.find((grandchild) => grandchild.id === id)?.newItemId;
    if (newItemId != undefined) {
      console.log(newItemId);
      return newItemId;
    }

    console.log(newItemId);
    return "";
  }
}
