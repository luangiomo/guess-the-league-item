import ItemFilter from "./ItemFilter";
import ItemList from "./ItemList";

function ItemCatalog() {
  return (
    <div className="max-w-fit flex flex-col gap-6 px-6 py-8 rounded-s-lg bg-zinc-900">
      <ItemFilter />
      <ItemList type={"basics"} showTitle />
      <ItemList type={"epics"} showTitle />
      <p className="text-sm font-semibold text-zinc-500">
        Arraste e solte os itens nos slots para preencher a receita.
      </p>
    </div>
  );
}

export default ItemCatalog;
