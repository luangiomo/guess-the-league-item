import ItemRecipe from "./ItemRecipe";
function ItemTree() {
  return (
    <div className="w-[600] flex flex-col justify-between px-6 py-8 rounded-e-lg bg-zinc-800/80">
      <p className="text-lg font-semibold text-white">
        Adivinhe o item de hoje!
      </p>

      <ItemRecipe />
      <button className="w-full px-4 py-3 bg-blue-500 rounded">
        <p className="text-lg font-semibold text-white">Confirmar Receita!</p>
      </button>
    </div>
  );
}

export default ItemTree;
