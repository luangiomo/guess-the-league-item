import { Status } from "./Status";

export type ItemStructure = {
    id: string;
    itemId: string;
    name?: string;
    newItemId?: string;
    status: Status;
    from?: ItemStructure[];
  }