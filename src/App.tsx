import ItemCatalog from "./components/ItemCatalog";
import ItemTree from "./components/ItemTree";
import { ItemContextProvider } from "./contexts/ItemContext";

function App() {
  return (
    <main className="h-screen gap-12 flex justify-center items-center">
      <div className="flex">
        <ItemContextProvider>
          <ItemCatalog />
          <ItemTree />
        </ItemContextProvider>
      </div>
    </main>
  );
}

export default App;
