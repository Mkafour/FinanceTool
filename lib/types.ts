/**
 * Core type definitions for FinanceCalc architecture.
 */

// Base interface for all calculator input objects
export interface BaseCalculatorInputs {
    [key: string]: number | string | boolean;
}

// Standard structure returned by pure calculation functions
export interface CalculationResult<TOutput> {
    success: boolean;
    data?: TOutput;
    error?: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface RelatedCalculator {
    title: string;
    slug: string;
    description: string;
}

// Standard structure for calculator metadata & content
export interface CalculatorContent {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    intro: string;
    explanation: string;
    category: 'budgeting' | 'loans' | 'savings' | 'taxes' | 'everyday';
    keywords: string[];
    faqs: FAQItem[];
    relatedCalculators: RelatedCalculator[];
    relatedCalculatorIds: string[];
}