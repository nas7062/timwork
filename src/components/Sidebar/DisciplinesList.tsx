import clsx from "clsx";
import type { DisciplineKey } from "../../types/types";
import type { Target } from "../../store/viewerStore";

interface Props {
  disciplines: string[];
  pickDiscipline: (v: DisciplineKey) => void;
  target: Target;
  activeDiscipline: string | null;
}

export default function DisciplinesLIst({
  disciplines,
  pickDiscipline,
  target,
  activeDiscipline,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      {disciplines.map((d) => (
        <button
          key={d}
          onClick={() => pickDiscipline(d)}
          className={clsx(
            "p-2 border border-gray-300 transition-colors duration-300 rounded-md cursor-pointer ",
            target === "BASE"
              ? "hover:border-gray-700"
              : " hover:border-blue-500",
            d === activeDiscipline &&
              target === "BASE" &&
              "bg-gray-600 text-white",
            d === activeDiscipline &&
              target === "OVERLAY" &&
              "bg-[#5d8bee] text-white",
            !(d === activeDiscipline) && "bg-white"
          )}
        >
          {d}
        </button>
      ))}
    </div>
  );
}
