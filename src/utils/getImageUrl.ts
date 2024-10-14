const RIOT_API_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/";

export const getImageByUrl = (itemId: string): string => {
  if (itemId != undefined){
    return itemId.split(".").length < 2 ? RIOT_API_URL + itemId + ".png" : RIOT_API_URL + itemId  
  }
  return "";
};
