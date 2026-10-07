import { InvoiceData } from './types';

export function getEmptyPharmacyInvoice(): InvoiceData {
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

        lineItems: [
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

        includeTax: false,
        taxPercentage: 0,
        includeDiscount: false,
        discountPercentage: 0,

        notes: '',
        currencyCode: 'KES',
        templateId: 'globe-pharmacy',

        poNumber: '',
        customerTaxId: '',
        paybill: '',
        accountNumber: '',
    };
}