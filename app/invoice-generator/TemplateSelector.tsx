'use client';

import { INVOICE_TEMPLATES } from '@/lib/invoice/templates';

interface TemplateSelectorProps {
    onSelect: (templateId: string) => void;
    selectedTemplateId?: string;
}

export default function TemplateSelector({ onSelect, selectedTemplateId }: TemplateSelectorProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
                <h1>Choose an Invoice Style</h1>
                <p style={{ color: 'var(--text-muted)' }}>Pick a look for your invoice. You can change this later.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                {INVOICE_TEMPLATES.map((template) => {
                    const isSelected = template.id === selectedTemplateId;

                    return (
                        <button
                            key={template.id}
                            onClick={() => onSelect(template.id)}
                            style={{
                                textAlign: 'left',
                                border: isSelected
                                    ? `2px solid ${template.accentColor}`
                                    : '1px solid var(--border-color, #e5e7eb)',
                                borderRadius: '0.75rem',
                                padding: isSelected ? '1.1875rem' : '1.25rem',
                                cursor: 'pointer',
                                background: '#fff',
                                position: 'relative',
                            }}
                        >
                            {isSelected && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '0.75rem',
                                        right: '0.75rem',
                                        fontSize: '0.6875rem',
                                        fontWeight: 700,
                                        color: template.accentColor,
                                    }}
                                >
                                    ✓ SELECTED
                                </span>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                <div
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '4px',
                                        background: 'var(--bg-subtle, #f8fafc)',
                                        order: template.headerAlign === 'logo-right' ? 1 : 0,
                                    }}
                                />
                            </div>
                            <h3 style={{ margin: '0 0 0.25rem', color: isSelected ? template.accentColor : undefined }}>
                                {template.name}
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                                {template.description}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}