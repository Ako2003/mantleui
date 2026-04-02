interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  props: PropDef[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <>
      {/* Desktop: table */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-zinc-800">
              <th className="px-3 py-2 text-left font-semibold">Prop</th>
              <th className="px-3 py-2 text-left font-semibold">Type</th>
              <th className="px-3 py-2 text-left font-semibold">Default</th>
              <th className="px-3 py-2 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop) => (
              <tr
                key={prop.name}
                className="border-b border-slate-100 dark:border-zinc-800/50"
              >
                <td className="px-3 py-2">
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium dark:bg-zinc-800">
                    {prop.name}
                  </code>
                </td>
                <td className="px-3 py-2 text-slate-600 dark:text-zinc-400">
                  <code className="text-xs">{prop.type}</code>
                </td>
                <td className="px-3 py-2 text-slate-500 dark:text-zinc-400">
                  {prop.default ? (
                    <code className="text-xs">{prop.default}</code>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-3 py-2 text-slate-600 dark:text-zinc-400">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards */}
      <div className="mt-4 flex flex-col gap-3 sm:hidden">
        {props.map((prop) => (
          <div
            key={prop.name}
            className="rounded-lg border border-slate-200 p-3 dark:border-zinc-800"
          >
            <div className="mb-2 flex items-center justify-between">
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-semibold dark:bg-zinc-800">
                {prop.name}
              </code>
              {prop.default && (
                <code className="text-xs text-slate-500 dark:text-zinc-400">
                  {prop.default}
                </code>
              )}
            </div>
            <div className="mb-1.5">
              <code className="break-all text-xs text-slate-600 dark:text-zinc-400">
                {prop.type}
              </code>
            </div>
            <p className="m-0 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              {prop.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
