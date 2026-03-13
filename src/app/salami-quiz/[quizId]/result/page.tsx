'use client';
import { useSearchParams } from 'next/navigation';
import SalamiQuizResult from '@/components/salami-quiz-result';
import { Suspense } from 'react';

function QuizResult() {
  const searchParams = useSearchParams();
  const quizId = searchParams.get('quizId') || '';
  const score = parseInt(searchParams.get('score') || '0', 10);
  const total = parseInt(searchParams.get('total') || '0', 10);
  const takerName = searchParams.get('takerName') || '';

  return <SalamiQuizResult quizId={quizId} score={score} totalQuestions={total} takerName={takerName} />;
}

export default function SalamiQuizResultPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <QuizResult />
        </Suspense>
    )
}
