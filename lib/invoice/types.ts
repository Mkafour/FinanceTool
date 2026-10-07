export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;

    // Pharmacy-specific (optional, only used by Globe Pharmacy template)
    hsCode?: string;
    itemCode?: string;
    batchNo?: string;
    expiryDate?: string;
    taxPercent?: number;
    discPercent?: number;
}

export interface InvoiceData {
    businessName: string;
    businessEmail: string;
    businessAddress: string;
    logoDataUrl: string | null;

    clientName: string;
    clientEmail: string;
    clientAddress: string;

    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;

    lineItems: LineItem[];

    includeTax: boolean;
    taxPercentage: number;

    includeDiscount: boolean;
    discountPercentage: number;

    notes: string;
    currencyCode: string;
    templateId: string;

    // Pharmacy-specific (optional, only used by Globe Pharmacy template)
    poNumber?: string;
    customerTaxId?: string;
    companyTaxId?: string;
    companySubtitle?: string;
    paybill?: string;
    accountNumber?: string;
    termsText?: string;
}

export interface InvoiceTotals {
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    grandTotal: number;
}