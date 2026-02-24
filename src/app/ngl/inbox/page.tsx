import NGLInboxLogin from '@/components/ngl-inbox-login';
import ConfettiBackground from '@/components/confetti-background';

export default function NGLInboxLoginPage() {
  return (
    <div className="relative min-h-screen w-full">
      <ConfettiBackground />
      <div className="container relative z-10 mx-auto flex min-h-[80vh] max-w-md items-center justify-center px-4 py-12">
        <NGLInboxLogin />
      </div>
    </div>
  );
}
