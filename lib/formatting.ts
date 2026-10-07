/**
 * Shared formatting utilities for FinanceCalc.
 * Ensures consistent output formatting across all calculators.
 */

interface CurrencyOptions {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
}

/**
 * Formats a number as a currency string (default USD).
 */
export function formatCurrency(
    value: number,
    options: CurrencyOptions = {}
): string {
    if (isNaN(value) || !isFinite(value)) {
        return '$0.00';
    }

    const {
        currency = 'USD',
        locale = 'en-US',
        minimumFractionDigits = 2,
        maximumFractionDigits = 2,
    } = options;

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
    }).format(value);
}

/**
 * Formats a decimal or whole number as a percentage string (e.g. 0.05 -> 5%).
 * @param isDecimal If true, expects value like 0.07 (7%). If false, expects 7 (7%).
 */
export function formatPercent(
    value: number,
    isDecimal: boolean = false,
    fractionDigits: number = 2
): string {
    if (isNaN(value) || !isFinite(value)) {
        return '0%';
    }

    const rawPercent = isDecimal ? value * 100 : value;

    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: fractionDigits,
    }).format(rawPercent) + '%';
}

/**
 * Formats standard numbers with comma separators (e.g., 1250000 -> "1,250,000").
 */
export function formatNumber(
    value: number,
    fractionDigits: number = 2
): string {
    if (isNaN(value) || !isFinite(value)) {
        return '0';
    }

    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: fractionDigits,
    }).format(value);
}

/**
 * Compacts large financial numbers into short human-readable representations
 * (e.g., 1,500,000 -> "$1.5M").
 */
export function formatCompactCurrency(value: number): string {
    if (isNaN(value) || !isFinite(value)) {
        return '$0';
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(value);
}