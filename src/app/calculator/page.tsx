import SalamiCalculator from '@/components/salami-calculator';
import { useLanguage } from '@/contexts/language-context';

export default function SalamiCalculatorPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <SalamiCalculator />
    </div>
  );
}
