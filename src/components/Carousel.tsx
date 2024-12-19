import { useEffect, useState } from "react";
import { getRandomLegendaryItemId } from "../utils/getItems";
import { getImageByItemId } from "../utils/getImageUrl";
import ItemRecipe from "./ItemRecipe";

function Carousel() {
  const getItemsToStartCarousel = (): string[] => {
    let itemIds = [];
    for (let i = 0; i < 3; i++) {
      itemIds.push(getRandomLegendaryItemId());
    }
    return itemIds;
  };
  const [imageIds, setImageIds] = useState<string[]>(getItemsToStartCarousel);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIds((prev) => {
        return [...prev, getRandomLegendaryItemId()].slice(1);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [imageIds]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative max-w-[224px] bg-gradient-to-r from-black from-10% via-white to-black to-90% p-px">
        <div className="absolute h-16 w-full bg-gradient-to-r from-black from-5% via-transparent to-black to-95%"></div>
        <div className="flex w-full gap-4 bg-black">
          {imageIds.map((itemId, index) => (
            <img src={getImageByItemId(itemId)} key={index} />
          ))}
        </div>
      </div>
      <div className="hidden sm:block">
        <ItemRecipe itemId={imageIds[1]} isCarousel />
      </div>
    </div>
  );
}

export default Carousel;
