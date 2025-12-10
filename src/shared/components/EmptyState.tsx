interface EmptyStateProps {
  text?: string;
  icon?: string;
}

export function EmptyState({
  text = "검색 결과가 없습니다.",
  icon = "🔍",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500">
      <div className="text-4xl mb-3">{icon}</div>
      <p className="text-sm leading-relaxed">{text}</p>
    </div>
  );
}
