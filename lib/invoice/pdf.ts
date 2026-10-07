import jsPDF from 'jspdf';
import { InvoiceData } from './types';
import { calculateLineTotal, calculateInvoiceTotals } from './calculations';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { getTemplateById } from './templates';

function hexToRgb(hex: string): [number, number, number] {
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

export function generateInvoicePdf(data: InvoiceData): void {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 48;
    let y = margin;

    const fmt = (val: number) => formatCurrency(val, { currency: data.currencyCode });
    const template = getTemplateById(data.templateId);
    const [r, g, b] = hexToRgb(template.accentColor);

    const businessX = template.headerAlign === 'logo-right' ? pageWidth - margin : margin;
    const businessAlign = template.headerAlign === 'logo-right' ? 'right' : 'left';
    const invoiceX = template.headerAlign === 'logo-right' ? margin : pageWidth - margin;
    const invoiceAlign = template.headerAlign === 'logo-right' ? 'left' : 'right';

    // --- Logo ---
    if (data.logoDataUrl) {
        try {
            const logoX = businessAlign === 'right' ? pageWidth - margin - 80 : margin;
            doc.addImage(data.logoDataUrl, 'PNG', logoX, y, 80, 80);
        } catch {
            // skip logo on failure
        }
    }

    // --- Business Info ---
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(data.businessName || 'Your Business', businessX, y + 20, { align: businessAlign });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(data.businessEmail || '', businessX, y + 38, { align: businessAlign });
    doc.text(data.businessAddress || '', businessX, y + 52, { align: businessAlign });

    // --- Invoice Title & Meta ---
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(r, g, b);
    doc.text('INVOICE', invoiceX, y + 20, { align: invoiceAlign });
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Invoice #: ${data.invoiceNumber || '—'}`, invoiceX, y + 38, { align: invoiceAlign });
    doc.text(`Date: ${data.invoiceDate || '—'}`, invoiceX, y + 52, { align: invoiceAlign });
    doc.text(`Due: ${data.dueDate || '—'}`, invoiceX, y + 66, { align: invoiceAlign });

    y += 110;

    // --- Client Info ---
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', margin, y);
    y += 16;

    doc.setFont('helvetica', 'normal');
    doc.text(data.clientName || '—', margin, y);
    y += 14;
    doc.text(data.clientEmail || '', margin, y);
    y += 14;
    doc.text(data.clientAddress || '', margin, y);

    y += 36;

    // --- Line Items Table Header ---
    const colDescX = margin;
    const colQtyX = pageWidth - margin - 180;
    const colPriceX = pageWidth - margin - 110;
    const colTotalX = pageWidth - margin;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Description', colDescX, y);
    doc.text('Qty', colQtyX, y, { align: 'right' });
    doc.text('Unit Price', colPriceX, y, { align: 'right' });
    doc.text('Total', colTotalX, y, { align: 'right' });

    y += 6;
    doc.setDrawColor(r, g, b);
    doc.setLineWidth(1.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 16;

    // --- Line Items Rows ---
    doc.setFont('helvetica', 'normal');
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    data.lineItems.forEach((item) => {
        if (y > 740) {
            doc.addPage();
            y = margin;
        }

        doc.text(item.description || '—', colDescX, y, { maxWidth: colQtyX - colDescX - 10 });
        doc.text(String(item.quantity), colQtyX, y, { align: 'right' });
        doc.text(formatNumber(item.unitPrice), colPriceX, y, { align: 'right' });
        doc.text(formatNumber(calculateLineTotal(item)), colTotalX, y, { align: 'right' });

        y += 20;
    });

    y += 10;
    doc.line(margin, y, pageWidth - margin, y);
    y += 24;

    // --- Totals ---
    const totals = calculateInvoiceTotals(data);
    const labelX = pageWidth - margin - 150;

    doc.setFontSize(10);
    doc.text('Subtotal:', labelX, y);
    doc.text(fmt(totals.subtotal), colTotalX, y, { align: 'right' });
    y += 16;

    if (data.includeDiscount) {
        doc.text(`Discount (${data.discountPercentage}%):`, labelX, y);
        doc.text(`-${fmt(totals.discountAmount)}`, colTotalX, y, { align: 'right' });
        y += 16;
    }

    if (data.includeTax) {
        doc.text(`Tax (${data.taxPercentage}%):`, labelX, y);
        doc.text(fmt(totals.taxAmount), colTotalX, y, { align: 'right' });
        y += 16;
    }

    doc.setDrawColor(r, g, b);
    doc.setLineWidth(1);
    doc.line(labelX, y, pageWidth - margin, y);
    y += 18;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(r, g, b);
    doc.text('Total:', labelX, y);
    doc.text(fmt(totals.grandTotal), colTotalX, y, { align: 'right' });
    doc.setTextColor(0, 0, 0);

    y += 40;

    // --- Notes ---
    if (data.notes) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text('Notes:', margin, y);
        y += 14;
        doc.text(data.notes, margin, y, { maxWidth: pageWidth - margin * 2 });
    }

    const filename = `invoice-${data.invoiceNumber || 'draft'}.pdf`;
    doc.save(filename);
}