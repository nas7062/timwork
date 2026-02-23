import clsx from "clsx";
import type { Target } from "../../store/viewerStore";

interface Props {
  target: Target;
  setTarget: (v: Target) => void;
}
export default function Tabs({ target, setTarget }: Props) {
  return (
    <div className="grid grid-cols-2 ">
      <button
        onClick={() => setTarget("BASE")}
        className={clsx(
          "p-2 rounded-md  transition-colors cursor-pointer",
          target === "BASE" ? "bg-gray-600 text-white" : "bg-white"
        )}
      >
        Base 선택
      </button>
      <button
        onClick={() => setTarget("OVERLAY")}
        className={clsx(
          "p-2 rounded-md transition-colors cursor-pointer",
          target === "OVERLAY" ? "bg-[#5d8bee] text-white" : "bg-white"
        )}
      >
        Overlay 선택
      </button>
    </div>
  );
}
