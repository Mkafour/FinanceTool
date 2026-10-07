'use client';

import { InvoiceData } from '@/lib/invoice/types';
import { calculateLineTotal, calculateInvoiceTotals } from '@/lib/invoice/calculations';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { getTemplateById } from '@/lib/invoice/templates';

interface InvoicePreviewProps {
    data: InvoiceData;
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
    const totals = calculateInvoiceTotals(data);
    const fmt = (val: number) => formatCurrency(val, { currency: data.currencyCode });
    const template = getTemplateById(data.templateId);

    const businessBlock = (
        <div style={{ textAlign: template.headerAlign === 'logo-right' ? 'right' : 'left' }}>
            {data.logoDataUrl && <img src={data.logoDataUrl} alt="Logo" style={{ height: '48px', marginBottom: '0.5rem' }} />}
            <h2 style={{ margin: 0 }}>{data.businessName || 'Your Business'}</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>{data.businessEmail}</p>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>{data.businessAddress}</p>
        </div>
    );

    const invoiceBlock = (
        <div style={{ textAlign: template.headerAlign === 'logo-right' ? 'left' : 'right' }}>
            <h1 style={{ margin: 0, color: template.accentColor }}>INVOICE</h1>
            <p style={{ margin: 0 }}>#{data.invoiceNumber || '—'}</p>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Date: {data.invoiceDate || '—'}</p>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Due: {data.dueDate || '—'}</p>
        </div>
    );

    return (
        <div style={{ background: '#fff', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '0.5rem', padding: '2rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                {template.headerAlign === 'logo-right' ? (
                    <>
                        {invoiceBlock}
                        {businessBlock}
                    </>
                ) : (
                    <>
                        {businessBlock}
                        {invoiceBlock}
                    </>
                )}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <strong>Bill To:</strong>
                <p style={{ margin: '0.25rem 0 0' }}>{data.clientName || '—'}</p>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>{data.clientEmail}</p>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>{data.clientAddress}</p>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
                <thead>
                <tr style={{ borderBottom: `2px solid ${template.accentColor}` }}>
                    <th style={{ textAlign: 'left', padding: '0.5rem 0' }}>Description</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem 0' }}>Qty</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem 0' }}>Unit Price</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem 0' }}>Total</th>
                </tr>
                </thead>
                <tbody>
                {data.lineItems.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '0.5rem 0' }}>{item.description || '—'}</td>
                        <td style={{ textAlign: 'right', padding: '0.5rem 0' }}>{item.quantity}</td>
                        <td style={{ textAlign: 'right', padding: '0.5rem 0' }}>{formatNumber(item.unitPrice)}</td>
                        <td style={{ textAlign: 'right', padding: '0.5rem 0' }}>{formatNumber(calculateLineTotal(item))}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Subtotal</span><span>{fmt(totals.subtotal)}</span>
                    </div>
                    {data.includeDiscount && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Discount ({data.discountPercentage}%)</span><span>-{fmt(totals.discountAmount)}</span>
                        </div>
                    )}
                    {data.includeTax && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Tax ({data.taxPercentage}%)</span><span>{fmt(totals.taxAmount)}</span>
                        </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.125rem', borderTop: `2px solid ${template.accentColor}`, paddingTop: '0.375rem' }}>
                        <span>Total</span><span>{fmt(totals.grandTotal)}</span>
                    </div>
                </div>
            </div>

            {data.notes && (
                <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{data.notes}</p>
            )}
        </div>
    );
}