'use client';

import React from 'react';
import styles from './NumberInput.module.css';

interface NumberInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    prefix?: string;
    suffix?: string;
    error?: string;
    helperText?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
                                                            label,
                                                            value,
                                                            onChange,
                                                            min,
                                                            max,
                                                            step = 1,
                                                            prefix,
                                                            suffix,
                                                            error,
                                                            helperText,
                                                        }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;

        if (raw === '') {
            onChange(0);
            return;
        }

        const parsed = parseFloat(raw);
        if (!isNaN(parsed)) {
            onChange(parsed);
        }
    };

    return (
        <div className={styles.field}>
            <label className={styles.label}>{label}</label>
            <div className={`${styles.inputWrapper} ${error ? styles.inputError : ''}`.trim()}>
                {prefix && <span className={styles.prefix}>{prefix}</span>}
                <input
                    type="number"
                    className={styles.input}
                    value={value === 0 ? '' : value}
                    placeholder="0"
                    onChange={handleChange}
                    min={min}
                    max={max}
                    step={step}
                    inputMode="decimal"
                />
                {suffix && <span className={styles.suffix}>{suffix}</span>}
            </div>
            {error && <span className={styles.errorText}>{error}</span>}
            {!error && helperText && <span className={styles.helperText}>{helperText}</span>}
        </div>
    );
};