import { useContext } from "react";
import { createPortal } from "react-dom";
import FinishedGameModal from "../components/FinishedGameModal";
import Game from "../components/Game";
import Hero from "../components/Hero";
import { GameStateContext } from "../contexts/GameStateContext";

function Home() {
  const { gameState } = useContext(GameStateContext);

  return (
    <main className="mx-auto flex w-full flex-col items-center justify-center gap-12 min-[968px]:w-[1024px]">
      {gameState.gameStatus === "standby" ? <Hero /> : null}
      {gameState.gameStatus === "playing" ? <Game /> : null}
      {gameState.gameStatus === "win" || gameState.gameStatus === "lose"
        ? createPortal(<FinishedGameModal />, document.body)
        : null}
    </main>
  );
}

export default Home;
