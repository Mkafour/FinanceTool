'use client';

import React from 'react';
import styles from './NumberInput.module.css';

interface FileUploadProps {
    label: string;
    onFileRead: (dataUrl: string) => void;
    onClear: () => void;
    currentValue: string | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({ label, onFileRead, onClear, currentValue }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                onFileRead(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className={styles.field}>
            <label className={styles.label}>{label}</label>
            {currentValue ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={currentValue} alt="Logo preview" style={{ height: '48px', borderRadius: '4px' }} />
                    <button type="button" onClick={onClear} style={{ fontSize: '0.8125rem', color: 'var(--color-danger, #dc2626)', background: 'none', border: 'none', cursor: 'pointer' }}>
                        Remove logo
                    </button>
                </div>
            ) : (
                <input type="file" accept="image/*" onChange={handleChange} />
            )}
        </div>
    );
};