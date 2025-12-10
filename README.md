# 📘 README.md

**다국가 상표 검색 SPA — React 기반 프로젝트**

본 프로젝트는 **한국/미국 상표 데이터를 활용한 검색 SPA**로, 국가별 스키마가 서로 다른 데이터를 통합하여 검색·필터링·상세보기·즐겨찾기 기능을 제공하는 실사용 수준의 인터페이스 구현을 목표로 합니다.  
데이터는 별도로 제공된 JSON 파일을 API처럼 fetch하여 사용합니다.

---

# 📌 주요 기능

## 1. 다국가 데이터 검색 (한국 / 미국)

한국(KR)과 미국(US) 데이터는 구조적으로 차이가 존재합니다.  
이를 위해 transform 계층을 적용하여 **공통 모델(Trademark)** 로 통일 후 UI에 적용합니다.

### 국가별 차이 요약

| 항목          | 한국(KR)                                | 미국(US)          |
| ------------- | --------------------------------------- | ----------------- |
| 상표명        | productName(한글), productNameEng(영문) | productName(영문) |
| 공고번호      | 있음                                    | 없음              |
| 등록공고 정보 | 있음                                    | 없음              |
| 상품류 코드   | asignProductSubCodeList                 | usClassCodeList   |

---

## 2. 다양한 필터를 이용한 상표 검색

### 공통 필터

- 상표명 키워드 검색(한/영 통합)
- 출원번호
- 출원일 범위(DateRangePicker)
- 공고일 범위
- 등록번호
- 상품류(주)
- 상품류(세부)
- 상태 필터(KR/US 전용 분기)

### 한국(KR) 전용 필터

- 공고번호
- 등록공고번호
- 등록공고일 범위

### 미국(US) 전용 필터

- LIVE / DEAD 상태 필터
- 한국 전용 필드는 미노출

### UI 구조

- 기본 필터 + **상세 필터(토글 버튼)** 구성
- 상세 필터는 반응형 컬럼 구조(모바일 1열 → 데스크탑 3열)

---

## 3. 상세 정보 보기

- 리스트 항목 클릭 시 모달 상세 페이지 표시
- 국가별로 다른 필드 자동 처리
- 등록번호/등록일 배열, 상품코드, 비엔나 코드 등 표시

---

## 4. 즐겨찾기 기능

- 항목 우측의 ★ 버튼으로 즐겨찾기 토글
- 즐겨찾기 탭에서는 **KR/US 데이터를 모두 합쳐서** 표시
- 즐겨찾기 탭 전용 필터:
  - 전체
  - 한국만
  - 미국만
- 상태는 amber 색상으로 강조

---

## 5. 로딩 / 에러 / 빈 상태 처리

- 로딩: Spinner
  - 개발 모드에선 최소 지연을 추가하여 확인 가능하도록 개선
- 에러: 사용자 친화적인 메시지(개발 모드에서 상세 에러 표시)
- 빈 결과: EmptyState 컴포넌트로 안내 문구 출력

---

## 6. 반응형 UI

- 모바일, 태블릿, 데스크탑 완전 대응
- flex/grid 기반 자동 레이아웃
- 즐겨찾기 토글도 반응형 배치 적용

---

# 🏗 기술 스택

- **React + Vite**
- **TypeScript (strict mode)**
- **Zustand** — 검색 필터 / 국가 / 즐겨찾기 상태 관리
- **Zod** — 응답 스키마 검증 및 안전한 데이터 매핑
- **TailwindCSS** — 반응형 스타일링
- **clsx** - 조건부 클래스 설정
- **ESLint + Prettier**

---

# 📁 폴더 구조

```
src/
 ├── features/
 │    ├── trademarks/
 │    │     ├── api/         # fetch + Zod 스키마 검증
 │    │     ├── model/       # KR/US raw → common transform
 │    │     ├── state/       # 즐겨찾기 store
 │    │     ├── components/  # 리스트/아이템/모달
 │    ├── search/
 │    │     ├── state/       # search 필터 store
 │    │     ├── components/  # SearchForm
 │    ├── country/
 │         ├── components/   # 국가 탭
 │
 ├── shared/
 │    ├── components/ # Badge, Button, DateRangePicker, EmptyState 등
 │    ├── lib/        # sleep, utils
 │
 └── main.tsx
```

---

# 🎯 기술적 의사결정

## 1. Transform 계층 도입

KR/US 스키마 차이를 UI에서 직접 처리하면 유지보수 불가  
→ transform 계층(`mapKrToTrademark`, `mapUsToTrademark`)에서 공통 모델로 변환

## 2. Zustand의 채택

- 검색 조건 / 국가 / 즐겨찾기 등 UI 전역 상태가 많음
- Redux 대비 코드량 적고 단순함
- React Query는 필요하지 않음(JSON 기반 로컬 fetch)

## 3. API 스키마 안전성 확보(Zod)

- safeParse 적용
- 실패 시 개발 모드에서 상세 에러 로그
- 배포 모드에서는 사용자 친화 메시지를 반환

## 4. UX 개선 사항

- 필터가 너무 커지는 것을 방지 → 기본/상세 분리
- 범위 선택(DateRangePicker) 제공
- 즐겨찾기 탭에서는 자동으로 양국 데이터 수집

---

# 🚀 실행 방법

### 패키지 설치

```sh
pnpm install
```

### 개발 서버 실행

```sh
pnpm dev
```

### 타입 검사

```sh
pnpm check-types
```

### 린트

```sh
pnpm lint
```

---

# ✨ 추가 개선 아이디어

- 국가별 데이터 비교 뷰 추가
- 정렬 기능 (출원일/공고일/상표명)
- 무한 스크롤 또는 페이지네이션
- React Query 기반 서버 상태 분리
