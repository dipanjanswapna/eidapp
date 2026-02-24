'use client';
import SalamiCalculatorResult from '@/components/salami-calculator-result';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CalculatorResult() {
  const searchParams = useSearchParams();
  const resultData = {
    name: searchParams.get('name') || '',
    gender: searchParams.get('gender') || 'male',
    relationshipStatus: searchParams.get('relationshipStatus') || 'single',
    profession: searchParams.get('profession') || 'student',
    monthlyIncome: searchParams.get('monthlyIncome') || '0',
    bkashNumber: searchParams.get('bkashNumber') || '',
    nagadNumber: searchParams.get('nagadNumber') || '',
    rocketNumber: searchParams.get('rocketNumber') || '',
  };

  return <SalamiCalculatorResult {...resultData} />;
}

export default function SalamiCalculatorResultPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CalculatorResult />
        </Suspense>
    )
}
