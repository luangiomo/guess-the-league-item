import database from "../data/item.json";
import { ItemCategory } from "../types/ItemCategoryType";
import { ItemRecipeType } from "../types/ItemRecipeType";
import { ItemStatusType } from "../types/ItemStatusType";
import { ItemType } from "../types/ItemType";
import { getRandomNumber } from "./getRandomNumber";

const basics: string[] = [
  "1038",
  "1058",
  "1037",
  "1026",
  "1018",
  "1028",
  "1033",
  "1052",
  "1036",
  "3070",
  "1006",
  "1027",
  "1029",
  "1042",
  "2022",
  "1004",
];
const epics: string[] = [
  "2420",
  "4632",
  "3035",
  "2020",
  "3140",
  "3147",
  "3155",
  "3803",
  "6670",
  "3211",
  "3051",
  "3077",
  "3086",
  "3802",
  "2021",
  "2019",
  "3044",
  "3145",
  "4630",
  "3133",
  "3082",
  "3134",
  "1011",
  "1053",
  "2508",
  "3024",
  "3057",
  "3113",
  "4642",
  "6660",
  "1057",
  "3108",
  "1031",
  "3066",
  "3067",
  "3076",
  "3123",
  "3801",
  "3916",
  "6690",
  "1043",
  "3114",
  "3144",
];
const legendaries: string[] = [
  "3031",
  "3089",
  "3072",
  "3078",
  "2501",
  "3074",
  "3083",
  "3748",
  "6333",
  "6631",
  "3157",
  "3026",
  "3033",
  "3053",
  "3100",
  "3139",
  "3153",
  "4645",
  "6665",
  "6698",
  "3156",
  "3161",
  "4633",
  "6609",
  "6610",
  "6672",
  "3036",
  "3071",
  "3073",
  "3084",
  "3102",
  "3115",
  "3124",
  "3135",
  "3181",
  "3302",
  "3814",
  "4629",
  "6035",
  "6653",
  "6673",
  "6676",
  "6694",
  "6696",
  "6697",
  "6699",
  "3165",
  "2504",
  "3003",
  "3004",
  "3032",
  "3508",
  "3742",
  "4646",
  "6662",
  "6692",
  "3137",
  "6655",
  "2502",
  "2503",
  "3091",
  "3142",
  "4401",
  "6664",
  "3065",
  "3068",
  "3087",
  "3118",
  "3143",
  "4628",
  "6701",
  "3046",
  "3085",
  "3094",
  "6675",
  "8020",
  "3116",
  "3152",
  "3179",
  "6657",
  "3110",
  "6621",
  "6695",
  "3075",
  "3002",
  "3119",
  "3107",
  "3109",
  "3222",
  "4005",
  "6616",
  "2065",
  "3050",
  "3190",
  "3504",
  "6617",
  "6620",
  "3011",
];
const all: string[] = [...basics, ...epics, ...legendaries];

// Deleted ids: ["4638","4643","3041","3869","3870","3871","3876","3877","3121","3172"]

export const getAllItems = () => {
  const items = Object.values(database.data);
  const itemsId = Object.keys(database.data);

  const itemsList = [];

  for (const index in items) {
    itemsList.push(Object.assign(items[index], { id: itemsId[index] }));
  }
  return itemsList;
};

export const getItemsByCategory = (itemCategory: ItemCategory): ItemType[] => {
  const itemsList = getAllItems();
  let category: string[] = [];

  switch (itemCategory) {
    case "all":
      category = all;
      break;
    case "basics":
      category = basics;
      break;
    case "epics":
      category = epics;
      break;
    case "legendaries":
      category = legendaries;
      break;
  }

  const items: ItemType[] = itemsList.filter((key) =>
    category.includes(key.id),
  );
  return items;
};

export const getItemById = (id: string): ItemType => {
  return getItemsByCategory("all")?.find((item) => item.id == id)!!;
};

const recycledItemsList: string[] = [];
const recycleItems = (sortedId: string): string[] => {
  if (recycledItemsList.length >= 10) {
    recycledItemsList.shift();
  }
  recycledItemsList.push(sortedId);
  return recycledItemsList;
};

export const getRandomLegendaryItemId = (): string => {
  const randomId = getRandomNumber(legendaries.length);
  const sortedId = legendaries[randomId];
  if (recycledItemsList.some((itemId) => itemId === sortedId)) {
    getRandomLegendaryItemId();
  }
  recycleItems(sortedId);
  return sortedId;
};

export const getRecipeFromItemId = (itemId: string) => {
  const { id, from } = getItemById(itemId);
  const DEFAULT_STATUS: ItemStatusType = "empty";

  const itemStructure: ItemRecipeType = {
    id: id,
    position: "0",
    droppedId: "",
    status: DEFAULT_STATUS,
    from: [],
  };
  if (from != undefined && from?.length > 0) {
    from?.map((f, index) => {
      const objectChild: ItemRecipeType = {
        id: f,
        position: (index + 1).toString(),
        droppedId: "",
        status: DEFAULT_STATUS,
        from: [],
      };
      const childFrom = getItemById(f)?.from;
      if (childFrom != undefined && childFrom.length > 0)
        childFrom.map((c, index) => {
          const objectGrandchild: ItemRecipeType = {
            id: c,
            position: (objectChild.position + (index + 1)).toString(),
            droppedId: "",
            status: DEFAULT_STATUS,
          };
          objectChild.from?.push(objectGrandchild);
        });
      itemStructure.from?.push(objectChild);
    });
    return itemStructure;
  }
  return itemStructure;
};
