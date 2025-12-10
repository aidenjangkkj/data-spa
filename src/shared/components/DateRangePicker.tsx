import type { ChangeEvent } from "react";
import { Input } from "./Input";

export interface DateRangeValue {
  from?: string;
  to?: string;
}

interface DateRangePickerProps {
  label: string;
  from?: string;
  to?: string;
  onChange: (value: DateRangeValue) => void;
}

export function DateRangePicker({
  label,
  from,
  to,
  onChange,
}: DateRangePickerProps) {
  const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || undefined;
    onChange({ from: value, to });
  };

  const handleToChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || undefined;
    onChange({ from, to: value });
  };

  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-600">
        {label}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
        <Input type="date" value={from ?? ""} onChange={handleFromChange} />
        <span className="text-center text-xs text-slate-400 sm:w-4">~</span>
        <Input type="date" value={to ?? ""} onChange={handleToChange} />
      </div>
    </div>
  );
}
