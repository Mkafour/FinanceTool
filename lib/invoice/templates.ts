export interface InvoiceTemplate {
    id: string;
    name: string;
    description: string;
    accentColor: string;
    headerAlign: 'logo-left' | 'logo-right';
    isPharmacyLayout?: boolean;
}

export const INVOICE_TEMPLATES: InvoiceTemplate[] = [
    {
        id: 'classic',
        name: 'Classic',
        description: 'Clean and traditional, logo on the left, blue accents.',
        accentColor: '#2563eb',
        headerAlign: 'logo-left',
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'Bold header alignment with a teal accent.',
        accentColor: '#0d9488',
        headerAlign: 'logo-right',
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Understated, mostly black and white with a grey accent.',
        accentColor: '#4b5563',
        headerAlign: 'logo-left',
    },
    {
        id: 'bold',
        name: 'Bold',
        description: 'High-contrast with a strong red accent.',
        accentColor: '#dc2626',
        headerAlign: 'logo-right',
    },
    {
        id: 'professional',
        name: 'Professional',
        description: 'Corporate-friendly with a deep purple accent.',
        accentColor: '#7c3aed',
        headerAlign: 'logo-left',
    },
    {
        id: 'globe-pharmacy',
        name: 'Globe Pharmacy',
        description: 'Detailed pharmaceutical sales invoice with batch tracking, tax IDs, and signatures.',
        accentColor: '#1f2937',
        headerAlign: 'logo-left',
        isPharmacyLayout: true,
    },
];

export function getTemplateById(id: string): InvoiceTemplate {
    return INVOICE_TEMPLATES.find((t) => t.id === id) ?? INVOICE_TEMPLATES[0];
}