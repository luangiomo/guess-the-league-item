const RIOT_API_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/";

export const getImageByUrl = (itemId: string): string => {
  if (itemId.split(".").length < 2) return RIOT_API_URL + itemId + ".png";
  return RIOT_API_URL + itemId;
};
