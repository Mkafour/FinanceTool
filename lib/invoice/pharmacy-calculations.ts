import { LineItem } from './types';

export function calculatePharmacyLineTotal(item: LineItem): number {
    const base = item.quantity * item.unitPrice;
    const discPercent = item.discPercent ?? 0;
    return base - base * (discPercent / 100);
}

export function calculatePharmacyNetTotal(lineItems: LineItem[]): number {
    return lineItems.reduce((sum, item) => sum + calculatePharmacyLineTotal(item), 0);
}