'use client';

import { useState, useEffect } from 'react';
import { tipCalculatorContent } from '@/content/tip-calculator';
import { CalculatorPageLayout } from '@/components/templates/CalculatorPageLayout';
import { calculateTip, TipInputs, ADVISED_TIP_PERCENTAGE } from '@/calculators/tip-calculator';
import { detectUserCurrency, CurrencyInfo } from '@/lib/locale';
import TipCalculatorInputs from './TipCalculatorInputs';
import TipCalculatorResults from './TipCalculatorResults';

export default function TipCalculatorPage() {
    const [inputs, setInputs] = useState<TipInputs>({
        billAmount: 0,
        tipPercentage: ADVISED_TIP_PERCENTAGE,
        numberOfPeople: 0,
    });

    const [currency, setCurrency] = useState<CurrencyInfo>({ code: 'USD', symbol: '$', label: 'US Dollar' });

    useEffect(() => {
        setCurrency(detectUserCurrency());
    }, []);

    const hasRequiredInputs = inputs.billAmount > 0 && inputs.numberOfPeople > 0;
    const result = hasRequiredInputs ? calculateTip(inputs) : null;

    return (
        <CalculatorPageLayout
            content={tipCalculatorContent}
            formComponent={
                <TipCalculatorInputs
                    inputs={inputs}
                    onChange={setInputs}
                    currency={currency}
                    onCurrencyChange={setCurrency}
                />
            }
            resultsComponent={<TipCalculatorResults result={result} currency={currency} />}
        />
    );
}