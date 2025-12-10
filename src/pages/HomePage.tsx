// src/pages/HomePage.tsx
import { MainLayout } from '../features/layout/MainLayout';
import { CountryTabs } from '../features/country/components/CountryTabs';
import { SearchForm } from '../features/search/components/SearchForm';
import { TrademarkList } from '../features/trademarks/components/TrademarkList';

export function HomePage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <CountryTabs />
        <SearchForm />
        {/* 로딩/에러/빈 결과 처리는 TrademarkList 내부에서 */}
        <TrademarkList />
      </div>
    </MainLayout>
  );
}
