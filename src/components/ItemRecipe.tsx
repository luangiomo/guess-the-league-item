import { useContext, useEffect, useReducer, useState } from "react";
import { ItemContext } from "../contexts/ItemContext";
import { itemReducer } from "../reducers/ItemReducer";
import { ItemStructure } from "../types/ItemStructure";
import { getImageByUrl } from "../utils/getImageUrl";
import { getItemToStructure, getRandomItemId } from "../utils/getItems";

function ItemRecipe() {
  const {
    currentDragItemId,
    setCurrentDragItemId,
    isDraggable,
    setIsDraggable,
  } = useContext(ItemContext);

  const [previousItemId, setPreviousItemId] = useState("");

  useEffect(() => {
    if (previousItemId) console.log(previousItemId);
  }, [previousItemId]);

  // let initialState: ItemStructure = {
  //   id: "0",
  //   itemId: "",
  //   status: "pending",
  //   from: [],
  // };

  const getInitialState = (): ItemStructure => {
    try {
      const storage = localStorage.getItem("item");
      return storage
        ? JSON.parse(storage)
        : getItemToStructure(getRandomItemId());
    } catch (error) {
      console.log(error);
      return getItemToStructure(getRandomItemId());
    }
  };

  const [state, dispatch] = useReducer(itemReducer, getInitialState());
  const [randomItem, setRandomItem] = useState<ItemStructure>();

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      console.log("entrei useEffect");
      setRandomItem(getItemToStructure(getRandomItemId()));
      randomItem != undefined
        ? dispatch({ type: "change_item", item: randomItem })
        : getInitialState();
    }, 10000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [randomItem]);

  // const getBorderColorFromItemStatus = (status: Status): string => {
  //   switch (status) {
  //     case "valid":
  //       return "border-green-400";
  //     case "pending":
  //       return "border-zinc-700";
  //     case "invalid":
  //       return "border-red-600";
  //     case "partial":
  //       return "border-yellow-400";
  //     default:
  //       return "border-zinc-700";
  //   }
  // };

  return (
    <div>
      <div className="text-white">
        <p>
          {state.itemId} {previousItemId}
        </p>
        <span>
          {isDraggable ? "Sim" : "Não"} {currentDragItemId}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <div
          className="h-14 w-14 select-none border-2 border-zinc-700"
          draggable={"false"}
          style={{
            backgroundSize: "contain",
            backgroundImage: `url(${getImageByUrl(state.itemId)})`,
          }}
        />
        <div className="flex flex-col items-center">
          <span className="h-7 w-0.5 bg-zinc-700" />
          <span
            className={`h-0.5 bg-zinc-700 ${
              state.from && state.from?.length > 2 ? "w-[354px]" : "w-[181px]"
            }`}
          />
        </div>
      </div>
      <div className="flex justify-between gap-6">
        {state.from?.map((child) => (
          <div className="flex min-w-[152px] flex-col items-center">
            <span className="h-4 w-0.5 bg-zinc-700" />
            <button
              key={child.id}
              className={`h-12 w-12 border-2 bg-black ${
                isDraggable ? "border-blue-500" : "border-zinc-700"
              } ${
                child.newItemId != undefined &&
                child.newItemId.length > 0 &&
                child.status != "valid"
                  ? "cursor-grab"
                  : "cursor-default"
              }`}
              draggable={
                child.newItemId != undefined &&
                child.newItemId.length > 0 &&
                child.status != "valid"
              }
              onDragStart={() => {
                if (
                  child.newItemId != undefined &&
                  child.newItemId.length > 0
                ) {
                  setIsDraggable(true);
                  setCurrentDragItemId(child.newItemId);
                  setPreviousItemId(child.id);
                }
              }}
              onDragEnd={() => {
                setIsDraggable(false);
                setCurrentDragItemId("");
                setPreviousItemId("");
              }}
              onDrop={() => {
                if (previousItemId != undefined && previousItemId.length > 0) {
                  dispatch({
                    type: "switch_items",
                    itemId: child.id,
                    previousItemId: previousItemId,
                  });
                  return;
                }
                dispatch({
                  type: "add_item",
                  itemId: child.id,
                  currentDragItemId: currentDragItemId,
                });
              }}
              onDragLeave={(e) => {
                e.preventDefault();
              }}
              onDragOver={(e) => e.preventDefault()}
              onContextMenu={(e) => {
                e.preventDefault();
                if (
                  child.newItemId != undefined &&
                  child.newItemId.length > 0
                ) {
                  dispatch({
                    type: "delete_item",
                    itemId: child.id,
                  });
                }
              }}
              style={{
                backgroundSize: "contain",
                backgroundImage:
                  child.newItemId != undefined
                    ? `url(${getImageByUrl(child.newItemId)})`
                    : "",
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
                    <div className="flex flex-col items-center">
                      <span
                        className={`w-0.5 bg-zinc-700 ${
                          child.from && child.from.length > 1 ? "h-3.5" : "h-4"
                        }`}
                      />
                      <div
                        key={grandchild.id}
                        className={`h-10 w-10 border-2 bg-black ${isDraggable ? "border-blue-500" : "border-zinc-700"} ${
                          grandchild.newItemId != undefined &&
                          grandchild.newItemId.length > 0 &&
                          grandchild.status != "valid"
                            ? "cursor-grab"
                            : "cursor-default"
                        }`}
                        draggable={
                          grandchild.newItemId != undefined &&
                          grandchild.newItemId.length > 0 &&
                          grandchild.status != "valid"
                        }
                        onDragStart={() => {
                          if (
                            grandchild.newItemId != undefined &&
                            grandchild.newItemId.length > 0
                          ) {
                            setIsDraggable(true);
                            setCurrentDragItemId(grandchild.newItemId);
                            setPreviousItemId(grandchild.id);
                          }
                        }}
                        onDragEnd={() => {
                          setIsDraggable(false);
                          setCurrentDragItemId("");
                          setPreviousItemId("");
                        }}
                        onDrop={() => {
                          if (
                            previousItemId != undefined &&
                            previousItemId.length > 0
                          ) {
                            dispatch({
                              type: "switch_items",
                              itemId: grandchild.id,
                              previousItemId: previousItemId,
                            });
                            return;
                          }
                          dispatch({
                            type: "add_item",
                            itemId: grandchild.id,
                            currentDragItemId: currentDragItemId,
                          });
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          if (
                            grandchild.newItemId != undefined &&
                            grandchild.newItemId.length > 0
                          ) {
                            dispatch({
                              type: "delete_item",
                              itemId: grandchild.id,
                            });
                          }
                        }}
                        style={{
                          backgroundSize: "contain",
                          backgroundImage:
                            grandchild.newItemId != undefined
                              ? `url(${getImageByUrl(grandchild.newItemId!!)})`
                              : "",
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
