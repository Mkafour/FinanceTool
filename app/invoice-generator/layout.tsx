import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free Invoice Generator – FinanceCalc',
    description: 'Create and download professional invoices instantly. No sign-up, no server — everything stays in your browser.',
};

export default function InvoiceGeneratorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}