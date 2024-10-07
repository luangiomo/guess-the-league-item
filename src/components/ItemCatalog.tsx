import ItemList from "./ItemList";

function ItemCatalog() {
  return (
    <div className="flex flex-col gap-6 rounded-s-lg bg-zinc-900 px-6 py-8">
      {/* <ItemFilter /> */}
      <ItemList category={"basics"} showTitle />
      <ItemList category={"epics"} showTitle />
      <p className="text-sm font-semibold text-zinc-500">
        Arraste e solte os itens nos slots para preencher a receita.
      </p>
    </div>
  );
}

export default ItemCatalog;
