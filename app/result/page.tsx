import { Suspense } from 'react';
import ResultClient from './ResultClient';

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[100dvh] bg-[#0B0D1A] flex items-center justify-center">
          <div className="font-serif text-[#7A7260]">載入中...</div>
        </div>
      }
    >
      <ResultClient />
    </Suspense>
  );
}
