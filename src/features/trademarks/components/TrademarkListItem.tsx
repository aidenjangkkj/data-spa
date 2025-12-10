import type { Trademark } from "../model/trademark.common";
import { Badge } from "../../../shared/components/Badge";
import { Button } from "../../../shared/components/Button";
import { useFavoritesStore } from "../state/favoritesStore";
import clsx from "clsx";

interface TrademarkListItemProps {
  item: Trademark;
  onClick: () => void;
}

function statusToBadgeVariant(status: string) {
  if (status.includes("등록") || status === "LIVE") return "success";
  if (status.includes("거절") || status === "DEAD") return "danger";
  if (status.includes("실효")) return "warning";
  return "default";
}

export function TrademarkListItem({ item, onClick }: TrademarkListItemProps) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(item.id));

  const displayName = item.nameKo ?? item.nameEn;

  return (
    <li className="flex items-start justify-between gap-4 rounded-lg border bg-white p-4 shadow-sm">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">{displayName}</h3>
          <Badge variant={statusToBadgeVariant(item.registerStatus)}>
            {item.registerStatus}
          </Badge>
          <span className="text-[10px] uppercase text-slate-400">
            {item.country}
          </span>
        </div>
        <p className="text-xs text-slate-500">
          출원번호 {item.applicationNumber} · 출원일 {item.applicationDate}
        </p>
        {item.mainClassCodes.length > 0 && (
          <p className="text-[11px] text-slate-500">
            상품류: {item.mainClassCodes.join(", ")}
          </p>
        )}
      </div>

      <div className="flex flex-col items-end gap-2">
        {/* 여기만 변경 */}
        <button
          type="button"
          aria-label="즐겨찾기"
          onClick={() => toggleFavorite(item.id)}
          className={clsx(
            "text-lg transition-colors",
            isFavorite
              ? "text-amber-500"
              : "text-slate-300 hover:text-amber-400"
          )}
        >
          {isFavorite ? "★" : "☆"}
        </button>

        <Button type="button" variant="secondary" onClick={onClick}>
          상세보기
        </Button>
      </div>
    </li>
  );
}
