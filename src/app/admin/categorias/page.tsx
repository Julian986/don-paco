import { readCatalogRows } from "@/lib/catalog-store";
import { navRoot, type NavNode } from "@/lib/category-tree";

function buildCounts() {
  const rows = readCatalogRows();
  const m: Record<string, number> = {};
  for (const r of rows) {
    m[r.categoryId] = (m[r.categoryId] ?? 0) + 1;
  }
  return m;
}

function Tree({
  nodes,
  counts,
  depth,
}: {
  nodes: readonly NavNode[];
  counts: Record<string, number>;
  depth: number;
}) {
  return (
    <ul className={depth === 0 ? "space-y-2" : "ml-3 space-y-1 border-l border-[#e4e4e7] pl-3"}>
      {nodes.map((node, i) =>
        node.kind === "leaf" ? (
          <li key={node.id} className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
            <span className="font-medium text-[#18181b]">{node.label}</span>
            <span className="rounded-full bg-[#f4f4f5] px-2 py-0.5 text-xs font-bold text-[#52525b]">
              {counts[node.id] ?? 0} productos
            </span>
            <span className="w-full text-xs text-[#a1a1aa] md:w-auto">{node.id}</span>
          </li>
        ) : (
          <li key={`${node.label}-${i}`} className="pt-1">
            <p className="mb-1 text-xs font-black uppercase tracking-wide text-[#a1a1aa]">{node.label}</p>
            <Tree nodes={node.children} counts={counts} depth={depth + 1} />
          </li>
        ),
      )}
    </ul>
  );
}

export default function AdminCategoriasPage() {
  const counts = buildCounts();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[#18181b]">Categorías</h2>
        <p className="text-sm text-[#71717a]">
          Árbol de categorías de la tienda (solo lectura). Los productos se asignan desde cada ficha.
        </p>
      </div>
      <div className="max-w-2xl rounded-xl border border-[#e4e4e7] bg-white p-6 shadow-sm">
        <Tree nodes={navRoot} counts={counts} depth={0} />
      </div>
    </div>
  );
}
