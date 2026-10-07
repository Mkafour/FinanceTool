'use client';

import React from 'react';
import { NumberInput } from './NumberInput';

interface CurrencyInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    currencySymbol?: string;
    error?: string;
    helperText?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
                                                                label,
                                                                value,
                                                                onChange,
                                                                min = 0,
                                                                max,
                                                                currencySymbol = '$',
                                                                error,
                                                                helperText,
                                                            }) => {
    return (
        <NumberInput
            label={label}
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={0.01}
            prefix={currencySymbol}
            error={error}
            helperText={helperText}
        />
    );
};