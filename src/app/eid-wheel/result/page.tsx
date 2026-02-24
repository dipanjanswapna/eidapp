'use client';
import EidWheelResult from '@/components/eid-wheel-result';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function WheelResult() {
  const searchParams = useSearchParams();
  const resultData = {
    name: searchParams.get('name') || '',
    result: searchParams.get('result') || '',
    index: parseInt(searchParams.get('index') || '0', 10),
  };

  return <EidWheelResult {...resultData} />;
}

export default function EidWheelResultPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <WheelResult />
        </Suspense>
    )
}
