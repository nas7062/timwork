import clsx from 'clsx';
import { useViewerStore, type Target } from '../../store/viewerStore';

interface Props {
  target: Target;
  setTarget: (v: Target) => void;
}
export default function Tabs({ target, setTarget }: Props) {
  const revision = useViewerStore((s) => s.revision);
  return (
    <div className="grid grid-cols-2 ">
      <button
        onClick={() => setTarget('BASE')}
        className={clsx(
          'p-2 rounded-md  transition-colors cursor-pointer',
          target === 'BASE' ? 'bg-gray-600 text-white' : 'bg-white',
        )}
      >
        Base 선택
      </button>
      <button
        onClick={() => {
          if (!revision?.revision.image) {
            alert('Base 선택 후 Overlay 선택이 가능합니다.');
            return;
          }

          setTarget('OVERLAY');
        }}
        className={clsx(
          'p-2 rounded-md transition-colors cursor-pointer',
          target === 'OVERLAY' ? 'bg-[#5d8bee] text-white' : 'bg-white',
        )}
      >
        Overlay 선택
      </button>
    </div>
  );
}
