import ItemCatalog from "./components/ItemCatalog";
import ItemTree from "./components/ItemTree";

function App() {
  return (
    <main className="h-screen gap-12 flex justify-center items-center">
      <div className="flex">
        <ItemCatalog />
        <ItemTree />
      </div>
    </main>
  );
}

export default App;
