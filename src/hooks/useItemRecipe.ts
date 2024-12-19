import { useEffect, useState } from "react";
import { ItemRecipeType } from "../types/ItemRecipeType";
import { getItemById } from "../utils/getItems";
import { ItemStatusType } from "../types/ItemStatusType";

export function useItemRecipe(itemId: string) {
  const [itemStructure, setItemStructure] = useState<ItemRecipeType>();

  useEffect(() => {
    if (getItemById(itemId) == undefined) return undefined;
    const { id, from } = getItemById(itemId);
    const DEFAULT_STATUS: ItemStatusType = "empty";

    const object: ItemRecipeType = {
      id: "0",
      position: id,
      status: DEFAULT_STATUS,
      droppedId: "",
      from: [],
    };
    if (from != undefined && from?.length > 0) {
      from?.map((f, index) => {
        const objectChild: ItemRecipeType = {
          id: (index + 1).toString(),
          position: f,
          status: DEFAULT_STATUS,
          droppedId: "",
          from: [],
        };
        const childFrom = getItemById(f).from;
        if (childFrom != undefined && childFrom.length > 0)
          childFrom.map((c, index) => {
            const objectGrandchild: ItemRecipeType = {
              id: (objectChild.id + (index + 1)).toString(),
              position: c,
              droppedId: "",
              status: DEFAULT_STATUS,
            };
            objectChild.from?.push(objectGrandchild);
          });
        object.from?.push(objectChild);
      });
    }
    setItemStructure(object);
  }, []);

  return itemStructure;
}
