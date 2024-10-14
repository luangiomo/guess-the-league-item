import database from "../data/item.json";
import { Item } from "../types/Item";
import { ItemCategory } from "../types/ItemCategory";
import { ItemStructure } from "../types/ItemStructure";
import { Status } from "../types/Status";
import { getRandomNumber } from "./getRandoms";

const basicItemsId: string[] = [
  "1038",
  "1058",
  "1037",
  "1026",
  "1018",
  "1033",
  "1028",
  "1052",
  "1027",
  "1036",
  "1006",
  "1029",
  "1042",
  "1004",
  "2022",
];
const epicItemsId: string[] = [
  "2420",
  "4632",
  "3041",
  "3035",
  "6670",
  "2020",
  "3051",
  "3140",
  "3147",
  "3155",
  "3803",
  "3211",
  "3077",
  "3802",
  "2021",
  "2019",
  "3044",
  "3086",
  "3133",
  "3145",
  "4630",
  "4638",
  "3082",
  "3134",
  "4642",
  "3024",
  "1011",
  "1053",
  "1057",
  "2508",
  "3057",
  "3108",
  "3144",
  "6660",
  "6690",
  "3113",
  "1031",
  "3066",
  "3067",
  "3076",
  "3114",
  "3123",
  "3801",
  "3916",
  "1043",
];
const legendaryItemsId: string[] = [
  "3089",
  "3031",
  "3072",
  "3078",
  "2501",
  "3074",
  "3139",
  "3748",
  "6631",
  "6698",
  "3157",
  "3026",
  "3032",
  "3053",
  "3153",
  "3508",
  "4645",
  "6333",
  "6665",
  "6676",
  "6694",
  "3083",
  "3100",
  "3102",
  "3156",
  "3161",
  "4633",
  "6610",
  "6672",
  "3033",
  "3036",
  "3071",
  "3073",
  "3084",
  "3115",
  "3124",
  "3135",
  "3181",
  "3302",
  "4629",
  "6035",
  "6653",
  "6673",
  "6696",
  "6697",
  "2504",
  "3003",
  "3004",
  "3065",
  "3087",
  "3742",
  "4646",
  "6655",
  "6699",
  "3137",
  "2502",
  "2503",
  "3091",
  "3814",
  "4401",
  "6609",
  "6664",
  "6692",
  "3068",
  "3075",
  "3118",
  "3142",
  "3143",
  "4628",
  "6621",
  "6701",
  "3046",
  "3085",
  "3094",
  "3116",
  "3152",
  "3179",
  "6657",
  "6662",
  "6675",
  "3002",
  "3110",
  "6695",
  "3107",
  "3222",
  "3504",
  "4005",
  "6616",
  "8020",
  "2065",
  "3050",
  "3109",
  "3165",
  "3190",
  "6617",
  "6620",
  "3011",
];
const allItemsId: string[] = [
  ...basicItemsId,
  ...epicItemsId,
  ...legendaryItemsId,
];

const getAllItems = () => {
  const items = Object.values(database.data);
  const itemsId = Object.keys(database.data);

  const itemsList = [];

  for (const index in items) {
    itemsList.push(Object.assign(items[index], { id: itemsId[index] }));
  }
  return itemsList;
};

export const getItemsByCategory = (itemCategory: ItemCategory): Item[] => {
  const itemsList = getAllItems();
  let category: string[] = [];

  switch (itemCategory) {
    case "all":
      category = allItemsId;
      break;
    case "basics":
      category = basicItemsId;
      break;
    case "epics":
      category = epicItemsId;
      break;
    case "legendaries":
      category = legendaryItemsId;
      break;
    default:
      category = [];
      break;
  }

  const items: Item[] = itemsList.filter((key) => category.includes(key.id));
  return items;
};

export const getItemById = (id: string): Item => {
  return getItemsByCategory("all")?.find((item) => item.id == id)!!;
};

const sortedItems: string[] = [];
const legendaryItemsIdCopy = [...legendaryItemsId];

const recycleItemsSorted = (sortedId: number, list: string[]) => {
  const removedItem = list?.splice(sortedId, 1)[0];

  if (sortedItems.length >= 10) {
    const returnedItem = sortedItems.shift();
    legendaryItemsIdCopy.push(returnedItem!!);
    sortedItems.push(removedItem);
  } else {
    sortedItems.push(removedItem);
  }
  console.log(sortedItems);
};

export const getRandomItemId = (): string => {
  const randomId = getRandomNumber(legendaryItemsIdCopy.length);
  const sortedId = legendaryItemsIdCopy[randomId];
  recycleItemsSorted(randomId, legendaryItemsIdCopy);
  return sortedId;
};

export const getRandomItemByCategory = (itemCategory: ItemCategory) => {
  if (itemCategory === "legendaries") {
    const randomId = getRandomNumber(legendaryItemsIdCopy.length);
    const itemsList = getItemsByCategory(itemCategory);
    const sortedId = legendaryItemsIdCopy[randomId];
    const sortedItem = itemsList?.find((item) => item.id === sortedId);
    recycleItemsSorted(randomId, legendaryItemsIdCopy);
    return sortedId;
  }
};

export const getItemToStructure = (itemId: string) => {
  const { id, from } = getItemById(itemId);
  const DEFAULT_STATUS: Status = "pending";

  const object: ItemStructure = {
    id: "0",
    itemId: id,
    status: DEFAULT_STATUS,
    from: [],
  };
  if (from != undefined && from?.length > 0) {
    console.log("entrei", id, from);
    from?.map((f, index) => {
      const objectChild: ItemStructure = {
        id: (index + 1).toString(),
        itemId: f,
        status: DEFAULT_STATUS,
        newItemId: "",
        from: [],
      };
      const childFrom = getItemById(f).from;
      if (childFrom != undefined && childFrom.length > 0)
        childFrom.map((c, index) => {
          const objectGrandchild: ItemStructure = {
            id: (objectChild.id + (index + 1)).toString(),
            itemId: c,
            status: DEFAULT_STATUS,
            newItemId: "",
          };
          objectChild.from?.push(objectGrandchild);
        });
      object.from?.push(objectChild);
    });
    // localStorage.setItem("sortedItem", JSON.stringify(object))
    return object;
  }
  // localStorage.setItem("sortedItem", JSON.stringify(object))
  return object;
};
