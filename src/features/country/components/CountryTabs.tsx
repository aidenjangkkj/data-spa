import { useSearchStore } from "../../search/state/searchStore";
import type { CountryCode } from "../model/country.types";
import clsx from "clsx";

export function CountryTabs() {
  const { params, viewMode, setParams, setViewMode } = useSearchStore();

  const selectCountry = (country: CountryCode) => {
    setParams({ country });
    setViewMode("LIST");
  };

  const selectFavorites = () => {
    setViewMode("FAVORITES");
  };

  const isKrActive = viewMode === "LIST" && params.country === "KR";
  const isUsActive = viewMode === "LIST" && params.country === "US";
  const isFavActive = viewMode === "FAVORITES";

  const tabBase = "px-3 py-1.5 text-xs md:text-sm rounded-md transition-colors";

  return (
    <div className="flex items-center justify-between">
      {/* 탭 그룹 */}
      <div className="inline-flex gap-1 rounded-md border bg-white p-1 text-sm">
        <button
          type="button"
          className={clsx(
            tabBase,
            isKrActive
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          )}
          onClick={() => selectCountry("KR")}
        >
          한국 상표
        </button>
        <button
          type="button"
          className={clsx(
            tabBase,
            isUsActive
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          )}
          onClick={() => selectCountry("US")}
        >
          미국 상표
        </button>
        <button
          type="button"
          className={clsx(
            tabBase,
            isFavActive
              ? "bg-amber-500 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          )}
          onClick={selectFavorites}
        >
          즐겨찾기
        </button>
      </div>

      <p className="hidden text-xs text-slate-500 md:block">
        즐겨찾기는 현재 선택된 국가의 상표 중에서만 필터링됩니다.
      </p>
    </div>
  );
}
