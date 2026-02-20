import { useViewerStore } from "../store/viewerStore";

function imgUrl(file: string) {
  if (!file) return "";
  return `/data/drawings/${file}`;
}

export default function Viewer() {
  const revision = useViewerStore((s) => s.revision);
  const overlay = useViewerStore((s) => s.overlay);
  const overlayOpacity = useViewerStore((s) => s.overlayOpacity);

  const baseSrc = imgUrl(revision?.revision.image ?? "");
  const overlaySrc = imgUrl(overlay?.revision.image ?? "");

  return (
    <div
      style={{ position: "relative", overflow: "auto", background: "#111827" }}
    >
      {!baseSrc ? (
        <div style={{ color: "white", padding: 16 }}>
          좌측에서 도면을 선택하세요.
        </div>
      ) : (
        <div
          style={{
            position: "relative",
            width: "fit-content",
            margin: "16px auto",
          }}
        >
          <img
            src={baseSrc}
            alt="base"
            style={{ display: "block", maxWidth: "100%", height: "auto" }}
          />
          {overlaySrc && (
            <img
              src={overlaySrc}
              alt="overlay"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                opacity: overlayOpacity / 100,
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
