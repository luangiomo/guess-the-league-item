import { getItemById } from "../utils/getItems";

const item = {
  id: "3085",
  from: ["3140", "1037", "1028"],
};
const newItem = {
  id: "3085",
  from: [
    {
      id: "3140",
      from: [
        {
          id: "1033",
          from: undefined,
        },
      ],
    },
    {
      id: "1037",
      from: undefined,
    },
    {
      id: "1028",
      from: undefined,
    },
  ],
};
