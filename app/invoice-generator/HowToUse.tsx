'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';

const STEPS = [
    {
        title: '1. Pick a style',
        description: 'Choose one of 5 invoice layouts. You can switch styles anytime without losing your data.',
    },
    {
        title: '2. Add your business details',
        description: "Enter your business name, contact info, and optionally upload a logo.",
    },
    {
        title: '3. Add your client & line items',
        description: "Fill in who you're billing, then list out each item, quantity, and price.",
    },
    {
        title: '4. Turn on tax or discount (optional)',
        description: 'If you need to apply tax or a discount, toggle them on and set the percentage.',
    },
    {
        title: '5. Download your invoice',
        description: 'Once everything looks right in the preview, click "Download PDF" to save it to your device.',
    },
];

export default function HowToUse() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Card>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    textAlign: 'left',
                }}
            >
                <h3 style={{ margin: 0 }}>How to use this tool</h3>
                <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>{isOpen ? '−' : '+'}</span>
            </button>

            {isOpen && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                    {STEPS.map((step) => (
                        <div key={step.title}>
                            <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.9375rem' }}>{step.title}</h4>
                            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Your data stays in your browser only — nothing is uploaded to a server.
            </p>
        </Card>
    );
}