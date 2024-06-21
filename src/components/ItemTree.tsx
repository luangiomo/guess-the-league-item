import { useState } from "react";
import { Item, getRandomItemByType } from "../utils/getItems";
import ItemRecipe from "./ItemRecipe";

type ItemStatus = "invalid" | "valid" | "almost";

interface ItemTree {
  id: string;
  status: ItemStatus;
  from: ItemTree[];
}

function ItemTree() {
  // const newItem = {
  //   id: "3085",
  //   status: "invalid"
  //   from: [
  //     {
  //       id: "3140",
  //       status: "invalid"
  //       from: [
  //         {
  //           id: "1033",
  //           from: [],
  //         },
  //         {
  //           id: "1233",
  //           from: [],
  //         },
  //         {
  //           id: "2512",
  //           from: [],
  //         },
  //       ],
  //     },
  //     {
  //       id: "1037",
  //       from: [],
  //     },
  //     {
  //       id: "1028",
  //       from: [],
  //     },
  //   ],
  // };
  const [item, setItem] = useState<Item>();
  return (
    <div className="w-[600] flex flex-col justify-between px-6 py-8 rounded-e-lg bg-zinc-800/80">
      <p className="text-lg font-semibold text-white">
        Adivinhe o item de hoje!
      </p>
      <ItemRecipe item={item!!} />
      <button
        onClick={() => {
          setItem(getRandomItemByType("legendaries"));
        }}
        className="w-fulll px-4 py-3 bg-blue-500 rounded"
      >
        <p className="text-lg font-semibold text-white">Confirmar Receita!</p>
      </button>
    </div>
  );
}

export default ItemTree;
