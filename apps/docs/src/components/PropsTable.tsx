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
    <div className="overflow-x-auto">
      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800">
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
              className="border-b border-slate-100 dark:border-slate-800/50"
            >
              <td className="px-3 py-2">
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium dark:bg-slate-800">
                  {prop.name}
                </code>
              </td>
              <td className="px-3 py-2 text-slate-600 dark:text-slate-400">
                <code className="text-xs">{prop.type}</code>
              </td>
              <td className="px-3 py-2 text-slate-500">
                {prop.default ? (
                  <code className="text-xs">{prop.default}</code>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-3 py-2 text-slate-600 dark:text-slate-400">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
