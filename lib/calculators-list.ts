export interface CalculatorListItem {
    title: string;
    slug: string;
    description: string;
}

export const calculatorsList: CalculatorListItem[] = [
    {
        title: 'Tip & Bill Split Calculator',
        slug: 'tip-calculator',
        description: 'Calculate tips and split bills fairly among any group size.',
    },
];

export interface ToolListItem {
    title: string;
    href: string;
    description: string;
}

export const toolsList: ToolListItem[] = [
    {
        title: 'Invoice Generator',
        href: '/invoice-generator',
        description: 'Create professional invoices with custom styles and download them as PDF.',
    },
];