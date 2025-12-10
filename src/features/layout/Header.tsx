export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-base sm:text-lg font-semibold">상표 검색 대시보드</h1>
        <span className="text-[11px] text-slate-500 sm:text-xs">
          KR / US 트레이드마크 조회
        </span>
      </div>
    </header>
  );
}
