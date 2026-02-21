import { useEffect, useMemo, useState } from "react";
import { useViewerStore } from "../store/viewerStore";

export default function Viewer() {
  const revision = useViewerStore((s) => s.revision);
  const overlay = useViewerStore((s) => s.oRevision);
  const overlayOpacity = useViewerStore((s) => s.overlayOpacity);

  const baseSrc = revision ? `/data/drawings/${revision.revision.image}` : "";
  const overlaySrc = overlay ? `/data/drawings/${overlay.revision.image}` : "";

  const [baseSize, setBaseSize] = useState<{ w: number; h: number } | null>(
    null
  );

  // base 이미지 원본 크기 측정
  useEffect(() => {
    if (!revision) return;
    const img = new Image();
    img.src = baseSrc;
    img.onload = () => {
      setBaseSize({ w: img.naturalWidth, h: img.naturalHeight });
    };
  }, [revision?.revision.image, baseSrc, revision]);

  // relativeTo 검증 (겹치기 허용 여부)
  const canOverlay = useMemo(() => {
    if (!revision || !overlay) return false;
    const rel = overlay.revision.imageTransform?.relativeTo;
    const baseImage = revision.baseImage || revision.revision.image;
    // rel이 존재하면 반드시 baseImage와 같아야 함
    return rel ? rel === baseImage : true;
  }, [revision, overlay]);

  const overlayStyle = useMemo(() => {
    if (!overlay || !canOverlay) return undefined;

    const t = overlay.revision.imageTransform;
    if (!t) {
      return {
        position: "absolute" as const,
        top: 0,
        left: 0,
        opacity: overlayOpacity / 100,
        pointerEvents: "none" as const,
      };
    }

    return {
      position: "absolute" as const,
      top: 0,
      left: 0,
      opacity: overlayOpacity / 100,
      pointerEvents: "none" as const,
      transformOrigin: "0 0",
      zIndex: 50,
    };
  }, [overlay, overlayOpacity, canOverlay]);

  if (!revision)
    return (
      <div className="flex justify-center items-center text-gray-700 text-lg ">
        공간, 공종, 리비전, 영역을 선택해 도면을 선택해주세요.
      </div>
    );
  if (!baseSize)
    return (
      <div className="flex justify-center items-center text-gray-700 text-lg ">
        이미지 로딩 중…
      </div>
    );

  return (
    <div className="w-full h-screen overflow-y-hidden ">
      {/* stage: 원본 픽셀 좌표계 */}
      <div className="relative w-full h-screen  p-4 bg-gray-200 flex justify-center items-center">
        <div className="rounded-2xl overflow-auto relative w-full h-full shadow-2xl ">
          {/* base는 원본 크기 그대로 */}
          <img
            src={baseSrc}
            alt="base"
            className="rounded-2xl shadow-2xl absolute top-0 left-0 w-full h-full  "
          />

          {/* overlay도 원본 크기 그대로 + 변환 */}
          {overlay && canOverlay && (
            <img
              src={overlaySrc}
              alt="overlay"
              className="absolute z-50 top-0 left-0 w-full h-full "
              style={{
                ...overlayStyle,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
