import { Metadata } from 'next';
import { tipCalculatorContent } from '@/content/tip-calculator';
import { generateCalculatorMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateCalculatorMetadata(tipCalculatorContent);

export default function TipCalculatorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}