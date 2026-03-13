import { notFound } from 'next/navigation';
import ConfettiBackground from '@/components/confetti-background';
import { getSalamiQuizById } from '@/lib/db';
import SalamiQuizPlayer from '@/components/salami-quiz-player';

type SalamiQuizPageProps = {
  params: {
    quizId: string;
  };
};

export default async function SalamiQuizPage({ params }: SalamiQuizPageProps) {
  const quiz = await getSalamiQuizById(params.quizId);
  if (!quiz) {
    notFound();
  }

  return (
    <div className="relative min-h-screen w-full">
      <ConfettiBackground />
      <div className="container relative z-10 mx-auto max-w-2xl px-4 py-12">
        <SalamiQuizPlayer quiz={quiz} />
      </div>
    </div>
  );
}
