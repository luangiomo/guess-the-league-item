import { ItemStatusType } from "./ItemStatusType";

export type ItemRecipeType = {
  id: string;
  position: string;
  droppedId: string;
  name?: string;
  status: ItemStatusType;
  from?: ItemRecipeType[];
};
