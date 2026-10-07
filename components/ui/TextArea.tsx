'use client';

import React from 'react';
import styles from './NumberInput.module.css';

interface TextAreaProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, value, onChange, placeholder, rows = 3 }) => {
    return (
        <div className={styles.field}>
            <label className={styles.label}>{label}</label>
            <textarea
                className={styles.input}
                style={{ height: 'auto', padding: '0.625rem 0.875rem', resize: 'vertical' }}
                rows={rows}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};