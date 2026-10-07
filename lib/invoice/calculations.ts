import { InvoiceData, InvoiceTotals, LineItem } from './types';

export function calculateLineTotal(item: LineItem): number {
    return item.quantity * item.unitPrice;
}

export function calculateSubtotal(lineItems: LineItem[]): number {
    return lineItems.reduce((sum, item) => sum + calculateLineTotal(item), 0);
}

export function calculateInvoiceTotals(data: InvoiceData): InvoiceTotals {
    const subtotal = calculateSubtotal(data.lineItems);

    const discountAmount = data.includeDiscount
        ? subtotal * (data.discountPercentage / 100)
        : 0;

    const taxableAmount = subtotal - discountAmount;

    const taxAmount = data.includeTax
        ? taxableAmount * (data.taxPercentage / 100)
        : 0;

    const grandTotal = taxableAmount + taxAmount;

    return {
        subtotal,
        taxAmount,
        discountAmount,
        grandTotal,
    };
}

export function createEmptyLineItem(id: string): LineItem {
    return {
        id,
        description: '',
        quantity: 1,
        unitPrice: 0,
    };
}