import { getItemsByType } from "../utils/getItems";
import ItemFilter from "./ItemFilter";
import ItemList from "./ItemList";

function ItemCatalog() {
  const basicItems = getItemsByType("basics");
  const epicItems = getItemsByType("epics");
  //   const legendaryItems = getItemsByType("legendaries");

  return (
    <div className="max-w-fit flex flex-col gap-6 px-6 py-8 rounded-s-lg bg-zinc-900">
      <ItemFilter />
      <div>
        <p className="select-none mb-2 text-lg font-semibold text-white">
          Iniciais & Básicos
        </p>
        {basicItems ? (
          <ItemList items={basicItems} />
        ) : (
          <p className="text-lg font-semibold text-white">
            Falha ao carregar!!
          </p>
        )}
      </div>
      <div>
        <p className="mb-2 text-lg font-semibold text-white">Épicos</p>
        {epicItems ? (
          <ItemList items={epicItems} />
        ) : (
          <p className="text-lg font-semibold text-white">
            Falha ao carregar!!
          </p>
        )}
      </div>
      <p className="text-sm font-semibold text-zinc-500">
        Arraste e solte os itens nos slots para preencher a receita.
      </p>
    </div>
  );
}

export default ItemCatalog;
