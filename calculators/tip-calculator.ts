import { CalculationResult } from '@/lib/types';

export const ADVISED_TIP_PERCENTAGE = 10;

export interface TipInputs {
    billAmount: number;
    tipPercentage: number;
    numberOfPeople: number;
}

export interface TipOutputs {
    tipAmount: number;
    totalAmount: number;
    tipPerPerson: number;
    totalPerPerson: number;
}

export function calculateTip(inputs: TipInputs): CalculationResult<TipOutputs> {
    const { billAmount, tipPercentage, numberOfPeople } = inputs;

    if (billAmount < 0 || tipPercentage < 0 || numberOfPeople < 1) {
        return {
            success: false,
            error: 'Please enter valid positive values.',
        };
    }

    const tipAmount = billAmount * (tipPercentage / 100);
    const totalAmount = billAmount + tipAmount;
    const tipPerPerson = tipAmount / numberOfPeople;
    const totalPerPerson = totalAmount / numberOfPeople;

    return {
        success: true,
        data: {
            tipAmount,
            totalAmount,
            tipPerPerson,
            totalPerPerson,
        },
    };
}