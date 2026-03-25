"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SortOption = {
  value: string;
  label: string;
};

const sortOptions: SortOption[] = [
  { value: "destacado", label: "Destacado" },
  { value: "precio-menor", label: "Precio: menor a mayor" },
  { value: "precio-mayor", label: "Precio: mayor a menor" },
  { value: "nuevos", label: "Mas nuevo al mas viejo" },
];

export default function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(sortOptions[0].value);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = useMemo(
    () => sortOptions.find((option) => option.value === selected)?.label ?? sortOptions[0].label,
    [selected],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleClose = () => setIsOpen(false);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleClose, true);
    window.addEventListener("resize", handleClose);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleClose, true);
      window.removeEventListener("resize", handleClose);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative w-full max-w-[300px]">
      <p className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#9a9a9a]">
        Ordenar por
      </p>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl border border-[#d8d8d8] bg-white px-4 py-2.5 text-sm font-medium text-[#555] shadow-[0_1px_2px_rgba(0,0,0,0.05)] outline-none transition-colors hover:border-[#c8c8c8] focus:border-[#029f9c]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedLabel}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className={`h-4 w-4 text-[#029f9c] transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-[calc(100%+6px)] z-10 w-full overflow-hidden rounded-xl border border-[#d8d8d8] bg-white shadow-lg">
          <ul role="listbox" className="py-1">
            {sortOptions.map((option) => {
              const isActive = option.value === selected;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(option.value);
                      setIsOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-[#029f9c]/10 font-semibold text-[#029f9c]"
                        : "text-[#555] hover:bg-[#f5f5f5]"
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
