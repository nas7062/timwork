import { useEffect, useMemo, useState } from "react";
import { buildIndex } from "../data/normalize";
import { useViewerStore } from "../store/viewerStore";
import { getMetadata } from "../api/getMetadata";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Viewer from "../components/Viewer";
import RightPanel from "../components/RightPanel";

export default function ViewerPage() {
  const setIndex = useViewerStore((s) => s.setIndex);
  const index = useViewerStore((s) => s.index);

  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const meta = await getMetadata();
        const idx = buildIndex(meta);
        setIndex(idx);
      } catch (e) {
        setErr(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [setIndex]);

  const ready = useMemo(
    () => !loading && !err && !!index,
    [loading, err, index]
  );

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;
  if (err) return <div style={{ padding: 16 }}>Error: {err}</div>;
  if (!ready) return <div style={{ padding: 16 }}>No data</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "320px 1fr 360px",
        height: "100vh",
      }}
    >
      <Sidebar />
      <div style={{ display: "grid", gridTemplateRows: "56px 1fr" }}>
        <Topbar />
        <Viewer />
      </div>
      <RightPanel />
    </div>
  );
}
