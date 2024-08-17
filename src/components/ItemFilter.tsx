import { useState } from "react";
import Icon from "../assets/icons/Icon";

const itemTypes = [
  "all",
  "fighter",
  "marksman",
  "assasin",
  "mage",
  "tank",
  "support",
];

function ItemFilter() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="grid grid-cols-7 w-full mt-0.5">
      {itemTypes.map((item) => (
        <div
          className="max-h-9 border border-zinc-700 text-red-500"
          onClick={() => setIsActive(true)}
        >
          <Icon size={48} />
        </div>
      ))}
    </div>
  );
}

export default ItemFilter;
