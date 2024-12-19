import { useContext, useEffect, useState } from "react";
import { Heart, RightClick } from "../assets/icons";
import { GameStateContext } from "../contexts/GameStateContext";
import { ItemRecipeType } from "../types/ItemRecipeType";
import ItemCatalog from "./ItemCatalog";
import ItemRecipe from "./ItemRecipe";
import MyButton from "./ui/MyButton";

function Game() {
  const { gameState, setGameState, item, dispatch } =
    useContext(GameStateContext);
  const [showModal, setShowModal] = useState(false);

  const checkStatus = () => {
    dispatch({ type: "check_status" });
    setGameState({
      ...gameState,
      attemptsRemaining:
        gameState.attemptsRemaining > 0
          ? gameState.attemptsRemaining - 1
          : gameState.attemptsRemaining,
    });
  };

  const checkIfWin = (item: ItemRecipeType): boolean => {
    const status: string[] = [];
    item.from?.forEach((child) => {
      status.push(child.status);
      child.from?.forEach((grandchild) => {
        status.push(grandchild.status);
      });
    });
    return [...new Set(status)][0] === "valid";
  };

  useEffect(() => {
    if (gameState.attemptsRemaining > 0) {
      checkIfWin(item) && setGameState({ ...gameState, gameStatus: "win" });
      return;
    }
    setGameState({ ...gameState, gameStatus: "lose" });
  }, [gameState.attemptsRemaining]);

  return (
    <>
      <div className="mt-8 flex w-full flex-col-reverse justify-between px-8 sm:min-h-[630px] md:mt-20 md:flex-row">
        <ItemCatalog />
        <section className="flex flex-col justify-between sm:min-w-[504px]">
          <div className="flex justify-between">
            <p className="flex items-center gap-2 text-sm text-zinc-400">
              Attempts Remaining:
              <span className="flex gap-1">
                {[...Array(3)].map((_, index) => (
                  <span
                    className={`${index < gameState.attemptsRemaining ? "fill-rose-500" : "fill-gray-600"} `}
                    key={index}
                  >
                    <Heart />
                  </span>
                ))}
              </span>
            </p>
            <p className="flex items-center gap-2 text-sm text-zinc-400">
              Remove Item:
              <span className="fill-white">
                <RightClick />
              </span>
            </p>
          </div>
          <ItemRecipe itemId={gameState.itemId} />
          <MyButton full onClick={checkStatus}>
            Confirm Build Path!
          </MyButton>
        </section>
      </div>
    </>
  );
}

export default Game;
