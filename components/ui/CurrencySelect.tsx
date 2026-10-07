'use client';

import React from 'react';
import { CURRENCY_OPTIONS, CurrencyInfo } from '@/lib/locale';
import styles from './NumberInput.module.css';

interface CurrencySelectProps {
    value: string;
    onChange: (currency: CurrencyInfo) => void;
}

export const CurrencySelect: React.FC<CurrencySelectProps> = ({ value, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const match = CURRENCY_OPTIONS.find((c) => c.code === e.target.value);
        if (match) onChange(match);
    };

    return (
        <div className={styles.field}>
            <label className={styles.label}>Currency</label>
            <select className={styles.input} value={value} onChange={handleChange}>
                {CURRENCY_OPTIONS.map((c) => (
                    <option key={c.code} value={c.code}>
                        {c.symbol} {c.code} — {c.label}
                    </option>
                ))}
            </select>
        </div>
    );
};