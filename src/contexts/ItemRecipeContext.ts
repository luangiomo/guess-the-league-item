// import { createContext, ReactElement, useReducer } from "react";
// import { ItemStructure } from "../types/ItemStructure";

// const initalState: ItemStructure = {
//   id: "0",
//   itemId: "",
//   newItemId: "",
//   status: "pending",
//   from: [],
// };

// type ReducerAction =
//   | { type: "add_item"; itemId: string; itemDropped: string }
//   | { type: "switch_items"; itemId: string; previousItemId: string }
//   | { type: "delete_item"; itemId: string };

// const reducer = (
//   state: ItemStructure,
//   action: ReducerAction,
// ): ItemStructure => {
//   switch (action.type) {
//     case "add_item":
//       return {
//         ...state,
//         from: state.from?.map((child) =>
//           child.id === action.itemId
//             ? {
//                 ...child,
//                 newItemId: action.itemDropped,
//                 status: "pending",
//               }
//             : child.id === action.itemId[0]
//               ? {
//                   ...child,
//                   from: child.from?.map((grandchild) =>
//                     grandchild.id === action.itemId
//                       ? {
//                           ...grandchild,
//                           newItemId: action.itemDropped,
//                           status: "pending",
//                         }
//                       : grandchild,
//                   ),
//                 }
//               : child,
//         ),
//       };
//     case "switch_items":
//       return {} as ItemStructure;
//     case "delete_item":
//       return {
//         ...state,
//         from: state.from?.map((child) =>
//           child.id === action.itemId
//             ? {
//                 ...child,
//                 newItemId: "",
//                 status: "pending",
//               }
//             : child.id === action.itemId[0]
//               ? {
//                   ...child,
//                   from: child.from?.map((grandchild) =>
//                     grandchild.id === action.itemId
//                       ? {
//                           ...grandchild,
//                           newItemId: "",
//                           status: "pending",
//                         }
//                       : grandchild,
//                   ),
//                 }
//               : child,
//         ),
//       };
//     default:
//       throw new Error();
//   }
// };

// const useItemRecipeContext = (initialState: ItemStructure) => {
//   const [state, dispatch] = useReducer(reducer, initalState);

//   const handleAddItem = () =>
//     dispatch({ type: "add_item", itemId: "", itemDroped: "" });

//   return { state, handleAddItem };
// };

// type UseItemRecipeContextType = ReturnType<typeof useItemRecipeContext>;

// const inititalContextState: UseItemRecipeContextType = {
//   state: initalState,
//   handleAddItem: () => {},
// };

// export const ItemRecipeContext =
//   createContext<UseItemRecipeContextType>(inititalContextState);

// type ChildrenType = {
//   children?: ReactElement | undefined;
// };

// export const ItemRecipeProvider = ({
//   children,
//   ...initalState
// }: ItemStructure & ChildrenType): ReactElement => {
//   return;
// };
