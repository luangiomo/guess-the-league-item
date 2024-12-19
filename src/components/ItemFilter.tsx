import { useState } from "react";
import {
  All,
  Assassin,
  Fighter,
  Mage,
  Marksman,
  Support,
  Tank,
} from "../assets/icons";

function ItemFilter() {
  const itemTypes: JSX.Element[] = [
    <All />,
    <Fighter />,
    <Marksman />,
    <Assassin />,
    <Mage />,
    <Tank />,
    <Support />,
  ];

  const [selected, setSelected] = useState(0);

  return (
    <>
      <div className="mb-2">
        <input
          className="mb-2 h-8 w-full border border-zinc-600 bg-black px-2 text-white outline-none placeholder:text-zinc-600 focus:border-white"
          type="text"
          placeholder="Search Item"
          name="search_item"
        />
      </div>
      <div className="flex">
        {itemTypes.map((item, index) => (
          <div
            className={`flex h-10 w-full cursor-pointer items-center justify-center border hover:fill-white ${selected === index ? "border-white bg-white/10 fill-white" : "border-zinc-600 fill-zinc-600"}`}
            onClick={() => setSelected(index)}
            key={index}
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
}

export default ItemFilter;
