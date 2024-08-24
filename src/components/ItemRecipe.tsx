import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ItemContext } from "../contexts/ItemContext";
import { getImageByUrl } from "../utils/getImageUrl";
import { getItemToStructure, getRandomItemByCategory } from "../utils/getItems";
import { getRandomId } from "../utils/getRandoms";

function ItemRecipe() {
  const { selectedItem, setSelectedItem, item, setItem } =
    useContext(ItemContext);

  useLayoutEffect(() => {
    const selectedItem = getRandomItemByCategory("legendaries");
    if (selectedItem != undefined) {
      const itemStructure = getItemToStructure(selectedItem);
      setItem(itemStructure);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center">
        <img
          className="h-14 w-14 border-2 border-zinc-700"
          src={getImageByUrl(item.itemId)}
        />
        <div className="flex flex-col items-center">
          <span className="w-0.5 h-7 bg-zinc-700" />
          <span
            className={`h-0.5 bg-zinc-700
              ${
                item.from && item.from?.length > 2 ? "w-[354px]" : "w-[178px]"
              }`}
          />
        </div>
      </div>
      <div className="flex gap-6">
        {item.from?.map((child) => (
          <div className="min-w-[152px] flex flex-col items-center">
            <span className="w-0.5 h-4 bg-zinc-700" />
            <div
              key={child.id + child.itemId}
              className={`h-12 w-12 border-2 border-zinc-700 bg-black ${
                child.newItemId != undefined && child.newItemId.length > 0
                  ? "cursor-grab"
                  : "cursor-default"
              }`}
              onContextMenu={(e) => {
                e.preventDefault();
                if (
                  child.newItemId != undefined &&
                  child.newItemId.length > 0
                ) {
                  setItem({
                    ...item,
                    from: item.from?.map((f) =>
                      f.id === child.id ? { ...f, newItemId: "" } : f
                    ),
                  });
                }
              }}
              draggable={
                child.newItemId != undefined && child.newItemId.length > 0
              }
              onDragStart={() =>
                child.newItemId && setSelectedItem(child.newItemId)
              }
              onDragEnd={() => {
                if (child.newItemId) {
                  setItem({
                    ...item,
                    from: item.from?.map((f) =>
                      f.id === child.id ? { ...f, newItemId: "" } : f
                    ),
                  });
                }
              }}
              onDrop={() => {
                setItem({
                  ...item,
                  from: item.from?.map((f) =>
                    f.id === child.id ? { ...f, newItemId: selectedItem } : f
                  ),
                });
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {child.newItemId != undefined && child.newItemId.length > 0 && (
                <img src={getImageByUrl(child.newItemId)} alt={child.name} />
              )}
            </div>
            {child.from && child.from.length > 0 && (
              <div className="flex flex-col items-center">
                <span className="w-0.5 h-7 bg-zinc-700" />
                {child.from.length > 1 && (
                  <span
                    className={`h-0.5 bg-zinc-700 ${
                      child.from.length > 2 ? "w-[114px]" : "w-[58px]"
                    }`}
                  />
                )}
                <div className="flex gap-4">
                  {child.from.map((grandchild) => (
                    <div className="flex flex-col items-center">
                      <span
                        className={`w-0.5 bg-zinc-700 ${
                          child.from && child.from.length > 1 ? "h-3.5" : "h-4"
                        }`}
                      />
                      <div
                        key={grandchild.id + grandchild.itemId}
                        className={`h-10 w-10 border-2 border-zinc-700 bg-black ${
                          grandchild.newItemId != undefined &&
                          grandchild.newItemId.length > 0
                            ? "cursor-grab"
                            : "cursor-default"
                        }`}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          if (
                            child.newItemId != undefined &&
                            child.newItemId.length > 0
                          ) {
                            setItem({
                              ...item,
                              from: item.from?.map((f) =>
                                f.id === grandchild.id[0]
                                  ? {
                                      ...f,
                                      from: f.from?.map((f) =>
                                        f.id === grandchild.id
                                          ? { ...f, newItemId: "" }
                                          : f
                                      ),
                                    }
                                  : f
                              ),
                            });
                          }
                        }}
                        draggable={
                          grandchild.newItemId != undefined &&
                          grandchild.newItemId.length > 0
                        }
                        onDragStart={() =>
                          grandchild.newItemId &&
                          setSelectedItem(grandchild.newItemId)
                        }
                        onDragEnd={() => {
                          if (child.newItemId) {
                            setItem({
                              ...item,
                              from: item.from?.map((f) =>
                                f.id === grandchild.id[0]
                                  ? {
                                      ...f,
                                      from: f.from?.map((f) =>
                                        f.id === grandchild.id
                                          ? { ...f, newItemId: "" }
                                          : f
                                      ),
                                    }
                                  : f
                              ),
                            });
                          }
                        }}
                        onDrop={() => {
                          setItem({
                            ...item,
                            from: item.from?.map((f) =>
                              f.id === grandchild.id[0]
                                ? {
                                    ...f,
                                    from: f.from?.map((f) =>
                                      f.id === grandchild.id
                                        ? { ...f, newItemId: selectedItem }
                                        : f
                                    ),
                                  }
                                : f
                            ),
                          });
                        }}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        {grandchild.newItemId != undefined &&
                          grandchild.newItemId.length > 0 && (
                            <img
                              src={getImageByUrl(grandchild.newItemId)}
                              alt={grandchild.name}
                            />
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemRecipe;
