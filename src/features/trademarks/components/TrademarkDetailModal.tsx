import type { Trademark } from "../model/trademark.common";
import { Badge } from "../../../shared/components/Badge";
import { Button } from "../../../shared/components/Button";

interface TrademarkDetailModalProps {
  open: boolean;
  item: Trademark | null;
  onClose: () => void;
}

export function TrademarkDetailModal({
  open,
  item,
  onClose,
}: TrademarkDetailModalProps) {
  if (!open || !item) return null;

  const displayName = item.nameKo ?? item.nameEn;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 py-6 sm:items-center sm:py-0">
      <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-xl sm:mx-0 mx-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-semibold">{displayName}</h2>
          <Badge>{item.registerStatus}</Badge>
        </div>

        <div className="space-y-2 text-xs text-slate-700">
          <p>
            <span className="font-medium">국가:</span> {item.country}
          </p>
          <p>
            <span className="font-medium">출원번호:</span>{" "}
            {item.applicationNumber}
          </p>
          <p>
            <span className="font-medium">출원일:</span> {item.applicationDate}
          </p>
          {item.publicationNumber && (
            <p>
              <span className="font-medium">공고번호:</span>{" "}
              {item.publicationNumber}
            </p>
          )}
          {item.publicationDate && (
            <p>
              <span className="font-medium">공고일:</span>{" "}
              {item.publicationDate}
            </p>
          )}
          {item.registrationNumbers.length > 0 && (
            <p>
              <span className="font-medium">등록번호:</span>{" "}
              {item.registrationNumbers.join(", ")}
            </p>
          )}
          {item.mainClassCodes.length > 0 && (
            <p>
              <span className="font-medium">상품류(주):</span>{" "}
              {item.mainClassCodes.join(", ")}
            </p>
          )}
          {item.subClassCodes.length > 0 && (
            <p>
              <span className="font-medium">상품류(세부):</span>{" "}
              {item.subClassCodes.join(", ")}
            </p>
          )}
          {item.viennaCodes.length > 0 && (
            <p>
              <span className="font-medium">비엔나 코드:</span>{" "}
              {item.viennaCodes.join(", ")}
            </p>
          )}
        </div>

        <div className="mt-5 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}
