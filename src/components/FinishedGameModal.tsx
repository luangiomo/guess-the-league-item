import { useContext } from "react";
import { GameStateContext } from "../contexts/GameStateContext";
import { getImageByItemId } from "../utils/getImageUrl";
import { getItemById, getRandomLegendaryItemId } from "../utils/getItems";
import ItemRecipe from "./ItemRecipe";
import HorizontalRule from "./ui/HorizontalRule";
import MyButton from "./ui/MyButton";

function FinishedGameModal() {
  const { gameState, setGameState, item } = useContext(GameStateContext);
  return (
    <div className="fixed inset-0 bg-black/85">
      <div className="fixed left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 p-6 sm:w-fit sm:min-w-[600px]">
        <div className="border border-zinc-600 bg-black">
          <div className="flex flex-col justify-center px-6 py-6">
            <header className="flex gap-6">
              <img className="h-16 w-16" src={getImageByItemId(item.id)} />
              <div>
                <h1
                  className={`text-3xl font-extrabold uppercase leading-tight tracking-tight min-[968px]:text-[32px] ${gameState.gameStatus === "win" ? "text-green-500" : "text-rose-500"}`}
                >
                  {gameState.gameStatus === "win" ? "Victory" : "Defeat"}
                </h1>
                <p className="text-sm text-[#9B9B9B] min-[968px]:text-base">
                  Your item {gameState.gameStatus === "win" ? "is" : "was"}:{" "}
                  <span
                    className={`font-bold ${gameState.gameStatus === "win" ? "text-green-500" : "text-rose-500"}`}
                  >
                    "{getItemById(item.id).name}"
                  </span>
                </p>
              </div>
            </header>
            <HorizontalRule />
            <div className="flex w-full justify-center sm:p-6">
              <ItemRecipe itemId={item.id} showItems />
            </div>
          </div>
          <footer className="flex justify-between border-t border-t-zinc-600 p-4">
            <MyButton
              type="cancel"
              onClick={() => {
                setGameState({
                  ...gameState,
                  gameStatus: "standby",
                  attemptsRemaining: 3,
                  itemId: "",
                });
              }}
            >
              Quit
            </MyButton>
            <MyButton
              onClick={() => {
                setGameState({
                  ...gameState,
                  gameStatus: "playing",
                  attemptsRemaining: 3,
                  itemId: getRandomLegendaryItemId(),
                });
              }}
            >
              Next item
            </MyButton>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default FinishedGameModal;
