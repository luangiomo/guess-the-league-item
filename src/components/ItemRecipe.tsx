import { useContext, useEffect } from "react";
import { ItemContext } from "../contexts/ItemContext";
import { getImageUrl } from "../utils/getImageUrl";
import { getItemToStructure, getRandomItemByCategory } from "../utils/getItems";
import { getRandomId } from "../utils/getRandoms";

function ItemRecipe() {
  const { selectedItem, item, setItem } = useContext(ItemContext);

  useEffect(() => {
    setItem(getItemToStructure(getRandomItemByCategory("legendaries")!!));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <img
          className="overflow-hidden h-14 w-14 border-2 border-zinc-700"
          src={getImageUrl(item?.itemId + ".png")}
          onClick={() => console.log(item)}
        />
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-7 bg-zinc-700"></div>
          {item.from?.length!! > 1 && (
            <div
              className={`${
                item.from?.length!! > 2 ? "w-[354px]" : "w-[178px]"
              } h-0.5 bg-zinc-700`}
            ></div>
          )}
        </div>
      </div>
      <div className="flex gap-6">
        {item.from?.length!! > 0 &&
          item.from?.map((child) => (
            <div>
              <div className="flex flex-col items-center">
                <div className="h-4 w-0.5 bg-zinc-700"></div>
                <img
                  key={item.name + child?.itemId + getRandomId(4)}
                  onClick={() => console.log(child.itemId)}
                  onDrop={() =>
                    console.log(selectedItem, child.itemId, child.id)
                  }
                  onDragOver={(e) => e.preventDefault()}
                  className="overflow-hidden h-12 w-12 border-2 border-zinc-700"
                  src={getImageUrl(child?.itemId + ".png")}
                  alt={child?.name}
                />
                {child?.from?.length!! > 0 && (
                  <div className="flex flex-col items-center">
                    <div className="h-7 w-0.5 bg-zinc-700"></div>
                    {child?.from?.length!! > 1 && (
                      <div
                        className={`${
                          child?.from?.length!! > 2 ? "w-[114px]" : "w-[58px]"
                        } h-0.5 bg-zinc-700`}
                      ></div>
                    )}
                  </div>
                )}
              </div>
              <div className={"w-[152px] flex gap-4 justify-center"}>
                {child?.from?.length!! > 0 &&
                  child?.from?.map((grandchild) => (
                    <>
                      <div className="flex flex-col items-center">
                        {child?.from?.length && (
                          <div
                            className={`${
                              child?.from?.length!! > 1 ? "h-3.5" : "h-4"
                            } w-0.5 bg-zinc-700`}
                          ></div>
                        )}
                        <img
                          key={item.name + grandchild?.itemId + getRandomId(4)}
                          onDrop={() => {
                            selectedItem === grandchild.itemId
                              ? (grandchild.status = "valid")
                              : (grandchild.status = "invalid");

                            console.log(
                              selectedItem,
                              grandchild.itemId,
                              grandchild.id,
                              grandchild.status
                            );
                          }}
                          onDragOver={(e) => e.preventDefault()}
                          className={`overflow-hidden h-10 w-10 border-2 ${
                            grandchild.status == "valid"
                              ? "border-green-500"
                              : "border-zinc-700"
                          }`}
                          src={getImageUrl(grandchild?.itemId + ".png")}
                          alt={grandchild?.name}
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
