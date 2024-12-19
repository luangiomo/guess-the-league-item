import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: "";
  onClick?: () => void;
  full?: boolean;
  type?: "primary" | "cancel" | "custom";
};

function MyButton({ children, onClick, className, type, full }: ButtonProps) {
  const checkType = (type: "primary" | "cancel" | "custom" | undefined) => {
    switch (type) {
      case "primary":
        return "bg-blue-700 hover:bg-blue-800 text-white";
      case "cancel":
        return "bg-black hover:bg-zinc-900 text-white border border-zinc-600";
      case "custom":
        return `${className ? className : ""}`;
      default:
        return "bg-blue-700 hover:bg-blue-800 text-white";
    }
  };
  return (
    <button
      className={`hover: h-12 px-12 ${checkType(type)} ${full ? "w-full" : "w-fit"}`}
      onClick={onClick}
    >
      <p className="font-extrabold uppercase tracking-tight">{children}</p>
    </button>
  );
}

export default MyButton;
