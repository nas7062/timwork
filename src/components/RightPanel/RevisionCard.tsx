import clsx from 'clsx';
import type { Target } from '../../store/viewerStore';
import type { RevRef } from '../../types/types';

interface Props {
  target: Target;
  r: RevRef;
  selected: boolean;
  sameAsBase: boolean | null;
  setRevision: (v: RevRef | null) => void;
  setORevision: (v: RevRef | null) => void;
}

export default function RevisionCard({
  target,
  r,
  selected,
  sameAsBase,
  setRevision,
  setORevision,
}: Props) {
  return (
    <div
      key={`${target}__${r.space}__${r.discipline}__${
        r.region ?? ''
      }__${r.revision.version}`}
      className="border border-gray-200 p-2 bg-white rounded-lg flex flex-col gap-1 shadow"
    >
      <div className="font-semibold flex justify-between">
        <p>개정 버전 : {r.revision.version}</p>
        {selected ? (
          <span
            className={clsx(
              'text-xs font-semibold',
              target === 'BASE' ? 'text-gray-700' : 'text-blue-600',
            )}
          >
            {target}
          </span>
        ) : null}
      </div>

      <div className="text-xs text-gray-500">개정 날짜 : {r.revision.date}</div>
      <div className="text-xs text-gray-700">
        개정 설명 : {r.revision.description}
      </div>

      <button
        disabled={!!sameAsBase}
        className={clsx(
          'mt-2 w-full rounded-md px-2 py-1.5 transition-colors cursor-pointer',
          sameAsBase
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : selected
              ? 'bg-gray-700 text-white '
              : target === 'BASE'
                ? 'bg-gray-500 text-white hover:bg-gray-600'
                : 'bg-[#5d8bee] text-white hover:bg-blue-500',
        )}
        onClick={() => {
          if (sameAsBase) return;

          if (target === 'BASE') {
            if (selected) return;
            setRevision(r);
          } else {
            setORevision(selected ? null : r);
          }
        }}
      >
        {target === 'BASE'
          ? selected
            ? '현재 Base'
            : 'Base 선택'
          : selected
            ? 'Overlay 해제'
            : 'Overlay 선택'}
      </button>
    </div>
  );
}
