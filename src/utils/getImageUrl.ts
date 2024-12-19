const RIOT_API_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/";

export const getImageByItemId = (itemId: string): string => {
  if (itemId != undefined) {
    return itemId.split(".").length < 2
      ? RIOT_API_URL + itemId + ".png"
      : RIOT_API_URL + itemId;
  }
  return "";
};
