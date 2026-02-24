import clsx from 'clsx';
import type { Target } from '../../store/viewerStore';
import type { RegionKey } from '../../types/types';

interface Props {
  regions: string[];
  pickRegion: (v: RegionKey) => void;
  target: Target;
  activeRegion: string | null;
}

export default function RegionList({
  regions,
  pickRegion,
  target,
  activeRegion,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      {regions.map((r) => (
        <button
          key={r}
          onClick={() => pickRegion(r)}
          className={clsx(
            'p-2 border border-gray-300 transition-colors duration-300 rounded-md cursor-pointer ',
            target === 'BASE'
              ? 'hover:border-gray-700'
              : ' hover:border-blue-500',
            r === activeRegion && target === 'BASE' && 'bg-gray-600 text-white',
            r === activeRegion &&
              target === 'OVERLAY' &&
              'bg-[#5d8bee] text-white',
            !(r === activeRegion) && 'bg-white',
          )}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
