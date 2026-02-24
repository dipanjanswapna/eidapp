import CreateSalamiForm from '@/components/create-salami-form';
import ConfettiBackground from '@/components/confetti-background';

export default function CreateSalamiPage() {
  return (
    <div className="relative min-h-screen w-full">
      <ConfettiBackground />
      <div className="container relative z-10 mx-auto max-w-2xl px-4 py-12">
        <CreateSalamiForm />
      </div>
    </div>
  );
}
