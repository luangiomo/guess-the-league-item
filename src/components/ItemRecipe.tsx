import { useContext, useEffect, useState } from "react";
import { DragContext } from "../contexts/DragContext";
import { GameStateContext } from "../contexts/GameStateContext";
import { ItemRecipeType } from "../types/ItemRecipeType";
import { ItemStatusType } from "../types/ItemStatusType";
import { getImageByItemId } from "../utils/getImageUrl";

type ItemRecipeProps = {
  itemId: string;
  isCarousel?: boolean;
  showItems?: boolean;
};

function ItemRecipe({ itemId, isCarousel, showItems }: ItemRecipeProps) {
  const { currentDragId, setCurrentDragId, isDraggable, setIsDraggable } =
    useContext(DragContext);
  const { gameState, item, dispatch } = useContext(GameStateContext);
  const [newItem, setNewItem] = useState({
    id: "",
    position: "",
  });

  useEffect(() => {
    dispatch({ type: "change_full_item", id: itemId });
  }, [itemId]);

  useEffect(() => {
    dispatch({ type: "change_full_item", id: itemId });
  }, [gameState.itemId]);

  const styleFromStatus = (status: ItemStatusType) => {
    if (isDraggable && status !== "valid") return "border-blue-500";
    switch (status) {
      case "empty":
        return "border-zinc-600 cursor-default select-none";
      case "pending":
        return "border-white cursor-grab";
      case "valid":
        return "border-green-500 cursor-default select-none";
      case "invalid":
        return "border-rose-500 cursor-grab";
      case "partial":
    }
  };

  const draggableValidation = (status: ItemStatusType): boolean => {
    return status === "pending" || status === "partial" || status === "invalid";
  };

  const resetDragState = () => {
    setIsDraggable(false);
    setCurrentDragId("");
    setNewItem({
      id: "",
      position: "",
    });
  };

  const getBackgroundImage = (item: ItemRecipeType): string => {
    if (showItems) return `url(${getImageByItemId(item.id)})`;
    return item.droppedId != ""
      ? `url(${getImageByItemId(item.droppedId)})`
      : "";
  };

  return (
    <div
      className="flex w-full scale-[0.8] flex-col items-center sm:scale-100"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex flex-col items-center">
        {isCarousel !== true && (
          <div
            className="h-16 w-16 select-none border-2 border-zinc-700"
            draggable={false}
            style={{
              backgroundSize: "contain",
              backgroundImage: `url(${getImageByItemId(itemId)})`,
            }}
          />
        )}
        <div className="flex flex-col items-center">
          <span className="h-7 w-0.5 bg-zinc-700" />
          <span
            className={`h-0.5 bg-zinc-700 ${
              item.from && item.from?.length > 2 ? "w-[354px]" : "w-[178px]"
            }`}
          />
        </div>
      </div>
      <div className="flex justify-between gap-6">
        {item.from?.map((child) => (
          <div
            className="flex min-w-[152px] flex-col items-center"
            key={child.position}
          >
            <span className="h-4 w-0.5 bg-zinc-700" />
            <button
              className={`h-12 w-12 border-2 bg-black ${styleFromStatus(child.status)} `}
              draggable={draggableValidation(child.status)}
              onDragStart={() => {
                if (draggableValidation(child.status)) {
                  setNewItem({
                    id: child.droppedId,
                    position: child.position,
                  });
                  setIsDraggable(true);
                  setCurrentDragId(child.droppedId);
                }
              }}
              onDragEnd={resetDragState}
              onDrop={() => {
                if (child.status === "valid") return;
                if (newItem.id !== "" || newItem.position !== "") {
                  dispatch({
                    type: "switch_items",
                    newItem: newItem,
                    oldItem: {
                      id: child.droppedId,
                      position: child.position,
                    },
                  });
                }
                dispatch({
                  type: "add_item",
                  position: child.position,
                  currentDragId: currentDragId,
                });
                return;
              }}
              onDragLeave={(e) => e.preventDefault()}
              onDragOver={(e) => e.preventDefault()}
              onContextMenu={(e) => {
                e.preventDefault();
                if (draggableValidation(child.status)) {
                  dispatch({
                    type: "delete_item",
                    position: child.position,
                  });
                }
              }}
              style={{
                backgroundSize: "contain",
                backgroundImage: getBackgroundImage(child),
              }}
            />
            {child.from && child.from.length > 0 && (
              <div className="flex flex-col items-center">
                <span className="h-7 w-0.5 bg-zinc-700" />
                {child.from.length > 1 && (
                  <span
                    className={`h-0.5 bg-zinc-700 ${
                      child.from.length > 2 ? "w-[114px]" : "w-[58px]"
                    }`}
                  />
                )}
                <div className="flex gap-4">
                  {child.from.map((grandchild) => (
                    <div
                      className="flex flex-col items-center"
                      key={grandchild.position}
                    >
                      <span
                        className={`w-0.5 bg-zinc-700 ${
                          child.from && child.from.length > 1 ? "h-3.5" : "h-4"
                        }`}
                      />
                      <button
                        className={`h-10 w-10 border-2 bg-black ${styleFromStatus(grandchild.status)}`}
                        draggable={draggableValidation(grandchild.status)}
                        onDragStart={() => {
                          if (draggableValidation(grandchild.status)) {
                            setNewItem({
                              id: grandchild.droppedId,
                              position: grandchild.position,
                            });
                            setIsDraggable(true);
                            setCurrentDragId(grandchild.droppedId);
                          }
                        }}
                        onDragEnd={resetDragState}
                        onDrop={() => {
                          if (grandchild.status === "valid") return;
                          if (newItem.id !== "" || newItem.position !== "") {
                            dispatch({
                              type: "switch_items",
                              newItem: newItem,
                              oldItem: {
                                id: grandchild.droppedId,
                                position: grandchild.position,
                              },
                            });
                          }
                          dispatch({
                            type: "add_item",
                            position: grandchild.position,
                            currentDragId: currentDragId,
                          });
                          return;
                        }}
                        onDragLeave={(e) => e.preventDefault()}
                        onDragOver={(e) => e.preventDefault()}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          if (draggableValidation(grandchild.status)) {
                            dispatch({
                              type: "delete_item",
                              position: grandchild.position,
                            });
                          }
                        }}
                        style={{
                          backgroundSize: "contain",
                          backgroundImage: getBackgroundImage(grandchild),
                        }}
                      />
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
