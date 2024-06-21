import { Item } from "../components/ItemList";
import database from "../data/item.json";
import { getRandomNumber } from "./getRandom";

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
  "3172",
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
  "3119",
  "3121",
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

const allItemsId = basicItemsId.concat(epicItemsId, legendaryItemsId);
type ItemCategory = "basics" | "epics" | "legendaries" | "all";

const getAllItems = () => {
  const items = Object.values(database.data);
  const itemsId = Object.keys(database.data);

  const itemsList = [];

  for (const index in items) {
    itemsList.push(Object.assign(items[index], { id: itemsId[index] }));
  }

  return itemsList;
};

export const getItemsByType = (itemCategory: ItemCategory) => {
  const itemsList = getAllItems();

  if (itemCategory === "basics") {
    const basicItems: Item[] = itemsList.filter((key) =>
      basicItemsId.includes(key.id)
    );
    return basicItems;
  }

  if (itemCategory === "epics") {
    const epicItems: Item[] = itemsList.filter((key) =>
      epicItemsId.includes(key.id)
    );
    return epicItems;
  }

  if (itemCategory === "legendaries") {
    const legendaryItems: Item[] = itemsList.filter((key) =>
      legendaryItemsId.includes(key.id)
    );
    return legendaryItems;
  }
  if (itemCategory === "all") {
    const allItems = itemsList.filter((key) => allItemsId.includes(key.id));
    return allItems;
  }

  return;
};

export const getItemById = (id: string): Item => {
  return getItemsByType("all")?.find((item) => item.id == id)!!;
};

const sortedItems: string[] = [];
const legendaryItemsIdCopy = [...legendaryItemsId];

const recycleItemsSorted = (sortedId: number, list: string[]) => {
  const removedItem = list?.splice(sortedId, 1)[0];

  if (sortedItems.length >= 25) {
    const returnedItem = sortedItems.shift();
    legendaryItemsIdCopy.push(returnedItem!!);
    sortedItems.push(removedItem);
  } else {
    sortedItems.push(removedItem);
  }
};

export const getRandomItemByType = (itemCategory: ItemCategory) => {
  if (itemCategory === "legendaries") {
    const randomId = getRandomNumber(legendaryItemsIdCopy.length);
    const itemsList = getItemsByType(itemCategory);
    const sortedId = legendaryItemsIdCopy[randomId];
    const sortedItem = itemsList?.find((item) => item.id === sortedId);
    recycleItemsSorted(randomId, legendaryItemsIdCopy);
    console.log(sortedItem);
    return sortedItem;
  }
  return;
};
