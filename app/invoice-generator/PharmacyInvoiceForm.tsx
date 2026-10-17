'use client';

import { InvoiceData, LineItem } from '@/lib/invoice/types';
import { TextInput } from '@/components/ui/TextInput';

interface PharmacyInvoiceFormProps {
    data: InvoiceData;
    onChange: (data: InvoiceData) => void;
}

export default function PharmacyInvoiceForm({ data, onChange }: PharmacyInvoiceFormProps) {
    const update = (patch: Partial<InvoiceData>) => onChange({ ...data, ...patch });

    const updateLineItem = (id: string, updated: LineItem) => {
        update({ lineItems: data.lineItems.map((item) => (item.id === id ? updated : item)) });
    };

    const addLineItem = () => {
        update({
            lineItems: [
                ...data.lineItems,
                {
                    id: crypto.randomUUID(),
                    description: '',
                    quantity: 0,
                    unitPrice: 0,
                    hsCode: '',
                    itemCode: '',
                    batchNo: '',
                    expiryDate: '',
                    taxPercent: 0,
                    discPercent: 0,
                },
            ],
        });
    };

    const removeLineItem = (id: string) => {
        update({ lineItems: data.lineItems.filter((item) => item.id !== id) });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3>Customer</h3>
                <TextInput label="Customer Name" value={data.clientName} onChange={(v) => update({ clientName: v })} />
                <TextInput label="Customer Address" value={data.clientAddress} onChange={(v) => update({ clientAddress: v })} />
                <TextInput label="Customer Tax ID" value={data.customerTaxId || ''} onChange={(v) => update({ customerTaxId: v })} />
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3>Invoice Details</h3>
                <TextInput label="PO Number" value={data.poNumber || ''} onChange={(v) => update({ poNumber: v })} />
                <TextInput label="Invoice Number" value={data.invoiceNumber} onChange={(v) => update({ invoiceNumber: v })} />
                <TextInput label="Invoice Date" type="date" value={data.invoiceDate} onChange={(v) => update({ invoiceDate: v })} />
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h3>Products</h3>
                {data.lineItems.map((item) => (
                    <div key={item.id} style={{ border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '0.5rem', padding: '0.75rem', display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <input placeholder="Description" value={item.description} onChange={(e) => updateLineItem(item.id, { ...item, description: e.target.value })} style={inputStyle} />
                        <input placeholder="HS Code" value={item.hsCode || ''} onChange={(e) => updateLineItem(item.id, { ...item, hsCode: e.target.value })} style={inputStyle} />
                        <input placeholder="Item Code" value={item.itemCode || ''} onChange={(e) => updateLineItem(item.id, { ...item, itemCode: e.target.value })} style={inputStyle} />
                        <input placeholder="Batch No" value={item.batchNo || ''} onChange={(e) => updateLineItem(item.id, { ...item, batchNo: e.target.value })} style={inputStyle} />
                        <input placeholder="Exp Date (e.g. 2028-03)" value={item.expiryDate || ''} onChange={(e) => updateLineItem(item.id, { ...item, expiryDate: e.target.value })} style={inputStyle} />
                        <input type="number" placeholder="Qty" value={item.quantity || ''} onChange={(e) => updateLineItem(item.id, { ...item, quantity: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                        <input type="number" placeholder="Rate" value={item.unitPrice || ''} onChange={(e) => updateLineItem(item.id, { ...item, unitPrice: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                        <input type="number" placeholder="Tax" value={item.taxPercent || ''} onChange={(e) => updateLineItem(item.id, { ...item, taxPercent: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                        <input type="number" placeholder="Disc %" value={item.discPercent || ''} onChange={(e) => updateLineItem(item.id, { ...item, discPercent: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                        <button type="button" onClick={() => removeLineItem(item.id)} style={{ color: 'var(--color-danger, #dc2626)', background: 'none', border: 'none', cursor: 'pointer', justifySelf: 'start' }}>
                            Remove product
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addLineItem} style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', border: '1px dashed var(--border-color, #e5e7eb)', borderRadius: '0.375rem', background: 'none', cursor: 'pointer' }}>
                    + Add Product
                </button>
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3>Payment Details</h3>
                <TextInput label="M-Pesa Paybill" value={data.paybill || ''} onChange={(v) => update({ paybill: v })} />
                <TextInput label="Account Number" value={data.accountNumber || ''} onChange={(v) => update({ accountNumber: v })} />
            </section>
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    padding: '0.5rem',
    border: '1px solid var(--border-color, #e5e7eb)',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    width: '100%',
};