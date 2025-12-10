interface EmptyStateProps {
  text: string;
}

export function EmptyState({ text }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-sm text-slate-500">
      <p>{text}</p>
    </div>
  );
}
