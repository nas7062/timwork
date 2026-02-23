import clsx from "clsx";
import type { Target } from "../../store/viewerStore";
import type { SpaceKey } from "../../types/types";

interface Props {
  spaces: string[];
  pickSpace: (v: SpaceKey) => void;
  target: Target;
  activeSpace: string | null;
}

export default function SpaceList({
  spaces,
  pickSpace,
  target,
  activeSpace,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      {spaces.map((s) => (
        <button
          key={s}
          onClick={() => pickSpace(s)}
          className={clsx(
            "p-2 border border-gray-300 transition-colors duration-300 rounded-md cursor-pointer",
            target === "BASE"
              ? "hover:border-gray-700"
              : " hover:border-blue-500",
            s === activeSpace && target === "BASE" && "bg-gray-600 text-white",
            s === activeSpace &&
              target === "OVERLAY" &&
              "bg-[#5d8bee] text-white",
            !(s === activeSpace) && "bg-white"
          )}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
