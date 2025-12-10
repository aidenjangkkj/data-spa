// src/features/trademarks/components/TrademarkList.tsx
import { useEffect, useMemo, useState } from "react";
import { useSearchStore, type ViewMode } from "../../search/state/searchStore";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import { EmptyState } from "../../../shared/components/EmptyState";
import { ErrorState } from "../../../shared/components/ErrorState";
import { TrademarkListItem } from "./TrademarkListItem";
import { TrademarkDetailModal } from "./TrademarkDetailModal";
import type { Trademark } from "../model/trademark.common";
import { fetchKrTrademarks } from "../api/trademarks.kr.repo";
import { fetchUsTrademarks } from "../api/trademarks.us.repo";
import { useFavoritesStore } from "../state/favoritesStore";
import clsx from "clsx";

type FavoriteCountryFilter = "ALL" | "KR" | "US";

export function TrademarkList() {
  const { params, viewMode } = useSearchStore();
  const [dataKr, setDataKr] = useState<Trademark[]>([]);
  const [dataUs, setDataUs] = useState<Trademark[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Trademark | null>(null);

  const favoriteIds = useFavoritesStore((s) => s.favoriteIds);

  // 즐겨찾기 탭 전용 국가 필터 상태
  const [favoriteFilter, setFavoriteFilter] =
    useState<FavoriteCountryFilter>("ALL");

  const load = async (mode: ViewMode, country: "KR" | "US") => {
    if (mode === "LIST") {
      setIsLoading(true);
      setError(null);
      try {
        if (country === "KR") {
          const kr = await fetchKrTrademarks();
          setDataKr(kr);
        } else {
          const us = await fetchUsTrademarks();
          setDataUs(us);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    } else {
      // FAVORITES: KR, US 모두 로딩
      setIsLoading(true);
      setError(null);
      try {
        const [kr, us] = await Promise.all([
          fetchKrTrademarks(),
          fetchUsTrademarks(),
        ]);
        setDataKr(kr);
        setDataUs(us);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    void load(viewMode, params.country);
    // 즐겨찾기 탭 들어갈 때 기본은 전체 보기
    if (viewMode === "FAVORITES") {
      setFavoriteFilter("ALL");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.country, viewMode]);

  // viewMode + 국가에 따라 베이스 데이터 결정
  const baseData: Trademark[] = useMemo(() => {
    if (viewMode === "FAVORITES") {
      return [...dataKr, ...dataUs];
    }
    return params.country === "KR" ? dataKr : dataUs;
  }, [viewMode, params.country, dataKr, dataUs]);

  const filtered = useMemo(() => {
    const {
      keyword,
      applicationNumber,
      applicationDateFrom,
      applicationDateTo,
    } = params;

    const {
      publicationNumber,
      publicationDateFrom,
      publicationDateTo,
      registrationNumber,
      mainClass,
      subClass,
      registerStatus,
      registrationPubNumber,
      registrationPubDateFrom,
      registrationPubDateTo,
    } = params;

    let result = baseData;

    // 즐겨찾기 탭이면 먼저 즐겨찾기 필터 적용
    if (viewMode === "FAVORITES") {
      result = result.filter((item) => favoriteIds.has(item.id));

      // 즐겨찾기 탭 내부의 국가 토글 (전체 / KR / US)
      if (favoriteFilter !== "ALL") {
        result = result.filter((item) => item.country === favoriteFilter);
      }
    }

    result = result.filter((item) => {
      // 키워드 (상표명)
      if (keyword) {
        const k = keyword.toLowerCase();
        const nameKo = item.nameKo ?? "";
        const nameEn = item.nameEn ?? "";
        if (
          !nameKo.toLowerCase().includes(k) &&
          !nameEn.toLowerCase().includes(k)
        ) {
          return false;
        }
      }

      // 출원번호
      if (applicationNumber) {
        if (item.applicationNumber !== applicationNumber) return false;
      }

      // 출원일
      if (applicationDateFrom) {
        if (
          !item.applicationDate ||
          item.applicationDate < applicationDateFrom
        ) {
          return false;
        }
      }
      if (applicationDateTo) {
        if (!item.applicationDate || item.applicationDate > applicationDateTo) {
          return false;
        }
      }

      // KR 전용: 공고번호
      if (item.country === "KR" && publicationNumber) {
        if (!item.publicationNumber?.includes(publicationNumber)) {
          return false;
        }
      }

      // 공고일
      if (publicationDateFrom) {
        if (
          !item.publicationDate ||
          item.publicationDate < publicationDateFrom
        ) {
          return false;
        }
      }
      if (publicationDateTo) {
        if (!item.publicationDate || item.publicationDate > publicationDateTo) {
          return false;
        }
      }

      // KR 전용: 등록공고번호/일 (등록공고는 현재 모델에 없으면 건너뛰거나, 필요한 필드로 맞춰 써도 됨)
      if (item.country === "KR" && registrationPubNumber) {
        const hasRegPub = item.registrationNumbers.some((n) =>
          n.includes(registrationPubNumber)
        );
        if (!hasRegPub) return false;
      }
      if (item.country === "KR" && registrationPubDateFrom) {
        if (
          !item.publicationDate ||
          item.publicationDate < registrationPubDateFrom
        ) {
          return false;
        }
      }
      if (item.country === "KR" && registrationPubDateTo) {
        if (
          !item.publicationDate ||
          item.publicationDate > registrationPubDateTo
        ) {
          return false;
        }
      }

      // 등록번호
      if (registrationNumber) {
        const hasMatch = item.registrationNumbers.some((r) =>
          r.includes(registrationNumber)
        );
        if (!hasMatch) return false;
      }

      // 상품류(주)
      if (mainClass) {
        const hasMain = item.mainClassCodes.some((c) => c.includes(mainClass));
        if (!hasMain) return false;
      }

      // 상품류(세부)
      if (subClass) {
        const hasSub = item.subClassCodes.some((c) => c.includes(subClass));
        if (!hasSub) return false;
      }

      // 상태 필터
      if (registerStatus !== "ALL") {
        const s = item.registerStatus;

        if (item.country === "KR") {
          switch (registerStatus) {
            case "KR_출원":
              if (!s.includes("출원")) return false;
              break;
            case "KR_등록":
              if (!s.includes("등록")) return false;
              break;
            case "KR_실효":
              if (!s.includes("실효")) return false;
              break;
            case "KR_거절":
              if (!s.includes("거절")) return false;
              break;
            case "US_LIVE":
            case "US_DEAD":
              return false;
          }
        } else if (item.country === "US") {
          switch (registerStatus) {
            case "US_LIVE":
              if (s !== "LIVE") return false;
              break;
            case "US_DEAD":
              if (s !== "DEAD") return false;
              break;
            case "KR_출원":
            case "KR_등록":
            case "KR_실효":
            case "KR_거절":
              return false;
          }
        }
      }

      return true;
    });

    return result;
  }, [baseData, params, viewMode, favoriteIds, favoriteFilter]);

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorState
        message={error}
        onRetry={() => load(viewMode, params.country)}
      />
    );

  const totalCount = filtered.length;

  return (
    <section className="mt-4 space-y-3">
      {/* 상단 정보 + 즐겨찾기 탭 전용 토글 */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-slate-500">
          총 <span className="font-semibold text-slate-700">{totalCount}</span>
          건{viewMode === "FAVORITES" && " (즐겨찾기)"}
        </p>

        {viewMode === "FAVORITES" && (
          <div className="inline-flex rounded-md border bg-white p-0.5 text-xs">
            <button
              type="button"
              className={clsx(
                "px-3 py-1 rounded-md transition-colors",
                favoriteFilter === "ALL"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              )}
              onClick={() => setFavoriteFilter("ALL")}
            >
              전체
            </button>
            <button
              type="button"
              className={clsx(
                "px-3 py-1 rounded-md transition-colors",
                favoriteFilter === "KR"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              )}
              onClick={() => setFavoriteFilter("KR")}
            >
              한국
            </button>
            <button
              type="button"
              className={clsx(
                "px-3 py-1 rounded-md transition-colors",
                favoriteFilter === "US"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              )}
              onClick={() => setFavoriteFilter("US")}
            >
              미국
            </button>
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          text={
            viewMode === "FAVORITES"
              ? "선택된 조건에 해당하는 즐겨찾기 상표가 없습니다."
              : "조건에 맞는 상표가 없습니다."
          }
        />
      ) : (
        <ul className="space-y-2">
          {filtered.map((item) => (
            <TrademarkListItem
              key={item.id}
              item={item}
              onClick={() => setSelected(item)}
            />
          ))}
        </ul>
      )}

      <TrademarkDetailModal
        open={!!selected}
        item={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
