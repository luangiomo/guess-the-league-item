import { useContext } from "react";
import { getItemToStructure, getRandomItemId } from "../utils/getItems";
import ItemRecipe from "./ItemRecipe";
import { ItemContext } from "../contexts/ItemContext";
import { ItemStructure } from "../types/ItemStructure";
import { Status } from "../types/Status";
function ItemTree() {
  const { item, setItem } = useContext(ItemContext);
  return (
    <div className="flex w-[600] flex-col justify-between rounded-e-lg bg-zinc-800/80 px-6 py-8">
      <p className="text-lg font-semibold text-white">
        Adivinhe o item de hoje!
      </p>

      <ItemRecipe />
      <div className="flex gap-2">
        <button
          className="w-full rounded bg-gray-500 px-4 py-3 text-lg font-semibold text-white"
          onClick={() => {
            setItem(getItemToStructure(getRandomItemId()));
          }}
        >
          Sortear Item!
        </button>
        <button
          className="w-full rounded bg-blue-500 px-4 py-3 text-lg font-semibold text-white"
          onClick={() => {
            let updatedItem = {} as ItemStructure;

            updatedItem = {
              ...item,
              from: item.from?.map((itemFrom) =>
                itemFrom
                  ? {
                      ...itemFrom,
                      status: checkStatus(itemFrom.itemId, itemFrom.newItemId),
                    }
                  : itemFrom,
              ),
            };

            function checkStatus(
              itemId: string,
              newItemId: string | undefined,
            ): Status {
              if (newItemId === undefined) return "pending";
              if (itemId === newItemId) return "valid";
              if (itemId !== newItemId) return "invalid";

              return "pending";
            }

            setItem(updatedItem);
          }}
        >
          Confirmar Receita!
        </button>
      </div>
    </div>
  );
}

export default ItemTree;
