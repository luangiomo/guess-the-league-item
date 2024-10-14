import { useEffect, useState } from "react";
import { ItemStructure } from "../types/ItemStructure";
import { getItemById } from "../utils/getItems";
import { Status } from "../types/Status";

export function useItemStructure(itemId: string) {
  const [itemStructure, setItemStructure] = useState<ItemStructure>();

  useEffect(() => {
    if (getItemById(itemId) == undefined) return undefined;
    const { id, from } = getItemById(itemId);
    const DEFAULT_STATUS: Status = "pending";

    const object: ItemStructure = {
      id: "0",
      itemId: id,
      status: DEFAULT_STATUS,
      newItemId: "",
      from: [],
    };
    if (from != undefined && from?.length > 0) {
      console.log("entrei", id, from);
      from?.map((f, index) => {
        const objectChild: ItemStructure = {
          id: (index + 1).toString(),
          itemId: f,
          status: DEFAULT_STATUS,
          newItemId: "",
          from: [],
        };
        const childFrom = getItemById(f).from;
        if (childFrom != undefined && childFrom.length > 0)
          childFrom.map((c, index) => {
            const objectGrandchild: ItemStructure = {
              id: (objectChild.id + (index + 1)).toString(),
              itemId: c,
              newItemId: "",
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
