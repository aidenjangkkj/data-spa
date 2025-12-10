import type { PropsWithChildren } from "react";
import clsx from "clsx";

interface TabsProps {
  value: string;
  onChange: (value: string) => void;
}

interface TabItemProps {
  value: string;
  label: string;
}

export function Tabs({ children }: PropsWithChildren<TabsProps>) {
  return (
    <div className="inline-flex rounded-md border bg-white p-1 text-sm">
      {children && Array.isArray(children) && children.map((child) => child)}
    </div>
  );
}

export function TabItem({
  value,
  label,
  activeValue,
  onChange,
}: TabItemProps & {
  activeValue: string;
  onChange: (value: string) => void;
}) {
  const isActive = activeValue === value;
  return (
    <button
      type="button"
      className={clsx(
        "px-3 py-1.5 rounded-md",
        isActive
          ? "bg-blue-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100"
      )}
      onClick={() => onChange(value)}
    >
      {label}
    </button>
  );
}
