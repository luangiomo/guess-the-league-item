export type GameStateType = {
  attemptsRemaining: number;
  difficultyLevel: DificultLevel;
  gameStatus: GameStatus;
  itemId: string;
};

type DificultLevel = "beginner" | "casual" | "proplayer";
type GameStatus = "standby" | "playing" | "win" | "lose";
