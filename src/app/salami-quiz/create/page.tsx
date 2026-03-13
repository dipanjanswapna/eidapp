import SalamiQuizCreateForm from '@/components/salami-quiz-create-form';
import ConfettiBackground from '@/components/confetti-background';

export default function CreateSalamiQuizPage() {
  return (
    <div className="relative min-h-screen w-full">
      <ConfettiBackground />
      <div className="container relative z-10 mx-auto max-w-4xl px-4 py-12">
        <SalamiQuizCreateForm />
      </div>
    </div>
  );
}
