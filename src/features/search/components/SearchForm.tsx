// src/features/search/components/SearchForm.tsx
import { useState } from "react";
import { useSearchStore } from "../state/searchStore";
import type { RegisterStatusFilter } from "../model/searchParams.types";
import { Input } from "../../../shared/components/Input";
import { Select } from "../../../shared/components/Select";
import { Button } from "../../../shared/components/Button";
import { DateRangePicker } from "../../../shared/components/DateRangePicker";
import clsx from "clsx";
export function SearchForm() {
  const { params, setParams, reset } = useSearchStore();
  const isKr = params.country === "KR";
  const isUs = params.country === "US";
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const handleStatusChange = (value: string) => {
    setParams({ registerStatus: value as RegisterStatusFilter });
  };

  return (
    <section className="mt-4 rounded-lg border bg-white p-3 md:p-4 shadow-sm">
      {/* 상단: 핵심 필터만 슬림하게 배치 */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="block text-xs mb-1 text-slate-600">상표명</label>
          <Input
            placeholder="상표명(한/영)"
            value={params.keyword}
            onChange={(e) => setParams({ keyword: e.target.value })}
          />
        </div>

        <div className="flex-1">
          <label className="block text-xs mb-1 text-slate-600">출원번호</label>
          <Input
            placeholder="정확 일치"
            value={params.applicationNumber}
            onChange={(e) => setParams({ applicationNumber: e.target.value })}
          />
        </div>

        <div className="w-full md:w-48">
          <label className="block text-xs mb-1 text-slate-600">상태</label>
          <Select
            value={params.registerStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="ALL">전체</option>

            {isKr && (
              <>
                <option value="KR_출원">출원</option>
                <option value="KR_등록">등록</option>
                <option value="KR_실효">실효</option>
                <option value="KR_거절">거절</option>
              </>
            )}

            {isUs && (
              <>
                <option value="US_LIVE">LIVE</option>
                <option value="US_DEAD">DEAD</option>
              </>
            )}
          </Select>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={() => setShowAdvanced((prev) => !prev)}
            className={clsx(
              "px-3 py-2 rounded-md text-xs md:text-sm border transition-colors",
              showAdvanced
                ? "border-amber-500 text-amber-600 bg-amber-50"
                : "border-slate-300 text-slate-500 bg-white hover:bg-slate-50"
            )}
          >
            상세 필터
          </button>

          <Button
            type="button"
            variant="secondary"
            className="text-xs md:text-sm"
            onClick={reset}
          >
            초기화
          </Button>
        </div>
      </div>

      {/* 하단: 상세 필터 (접었다/폈다) */}
      {showAdvanced && (
        <div className="mt-4 border-t pt-3 space-y-3">
          {/* 날짜 3종 한 줄 */}
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex-1">
              <DateRangePicker
                label="출원일"
                from={params.applicationDateFrom}
                to={params.applicationDateTo}
                onChange={({ from, to }) =>
                  setParams({
                    applicationDateFrom: from,
                    applicationDateTo: to,
                  })
                }
              />
            </div>

            <div className="flex-1">
              <DateRangePicker
                label="공고일"
                from={params.publicationDateFrom}
                to={params.publicationDateTo}
                onChange={({ from, to }) =>
                  setParams({
                    publicationDateFrom: from,
                    publicationDateTo: to,
                  })
                }
              />
            </div>

            {isKr && (
              <div className="flex-1">
                <DateRangePicker
                  label="등록공고일"
                  from={params.registrationPubDateFrom}
                  to={params.registrationPubDateTo}
                  onChange={({ from, to }) =>
                    setParams({
                      registrationPubDateFrom: from,
                      registrationPubDateTo: to,
                    })
                  }
                />
              </div>
            )}
          </div>

          {/* 나머지 상세 필터들: 3열 그리드 */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {isKr && (
              <div>
                <label className="block text-xs mb-1 text-slate-600">
                  공고번호
                </label>
                <Input
                  placeholder="부분 일치"
                  value={params.publicationNumber}
                  onChange={(e) =>
                    setParams({ publicationNumber: e.target.value })
                  }
                />
              </div>
            )}

            {isKr && (
              <div>
                <label className="block text-xs mb-1 text-slate-600">
                  등록공고번호
                </label>
                <Input
                  placeholder="부분 일치"
                  value={params.registrationPubNumber}
                  onChange={(e) =>
                    setParams({ registrationPubNumber: e.target.value })
                  }
                />
              </div>
            )}

            <div>
              <label className="block text-xs mb-1 text-slate-600">
                등록번호
              </label>
              <Input
                placeholder="부분 일치"
                value={params.registrationNumber}
                onChange={(e) =>
                  setParams({ registrationNumber: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs mb-1 text-slate-600">
                상품류(주)
              </label>
              <Input
                placeholder="예: 30"
                value={params.mainClass}
                onChange={(e) => setParams({ mainClass: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs mb-1 text-slate-600">
                상품류(세부)
              </label>
              <Input
                placeholder={isKr ? "예: G0301" : "예: 022"}
                value={params.subClass}
                onChange={(e) => setParams({ subClass: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
