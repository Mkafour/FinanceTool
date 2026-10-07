'use client';

import { LineItem } from '@/lib/invoice/types';
import { calculateLineTotal } from '@/lib/invoice/calculations';
import { formatNumber } from '@/lib/formatting';

interface LineItemRowProps {
    item: LineItem;
    onChange: (item: LineItem) => void;
    onRemove: () => void;
}

export default function LineItemRow({ item, onChange, onRemove }: LineItemRowProps) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 70px 100px 100px 32px', gap: '0.5rem', alignItems: 'center' }}>
            <input
                type="text"
                placeholder="Item description"
                value={item.description}
                onChange={(e) => onChange({ ...item, description: e.target.value })}
                style={{ padding: '0.5rem', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '0.375rem' }}
            />
            <input
                type="number"
                min={0}
                value={item.quantity === 0 ? '' : item.quantity}
                placeholder="Qty"
                onChange={(e) => onChange({ ...item, quantity: e.target.value === '' ? 0 : parseFloat(e.target.value) })}
                style={{ padding: '0.5rem', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '0.375rem' }}
            />
            <input
                type="number"
                min={0}
                step={0.01}
                value={item.unitPrice === 0 ? '' : item.unitPrice}
                placeholder="Price"
                onChange={(e) => onChange({ ...item, unitPrice: e.target.value === '' ? 0 : parseFloat(e.target.value) })}
                style={{ padding: '0.5rem', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '0.375rem' }}
            />
            <span style={{ textAlign: 'right', fontWeight: 600, fontSize: '0.875rem' }}>
                {formatNumber(calculateLineTotal(item))}
            </span>
            <button
                type="button"
                onClick={onRemove}
                aria-label="Remove item"
                style={{ background: 'none', border: 'none', color: 'var(--color-danger, #dc2626)', fontSize: '1.25rem', cursor: 'pointer' }}
            >
                ×
            </button>
        </div>
    );
}