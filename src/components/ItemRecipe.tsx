import { useContext, useState } from "react";
import { ItemContext } from "../contexts/ItemContext";
import { ItemStructure } from "../types/ItemStructure";
import { Status } from "../types/Status";
import { getImageByUrl } from "../utils/getImageUrl";

function ItemRecipe() {
  const { currentDragItemId, setCurrentDragItemId, item, setItem, isDragable } =
    useContext(ItemContext);

  const [sortedItemId, setSortedItemId] = useState<string>("");

  const handleChangeItem = (action: "edit" | "remove", itemId: string) => {
    const childId = ["1", "2", "3"];
    let updatedItem = {} as ItemStructure;

    if (childId.includes(itemId)) {
      console.log("entrei id child");
      updatedItem = {
        ...item,
        from: item.from?.map((itemFrom) =>
          itemFrom.id === itemId
            ? {
                ...itemFrom,
                newItemId: action == "edit" ? currentDragItemId : "",
              }
            : itemFrom,
        ),
      };
    } else {
      updatedItem = {
        ...item,
        from: item.from?.map((child) =>
          child.id === itemId[0]
            ? {
                ...child,
                from: child.from?.map((grandchild) =>
                  grandchild.id === itemId
                    ? {
                        ...grandchild,
                        newItemId: action == "edit" ? currentDragItemId : "",
                      }
                    : grandchild,
                ),
              }
            : child,
        ),
      };
    }

    localStorage.setItem("sortedItem", JSON.stringify(updatedItem));
    setItem(updatedItem);
  };

  const getBorderColorFromItemStatus = (status: Status): string => {
    switch (status) {
      case "valid":
        return "border-green-400";
      case "pending":
        return "border-zinc-700";
      case "invalid":
        return "border-red-600";
      case "partial":
        return "border-yellow-400";
      default:
        return "border-zinc-700";
    }
  };

  // const getBorderColorFromDraggableState = (
  //   item: string | undefined,
  // ): string => {
  //   if (item != undefined && item.length > 0) {
  //     if (isDragable) {
  //       return `border-red-500 ${getCursorFromState(true)}`;
  //     }
  //     return getCursorFromState(true);
  //   } else {
  //     if (isDragable) {
  //       return `border-blue-500 ${getCursorFromState(false)}`;
  //     }
  //     return getCursorFromState(false);
  //   }

  //   function getCursorFromState(state: boolean) {
  //     return state ? "cursor-grab" : "cursor-default";
  //   }
  // };

  return (
    <div>
      <div className="text-white">
        <p>{item.itemId}</p>
        <span>
          {isDragable ? "Sim" : "Não"} {currentDragItemId}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <div
          className="h-14 w-14 select-none border-2 border-zinc-700"
          draggable={"false"}
          style={{
            backgroundSize: "contain",
            backgroundImage: `url(${getImageByUrl(item.itemId)})`,
          }}
        />
        <div className="flex flex-col items-center">
          <span className="h-7 w-0.5 bg-zinc-700" />
          <span
            className={`h-0.5 bg-zinc-700 ${
              item.from && item.from?.length > 2 ? "w-[354px]" : "w-[178px]"
            }`}
          />
        </div>
      </div>
      <div className="flex gap-6">
        {item.from?.map((child) => (
          <div className="flex min-w-[152px] flex-col items-center">
            <span className="h-4 w-0.5 bg-zinc-700" />
            <div
              key={child.id + child.itemId}
              className={`h-12 w-12 border-2 bg-black ${getBorderColorFromItemStatus(child.status)} ${
                isDragable && "border-blue-500"
                // child.newItemId != undefined && child.newItemId.length > 0
                //   ? "cursor-grab"
                //   : "cursor-default"
              } `}
              draggable={
                child.newItemId != undefined && child.newItemId.length > 0
              }
              onDragStart={() =>
                child.newItemId != undefined &&
                child.newItemId.length > 0 &&
                setCurrentDragItemId(child.newItemId)
              }
              onDrop={() => {
                handleChangeItem("edit", child.id);
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
                  handleChangeItem("remove", child.id);
                }
              }}
              style={{
                backgroundSize: "contain",
                backgroundImage:
                  child.newItemId != undefined
                    ? `url(${getImageByUrl(child.newItemId!!)})`
                    : "",
              }}
            ></div>
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
                        key={grandchild.id + grandchild.itemId}
                        className={`h-10 w-10 border-2 border-zinc-700 bg-black ${isDragable && "border-blue-500"}`}
                        draggable={
                          grandchild.newItemId != undefined &&
                          grandchild.newItemId.length > 0
                        }
                        onDragStart={() =>
                          grandchild.newItemId != undefined &&
                          grandchild.newItemId.length > 0 &&
                          setCurrentDragItemId(grandchild.newItemId)
                        }
                        onDrop={() => {
                          handleChangeItem("edit", grandchild.id);
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
                            handleChangeItem("remove", grandchild.id);
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
