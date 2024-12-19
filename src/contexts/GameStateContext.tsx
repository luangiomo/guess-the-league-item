import {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
  useState,
} from "react";
import { ActionProps, itemReducer } from "../reducers/ItemReducer";
import { GameStateType } from "../types/GameStateType";
import { ItemRecipeType } from "../types/ItemRecipeType";
import {
  getRandomLegendaryItemId,
  getRecipeFromItemId,
} from "../utils/getItems";

type GameStateContextType = {
  gameState: GameStateType;
  setGameState: (newState: GameStateType) => void;
  item: ItemRecipeType;
  dispatch: Dispatch<ActionProps>;
};

const DEFAULT_VALUE: GameStateContextType = {
  gameState: {
    itemId: "",
    gameStatus: "standby",
    attemptsRemaining: 3,
    difficultyLevel: "beginner",
  },
  setGameState: () => {},
  item: {} as ItemRecipeType,
  dispatch: () => {},
};

interface GameStateContextProviderProps {
  children: ReactNode;
}

export const GameStateContext =
  createContext<GameStateContextType>(DEFAULT_VALUE);

export const GameStateContextProvider = ({
  children,
}: GameStateContextProviderProps) => {
  const [gameState, setGameState] = useState(DEFAULT_VALUE.gameState);
  const [item, dispatch] = useReducer(
    itemReducer,
    getRecipeFromItemId(getRandomLegendaryItemId()),
  );
  return (
    <GameStateContext.Provider
      value={{
        gameState,
        setGameState,
        item,
        dispatch,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};
