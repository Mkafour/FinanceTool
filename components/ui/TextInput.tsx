'use client';

import React from 'react';
import styles from './NumberInput.module.css';

interface TextInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: 'text' | 'email' | 'date';
    helperText?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
                                                        label,
                                                        value,
                                                        onChange,
                                                        placeholder,
                                                        type = 'text',
                                                        helperText,
                                                    }) => {
    return (
        <div className={styles.field}>
            <label className={styles.label}>{label}</label>
            <div className={styles.inputWrapper}>
                <input
                    type={type}
                    className={styles.input}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
            {helperText && <span className={styles.helperText}>{helperText}</span>}
        </div>
    );
};