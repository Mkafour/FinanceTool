/**
 * Input validation & parsing helpers for FinanceCalc forms.
 */

export interface ValidationResult<T> {
    isValid: boolean;
    value: T;
    error?: string;
}

/**
 * Parses and validates raw input strings into safe numbers.
 */
export function parseNumberInput(
    rawInput: string | number,
    options: {
        min?: number;
        max?: number;
        allowZero?: boolean;
        fieldName?: string;
    } = {}
): ValidationResult<number> {
    const { min, max, allowZero = true, fieldName = 'Value' } = options;

    if (rawInput === '' || rawInput === null || rawInput === undefined) {
        return {
            isValid: false,
            value: 0,
            error: `${fieldName} is required`,
        };
    }

    const num = typeof rawInput === 'number' ? rawInput : parseFloat(rawInput);

    if (isNaN(num) || !isFinite(num)) {
        return {
            isValid: false,
            value: 0,
            error: `Please enter a valid number for ${fieldName.toLowerCase()}`,
        };
    }

    if (!allowZero && num === 0) {
        return {
            isValid: false,
            value: num,
            error: `${fieldName} must be greater than zero`,
        };
    }

    if (min !== undefined && num < min) {
        return {
            isValid: false,
            value: num,
            error: `${fieldName} cannot be less than ${min}`,
        };
    }

    if (max !== undefined && num > max) {
        return {
            isValid: false,
            value: num,
            error: `${fieldName} cannot exceed ${max}`,
        };
    }

    return {
        isValid: true,
        value: num,
    };
}

/**
 * Clamps a number within a specified minimum and maximum range.
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}