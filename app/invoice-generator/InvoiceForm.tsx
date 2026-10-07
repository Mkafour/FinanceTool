'use client';

import { InvoiceData, LineItem } from '@/lib/invoice/types';
import { createEmptyLineItem } from '@/lib/invoice/calculations';
import { TextInput } from '@/components/ui/TextInput';
import { TextArea } from '@/components/ui/TextArea';
import { Toggle } from '@/components/ui/Toggle';
import { FileUpload } from '@/components/ui/FileUpload';
import { NumberInput } from '@/components/ui/NumberInput';
import { CurrencySelect } from '@/components/ui/CurrencySelect';
import { CurrencyInfo } from '@/lib/locale';
import LineItemRow from './LineItemRow';

interface InvoiceFormProps {
    data: InvoiceData;
    onChange: (data: InvoiceData) => void;
}

export default function InvoiceForm({ data, onChange }: InvoiceFormProps) {
    const update = (patch: Partial<InvoiceData>) => onChange({ ...data, ...patch });

    const updateLineItem = (id: string, updated: LineItem) => {
        update({ lineItems: data.lineItems.map((item) => (item.id === id ? updated : item)) });
    };

    const addLineItem = () => {
        update({ lineItems: [...data.lineItems, createEmptyLineItem(crypto.randomUUID())] });
    };

    const removeLineItem = (id: string) => {
        update({ lineItems: data.lineItems.filter((item) => item.id !== id) });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3>Your Business</h3>
                <FileUpload
                    label="Logo (optional)"
                    currentValue={data.logoDataUrl}
                    onFileRead={(dataUrl) => update({ logoDataUrl: dataUrl })}
                    onClear={() => update({ logoDataUrl: null })}
                />
                <TextInput label="Business Name" value={data.businessName} onChange={(v) => update({ businessName: v })} />
                <TextInput label="Email" type="email" value={data.businessEmail} onChange={(v) => update({ businessEmail: v })} />
                <TextArea label="Address" value={data.businessAddress} onChange={(v) => update({ businessAddress: v })} />
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3>Bill To</h3>
                <TextInput label="Client Name" value={data.clientName} onChange={(v) => update({ clientName: v })} />
                <TextInput label="Client Email" type="email" value={data.clientEmail} onChange={(v) => update({ clientEmail: v })} />
                <TextArea label="Client Address" value={data.clientAddress} onChange={(v) => update({ clientAddress: v })} />
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3>Invoice Details</h3>
                <CurrencySelect
                    value={data.currencyCode}
                    onChange={(c: CurrencyInfo) => update({ currencyCode: c.code })}
                />
                <TextInput label="Invoice Number" value={data.invoiceNumber} onChange={(v) => update({ invoiceNumber: v })} placeholder="INV-001" />
                <TextInput label="Invoice Date" type="date" value={data.invoiceDate} onChange={(v) => update({ invoiceDate: v })} />
                <TextInput label="Due Date" type="date" value={data.dueDate} onChange={(v) => update({ dueDate: v })} />
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h3>Line Items</h3>
                {data.lineItems.map((item) => (
                    <LineItemRow
                        key={item.id}
                        item={item}
                        onChange={(updated) => updateLineItem(item.id, updated)}
                        onRemove={() => removeLineItem(item.id)}
                    />
                ))}
                <button
                    type="button"
                    onClick={addLineItem}
                    style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', border: '1px dashed var(--border-color, #e5e7eb)', borderRadius: '0.375rem', background: 'none', cursor: 'pointer' }}
                >
                    + Add Item
                </button>
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3>Tax & Discount</h3>
                <Toggle label="Include Tax" checked={data.includeTax} onChange={(v) => update({ includeTax: v })} />
                {data.includeTax && (
                    <NumberInput label="Tax Percentage" value={data.taxPercentage} onChange={(v) => update({ taxPercentage: v })} min={0} max={100} suffix="%" />
                )}

                <Toggle label="Include Discount" checked={data.includeDiscount} onChange={(v) => update({ includeDiscount: v })} />
                {data.includeDiscount && (
                    <NumberInput label="Discount Percentage" value={data.discountPercentage} onChange={(v) => update({ discountPercentage: v })} min={0} max={100} suffix="%" />
                )}
            </section>

            <section>
                <TextArea label="Notes (optional)" value={data.notes} onChange={(v) => update({ notes: v })} placeholder="Payment terms, thank you note, etc." />
            </section>
        </div>
    );
}