import { getItemById } from "../utils/getItems";
import { getRandomId } from "../utils/getRandom";
import { Item } from "./ItemList";

const RIOT_API_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/";

interface Props {
  item: Item;
}

function ItemRecipe({ item }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <img
          key={item?.id + getRandomId(4)}
          className="overflow-hidden h-14 w-14 border-2 border-zinc-600"
          src={`${RIOT_API_URL}${item?.image.full}`}
          alt={item?.name}
        />
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-7 bg-zinc-600"></div>
          {item?.from?.length!! > 1 && (
            <div
              className={`${
                item?.from?.length!! > 2 ? "w-[354px]" : "w-[178px]"
              } h-0.5 bg-zinc-600`}
            ></div>
          )}
        </div>
      </div>
      <div className="flex gap-6">
        {item?.from &&
          item.from.map((child) => (
            <div>
              <div className="flex flex-col items-center">
                <div className="h-4 w-0.5 bg-zinc-600"></div>
                <img
                  key={item.name + getItemById(child)?.id + getRandomId(4)}
                  className="overflow-hidden h-12 w-12 border-2 border-zinc-600"
                  src={`${RIOT_API_URL}${getItemById(child)?.image.full}`}
                  alt={getItemById(child)?.name}
                />
                {getItemById(child)?.from?.length && (
                  <div className="flex flex-col items-center">
                    <div className="h-7 w-0.5 bg-zinc-600"></div>
                    {getItemById(child)?.from?.length!! > 1 && (
                      <div
                        className={`${
                          getItemById(child)?.from?.length!! > 2
                            ? "w-[114px]"
                            : "w-[58px]"
                        } h-0.5 bg-zinc-600`}
                      ></div>
                    )}
                  </div>
                )}
              </div>
              <div className={"w-[152px] flex gap-4 justify-center"}>
                {getItemById(child)?.from?.length &&
                  getItemById(child)?.from?.map((grandchild) => (
                    <>
                      <div className="flex flex-col items-center">
                        {getItemById(child)?.from?.length && (
                          <div
                            className={`${
                              getItemById(child)?.from?.length!! > 1
                                ? "h-3.5"
                                : "h-4"
                            } w-0.5 bg-zinc-600`}
                          ></div>
                        )}
                        <img
                          key={
                            item.name +
                            getItemById(grandchild)?.id +
                            getRandomId(4)
                          }
                          className="overflow-hidden h-10 w-10 border-2 border-zinc-600 "
                          src={`${RIOT_API_URL}${
                            getItemById(grandchild)?.image.full
                          }`}
                          alt={getItemById(grandchild)?.name}
                        />
                      </div>
                    </>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ItemRecipe;
