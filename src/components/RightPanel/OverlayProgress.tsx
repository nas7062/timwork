interface Props {
  overlayOpacity: number;
  setOverlayOpacity: (v: number) => void;
}

export default function OverlayProgress({
  overlayOpacity,
  setOverlayOpacity,
}: Props) {
  return (
    <>
      <div className="font-semibold mt-2">Overlay 투명도</div>
      <div className="flex justify-between text-xs text-gray-500">
        <p>투명</p>
        <p>불투명</p>
      </div>
      <input
        type="range"
        className="w-full accent-[#5d8bee] "
        min={0}
        max={100}
        value={overlayOpacity}
        onChange={(e) => setOverlayOpacity(Number(e.target.value))}
      />
    </>
  );
}
