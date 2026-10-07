'use client';

import { useState, useEffect } from 'react';
import { InvoiceData } from '@/lib/invoice/types';
import { generateInvoicePdf } from '@/lib/invoice/pdf';
import { generatePharmacyInvoicePdf } from '@/lib/invoice/pharmacy-pdf';
import { getEmptyPharmacyInvoice } from '@/lib/invoice/pharmacy-defaults';
import { getTemplateById } from '@/lib/invoice/templates';
import { saveToStorage, loadFromStorage } from '@/lib/storage';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';
import PharmacyInvoiceForm from './PharmacyInvoiceForm';
import PharmacyInvoicePreview from './PharmacyInvoicePreview';
import TemplateSelector from './TemplateSelector';
import HowToUse from './HowToUse';

const STORAGE_KEY = 'financecalc-invoice-draft';

function getEmptyGenericInvoice(templateId: string): InvoiceData {
    return {
        businessName: '',
        businessEmail: '',
        businessAddress: '',
        logoDataUrl: null,
        clientName: '',
        clientEmail: '',
        clientAddress: '',
        invoiceNumber: '',
        invoiceDate: '',
        dueDate: '',
        lineItems: [{ id: crypto.randomUUID(), description: '', quantity: 1, unitPrice: 0 }],
        includeTax: false,
        taxPercentage: 0,
        includeDiscount: false,
        discountPercentage: 0,
        notes: '',
        currencyCode: 'USD',
        templateId,
    };
}

export default function InvoiceGeneratorPage() {
    const [data, setData] = useState<InvoiceData | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [showTemplatePicker, setShowTemplatePicker] = useState(false);

    useEffect(() => {
        const saved = loadFromStorage<InvoiceData>(STORAGE_KEY);
        if (saved) setData(saved);
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (loaded && data) saveToStorage(STORAGE_KEY, data);
    }, [data, loaded]);

    const handleClear = () => {
        if (confirm('Clear all saved invoice data? This cannot be undone.')) {
            setData(null);
        }
    };

    const handleTemplateChange = (templateId: string) => {
        const template = getTemplateById(templateId);

        // Switching INTO or BETWEEN pharmacy/generic shapes needs a fresh data object,
        // since the two have different required fields. Switching between generic
        // templates (e.g. classic -> modern) just updates templateId on existing data.
        const currentTemplate = data ? getTemplateById(data.templateId) : null;
        const shapeChanged = !currentTemplate || currentTemplate.isPharmacyLayout !== template.isPharmacyLayout;

        if (!data || shapeChanged) {
            setData(template.isPharmacyLayout ? { ...getEmptyPharmacyInvoice(), templateId } : getEmptyGenericInvoice(templateId));
        } else {
            setData({ ...data, templateId });
        }

        setShowTemplatePicker(false);
    };

    if (!loaded) return null;

    if (!data) {
        return (
            <Container>
                <TemplateSelector onSelect={handleTemplateChange} />
            </Container>
        );
    }

    const template = getTemplateById(data.templateId);
    const isPharmacy = !!template.isPharmacyLayout;

    return (
        <Container>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h1>{isPharmacy ? 'Globe Pharmacy Invoice' : 'Invoice Generator'}</h1>
                        <p style={{ color: 'var(--text-muted)' }}>
                            {isPharmacy
                                ? 'Fill in customer and product details. Everything stays in your browser.'
                                : 'Create a professional invoice and download it as a PDF. Everything stays in your browser.'}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowTemplatePicker(true)}
                        style={{ padding: '0.5rem 1rem', background: 'none', border: '1px solid var(--border-color)', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}
                    >
                        Change Style
                    </button>
                </header>

                <HowToUse />

                {showTemplatePicker && (
                    <Card title="Choose a Style">
                        <TemplateSelector onSelect={handleTemplateChange} selectedTemplateId={data.templateId} />
                        <button
                            onClick={() => setShowTemplatePicker(false)}
                            style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8125rem' }}
                        >
                            Cancel
                        </button>
                    </Card>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                    <Card title={isPharmacy ? 'Invoice Details' : 'Invoice Details'}>
                        {isPharmacy ? (
                            <PharmacyInvoiceForm data={data} onChange={setData} />
                        ) : (
                            <InvoiceForm data={data} onChange={setData} />
                        )}
                    </Card>

                    <Card title="Preview">
                        {isPharmacy ? (
                            <PharmacyInvoicePreview data={data} />
                        ) : (
                            <InvoicePreview data={data} />
                        )}
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                            <button
                                onClick={() => (isPharmacy ? generatePharmacyInvoicePdf(data) : generateInvoicePdf(data))}
                                style={{ padding: '0.75rem 1.5rem', background: 'var(--brand-primary, #2563eb)', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}
                            >
                                Download PDF
                            </button>
                            <button
                                onClick={handleClear}
                                style={{ padding: '0.75rem 1.5rem', background: 'none', color: 'var(--color-danger, #dc2626)', border: '1px solid var(--color-danger, #dc2626)', borderRadius: '0.5rem', cursor: 'pointer' }}
                            >
                                Clear Saved Data
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </Container>
    );
}