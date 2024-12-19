import { useContext } from "react";
import { GameStateContext } from "../contexts/GameStateContext";
import { getRandomLegendaryItemId } from "../utils/getItems";
import Carousel from "./Carousel";
import MyButton from "./ui/MyButton";

function Hero() {
  const { gameState, setGameState } = useContext(GameStateContext);

  const startGame = () => {
    setGameState({
      ...gameState,
      gameStatus: "playing",
      itemId: getRandomLegendaryItemId(),
    });
  };

  return (
    <section className="mt-20 flex w-full flex-col-reverse items-center justify-between gap-8 px-8 md:mt-28 min-[968px]:flex-row min-[968px]:items-start">
      <div className="flex h-60 flex-col items-center gap-8 text-center min-[968px]:items-start min-[968px]:justify-between min-[968px]:pl-6 min-[968px]:text-left lg:pl-0">
        <div>
          <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight text-white min-[968px]:text-[32px]">
            Guess the League
            <br />
            of Legends item
          </h1>
          <p className="text-sm text-[#9B9B9B] min-[968px]:text-base">
            Drag and drop the items into the available slots
            <br />
            to complete the build path!
          </p>
        </div>
        <MyButton onClick={() => startGame()}>Play</MyButton>
      </div>
      <div className="flex justify-center sm:h-[244px] sm:min-w-[504px]">
        <Carousel />
      </div>
    </section>
  );
}

export default Hero;
