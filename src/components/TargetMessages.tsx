import clsx from "clsx";
import type { Target } from "../store/viewerStore";

export default function TargetMessages({ target }: { target: Target }) {
  return (
    <div className="font-semibold flex items-center justify-between">
      <span>{target === "BASE" ? "Base 리비전" : "Overlay 리비전"}</span>
      <span
        className={clsx(
          "text-xs font-semibold px-2 py-0.5 rounded",
          target === "BASE"
            ? "bg-gray-100 text-gray-700"
            : " bg-gray-100 text-blue-600"
        )}
      >
        {target}
      </span>
    </div>
  );
}
