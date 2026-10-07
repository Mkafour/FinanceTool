'use client';

import { CalculationResult } from '@/lib/types';
import { TipOutputs } from '@/calculators/tip-calculator';
import { ResultCard } from '@/components/ui/ResultCard';
import { formatCurrency } from '@/lib/formatting';
import { CurrencyInfo } from '@/lib/locale';

interface TipCalculatorResultsProps {
    result: CalculationResult<TipOutputs> | null;
    currency: CurrencyInfo;
}

export default function TipCalculatorResults({ result, currency }: TipCalculatorResultsProps) {
    if (!result) {
        return (
            <p style={{ color: 'var(--text-muted, #6b7280)' }}>
                Enter your bill amount and number of people to see the breakdown.
            </p>
        );
    }

    if (!result.success || !result.data) {
        return (
            <p style={{ color: 'var(--color-error, #e53e3e)', fontWeight: 600 }}>
                {result.error}
            </p>
        );
    }

    const fmt = (val: number) => formatCurrency(val, { currency: currency.code });

    return (
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <ResultCard title="Tip Amount" value={fmt(result.data.tipAmount)} />
            <ResultCard title="Total Amount" value={fmt(result.data.totalAmount)} highlight />
            <ResultCard title="Tip Per Person" value={fmt(result.data.tipPerPerson)} />
            <ResultCard title="Total Per Person" value={fmt(result.data.totalPerPerson)} highlight />
        </div>
    );
}