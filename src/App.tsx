import Header from "./components/Header";
import { DragContextProvider } from "./contexts/DragContext";
import { GameStateContextProvider } from "./contexts/GameStateContext";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <DragContextProvider>
        <GameStateContextProvider>
          <Home />
        </GameStateContextProvider>
      </DragContextProvider>
    </>
  );
}

export default App;
