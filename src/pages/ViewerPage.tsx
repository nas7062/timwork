import { useEffect, useMemo, useState } from 'react';
import { buildIndex } from '../data/normalize';
import { useViewerStore } from '../store/viewerStore';
import { getMetadata } from '../api/getMetadata';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar';
import Viewer from '../components/Viewer';
import RightPanel from '../components/RightPanel/RightPanel';

export default function ViewerPage() {
  const setIndex = useViewerStore((s) => s.setIndex);
  const index = useViewerStore((s) => s.index);

  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // metadata.json 호출
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
    [loading, err, index],
  );

  if (loading)
    return <div className="flex justify-center items-center">Loading...</div>;
  if (err)
    return <div className="flex justify-center items-center">Error: {err}</div>;
  if (!ready)
    return <div className="flex justify-center items-center">No data</div>;
  /*#e5e6e7 */
  return (
    <div className="grid h-screen grid-cols-[280px_1fr_300px] bg-white">
      <Sidebar />
      <div className="grid grid-rows-[50px_1fr] ">
        <Topbar />
        <Viewer />
      </div>
      <RightPanel />
    </div>
  );
}
