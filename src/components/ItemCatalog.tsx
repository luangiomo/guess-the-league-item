import ItemFilter from "./ItemFilter";
import ItemList from "./ItemList";
import HorizontalRule from "./ui/HorizontalRule";

function ItemCatalog() {
  return (
    <section className="px-6 md:px-0">
      <div className="hidden md:block">
        <ItemFilter />
        <HorizontalRule />
      </div>
      <ItemList category={"basics"} />
      <HorizontalRule />
      <ItemList category={"epics"} />
    </section>
  );
}

export default ItemCatalog;
