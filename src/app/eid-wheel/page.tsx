import EidWheel from '@/components/eid-wheel';
import ConfettiBackground from '@/components/confetti-background';

export default function EidWheelPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ConfettiBackground />
      <div className="container relative z-10 mx-auto flex min-h-[80vh] max-w-4xl items-center justify-center px-4 py-12">
        <EidWheel />
      </div>
    </div>
  );
}
