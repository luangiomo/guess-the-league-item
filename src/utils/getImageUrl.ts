const RIOT_API_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/";

export const getImageUrl = (itemId: string) => {
  return RIOT_API_URL + itemId;
};
