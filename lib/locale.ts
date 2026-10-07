export interface CurrencyInfo {
    code: string;
    symbol: string;
    label: string;
}

export const CURRENCY_OPTIONS: CurrencyInfo[] = [
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'GBP', symbol: '£', label: 'British Pound' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'KES', symbol: 'KSh', label: 'Kenyan Shilling' },
    { code: 'NGN', symbol: '₦', label: 'Nigerian Naira' },
    { code: 'ZAR', symbol: 'R', label: 'South African Rand' },
    { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
    { code: 'CAD', symbol: 'CA$', label: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'AU$', label: 'Australian Dollar' },
    { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
];

const REGION_CURRENCY_MAP: Record<string, string> = {
    US: 'USD',
    GB: 'GBP',
    DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR', NL: 'EUR', IE: 'EUR', PT: 'EUR',
    KE: 'KES',
    NG: 'NGN',
    ZA: 'ZAR',
    IN: 'INR',
    CA: 'CAD',
    AU: 'AUD',
    JP: 'JPY',
};

const DEFAULT_CURRENCY: CurrencyInfo = CURRENCY_OPTIONS[0];

export function detectUserCurrency(): CurrencyInfo {
    if (typeof navigator === 'undefined') return DEFAULT_CURRENCY;

    try {
        const locale = navigator.language || 'en-US';
        const region = locale.split('-')[1]?.toUpperCase();
        const code = region ? REGION_CURRENCY_MAP[region] : undefined;

        if (code) {
            const match = CURRENCY_OPTIONS.find((c) => c.code === code);
            if (match) return match;
        }
    } catch {
        // fall through
    }

    return DEFAULT_CURRENCY;
}