import { useContext } from "react";
import ItemRecipe from "./ItemRecipe";
import { ItemContext } from "../contexts/ItemContext";
function ItemTree() {
  const { item, setItem } = useContext(ItemContext);
  return (
    <div className="w-[600] flex flex-col justify-between px-6 py-8 rounded-e-lg bg-zinc-800/80">
      <p className="text-lg font-semibold text-white">
        Adivinhe o item de hoje!
      </p>

      <ItemRecipe />
      <button
        className="w-full px-4 py-3 bg-blue-500 rounded"
        onClick={() => {
          setItem({
            ...item,
            from: item.from?.map((f) =>
              f.itemId === f.newItemId ? { ...f, status: "valid" } : f
            ),
          });
          console.log(item);
        }}
      >
        <p className="text-lg font-semibold text-white">Confirmar Receita!</p>
      </button>
    </div>
  );
}

export default ItemTree;
