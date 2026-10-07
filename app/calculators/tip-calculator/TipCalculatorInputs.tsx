'use client';

import { TipInputs } from '@/calculators/tip-calculator';
import { CurrencyInfo } from '@/lib/locale';
import { CurrencyInput } from '@/components/ui/CurrencyInput';
import { CurrencySelect } from '@/components/ui/CurrencySelect';
import { NumberInput } from '@/components/ui/NumberInput';

interface TipCalculatorInputsProps {
    inputs: TipInputs;
    onChange: (inputs: TipInputs) => void;
    currency: CurrencyInfo;
    onCurrencyChange: (currency: CurrencyInfo) => void;
}

export default function TipCalculatorInputs({
                                                inputs,
                                                onChange,
                                                currency,
                                                onCurrencyChange,
                                            }: TipCalculatorInputsProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <CurrencySelect value={currency.code} onChange={onCurrencyChange} />
            <CurrencyInput
                label="Bill Amount"
                value={inputs.billAmount}
                onChange={(val) => onChange({ ...inputs, billAmount: val })}
                currencySymbol={currency.symbol}
            />
            <NumberInput
                label="Tip Percentage"
                value={inputs.tipPercentage}
                onChange={(val) => onChange({ ...inputs, tipPercentage: val })}
                min={0}
                max={100}
                suffix="%"
                helperText="Advised: 10% — adjust if you'd like to tip more or less"
            />
            <NumberInput
                label="Number of People"
                value={inputs.numberOfPeople}
                onChange={(val) => onChange({ ...inputs, numberOfPeople: val })}
                min={1}
                helperText="How many people are splitting the bill"
            />
        </div>
    );
}