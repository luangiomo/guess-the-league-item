import { getImageUrl } from "../utils/getImageUrl";
import { Item } from "../utils/getItems";

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
      className={`overflow-hidden border border-black cursor-grab w-10 ${dimension}`}
    >
      <img src={getImageUrl(item.image.full)} />
    </div>
  );
}

export default ItemPicture;