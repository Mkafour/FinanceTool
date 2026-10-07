import { CalculatorContent } from '@/lib/types';

export const tipCalculatorContent: CalculatorContent = {
    id: "tip-calculator",
    slug: "tip-calculator",
    title: "Tip & Bill Split Calculator",
    shortDescription:
        "Quickly calculate the exact tip, total bill amount, and split per person with custom tipping percentages.",
    longDescription:
        "Whether you're dining out with friends or grabbing a quick meal, calculate tipping amounts and split the bill fairly in seconds.",
    intro:
        "Whether you're dining out with friends or grabbing a quick meal, calculate tipping amounts and split the bill fairly in seconds.",
    explanation:
        "Tipping percentages typically range from 15% to 20% for standard restaurant service in North America. To calculate the tip manually, multiply your bill total by the tip percentage divided by 100. Divide the grand total by the number of people to calculate individual shares.",
    category: "everyday",
    keywords: [
        "tip calculator",
        "bill split calculator",
        "restaurant tip",
        "calculate tip per person",
    ],
    faqs: [
        {
            question: "What is a standard tipping percentage?",
            answer:
                "In North America, standard tipping for good restaurant service is generally between 15% and 20%. 18% is widely considered the standard baseline.",
        },
        {
            question: "Should I tip on the pre-tax or post-tax total?",
            answer:
                "Standard tipping etiquette suggests calculating tips based on the pre-tax subtotal, though tipping on the final post-tax amount is also common practice.",
        },
    ],
    relatedCalculators: [
        {
            title: "Bill Split Calculator",
            slug: "bill-split-calculator",
            description: "Split restaurant bills and group expenses evenly.",
        },
        {
            title: "Discount Calculator",
            slug: "discount-calculator",
            description: "Calculate total savings and final prices during sales.",
        },
    ],
    relatedCalculatorIds: ["bill-split-calculator", "discount-calculator"],
};