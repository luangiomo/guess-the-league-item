import { Item } from "../types/Item";
import { getImageByUrl } from "../utils/getImageUrl";

interface Props {
  item: Item;
  size?: Size;
}

type Size = "xs" | "sm" | "lg" | "xl";

function ItemPicture({ item, size }: Props) {
  let dimension = "w-10 h-10";
  switch (size) {
    case "xs":
      dimension = "w-6 h-6";
      break;
    case "sm":
      dimension = "w-8 h-8";
      break;
    case "lg":
      dimension = "w-10 h-10";
      break;
    case "xl":
      dimension = "w-12 h-12";
      break;
    default:
      dimension;
      break;
  }

  return (
    <div
      className={`w-10 cursor-grab overflow-hidden border border-black ${dimension}`}
    >
      <img src={getImageByUrl(item.image.full)} />
    </div>
  );
}

export default ItemPicture;
