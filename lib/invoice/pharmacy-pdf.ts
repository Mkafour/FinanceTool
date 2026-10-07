import jsPDF from 'jspdf';
import { InvoiceData } from './types';
import { calculatePharmacyLineTotal, calculatePharmacyNetTotal } from './pharmacy-calculations';
import { formatNumber } from '@/lib/formatting';
import { GLOBE_PHARMACY_INFO, GLOBE_PHARMACY_TERMS } from './globe-pharmacy-constants';

export function generatePharmacyInvoicePdf(data: InvoiceData): void {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    let y = margin;

    // --- Fixed Header ---
    if (data.logoDataUrl) {
        try {
            doc.addImage(data.logoDataUrl, 'PNG', margin, y, 60, 60);
        } catch {
            // skip logo on failure
        }
    }

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(GLOBE_PHARMACY_INFO.name, pageWidth / 2, y + 10, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(GLOBE_PHARMACY_INFO.subtitle, pageWidth / 2, y + 26, { align: 'center' });

    doc.setFontSize(8.5);
    const addressLines = GLOBE_PHARMACY_INFO.address.split('\n');
    doc.text(addressLines[0], pageWidth / 2, y + 40, { align: 'center' });
    doc.text(addressLines[1] || '', pageWidth / 2, y + 52, { align: 'center' });
    doc.text(GLOBE_PHARMACY_INFO.phone, pageWidth / 2, y + 64, { align: 'center' });
    doc.text(GLOBE_PHARMACY_INFO.email, pageWidth / 2, y + 76, { align: 'center' });

    y += 100;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Sales Invoice', pageWidth / 2, y, { align: 'center' });

    y += 24;

    // --- Customer / Invoice Info ---
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Customer Name:', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(data.clientName || '—', margin + 90, y);

    doc.setFont('helvetica', 'bold');
    doc.text('PO No:', pageWidth / 2 + 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(data.poNumber || '—', pageWidth / 2 + 70, y);
    y += 16;

    doc.setFont('helvetica', 'bold');
    doc.text('Address:', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(data.clientAddress || '—', margin + 90, y, { maxWidth: pageWidth / 2 - margin - 100 });

    doc.setFont('helvetica', 'bold');
    doc.text('Invoice No:', pageWidth / 2 + 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(data.invoiceNumber || '—', pageWidth / 2 + 70, y);
    y += 16;

    doc.setFont('helvetica', 'bold');
    doc.text('Tax ID:', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(data.customerTaxId || '—', margin + 90, y);

    doc.setFont('helvetica', 'bold');
    doc.text('Date:', pageWidth / 2 + 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(data.invoiceDate || '—', pageWidth / 2 + 70, y);

    y += 28;

    // --- Line Items Table ---
    const cols = [
        { label: 'HS Code', width: 50, align: 'center' as const },
        { label: 'Itemcode', width: 55, align: 'center' as const },
        { label: 'Description', width: 110, align: 'left' as const },
        { label: 'Batch No', width: 55, align: 'center' as const },
        { label: 'Exp Date', width: 50, align: 'center' as const },
        { label: 'Qty', width: 35, align: 'center' as const },
        { label: 'Rate', width: 50, align: 'right' as const },
        { label: 'Tax', width: 30, align: 'center' as const },
        { label: 'Disc%', width: 35, align: 'center' as const },
        { label: 'Amount', width: 55, align: 'right' as const },
    ];

    const tableWidth = cols.reduce((sum, c) => sum + c.width, 0);
    let x = margin;

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(250, 250, 250);
    doc.rect(margin, y - 10, tableWidth, 16, 'F');

    cols.forEach((col) => {
        const textX = col.align === 'right' ? x + col.width - 2 : col.align === 'center' ? x + col.width / 2 : x + 2;
        doc.text(col.label, textX, y, { align: col.align });
        x += col.width;
    });

    y += 8;
    doc.setDrawColor(100, 100, 100);
    doc.rect(margin, y - 18, tableWidth, 18);
    y += 10;

    doc.setFont('helvetica', 'normal');
    data.lineItems.forEach((item) => {
        if (y > 740) {
            doc.addPage();
            y = margin;
        }

        x = margin;
        const rowValues = [
            item.hsCode || '—',
            item.itemCode || '—',
            item.description || '—',
            item.batchNo || '—',
            item.expiryDate || '—',
            String(item.quantity),
            formatNumber(item.unitPrice),
            String(item.taxPercent ?? 0),
            formatNumber(item.discPercent ?? 0),
            formatNumber(calculatePharmacyLineTotal(item)),
        ];

        cols.forEach((col, i) => {
            const textX = col.align === 'right' ? x + col.width - 2 : col.align === 'center' ? x + col.width / 2 : x + 2;
            doc.text(rowValues[i], textX, y, { align: col.align, maxWidth: col.width - 2 });
            x += col.width;
        });

        doc.setDrawColor(200, 200, 200);
        doc.line(margin, y + 6, margin + tableWidth, y + 6);
        y += 20;
    });

    y += 16;

    // --- Totals ---
    const netTotal = calculatePharmacyNetTotal(data.lineItems);
    const labelX = pageWidth - margin - 140;
    const valueX = pageWidth - margin;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Net Total', labelX, y);
    doc.text(`Sh ${formatNumber(netTotal)}`, valueX, y, { align: 'right' });
    y += 14;

    doc.setFontSize(10);
    doc.text('Grand Total', labelX, y);
    doc.text(`Sh ${formatNumber(netTotal)}`, valueX, y, { align: 'right' });

    y += 32;

    // --- Fixed Terms ---
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    GLOBE_PHARMACY_TERMS.forEach((term, i) => {
        if (y > 740) {
            doc.addPage();
            y = margin;
        }
        const lines = doc.splitTextToSize(`${i + 1}. ${term}`, pageWidth / 2 - margin - 20);
        doc.text(lines, margin, y);
        y += lines.length * 10 + 4;
    });

    // --- Fixed Signature Block ---
    let sigY = y;
    const sigX = pageWidth / 2 + 20;
    const sigWidth = pageWidth - margin - sigX;

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice Prepared by:', sigX, sigY);
    doc.line(sigX + 90, sigY, sigX + sigWidth, sigY);
    sigY += 24;

    doc.text('Goods Checked by:', sigX, sigY);
    doc.line(sigX + 90, sigY, sigX + sigWidth, sigY);
    sigY += 24;

    doc.text('Goods received by:', sigX, sigY);
    doc.line(sigX + 90, sigY, sigX + sigWidth - 60, sigY);
    doc.text('Date:', sigX + sigWidth - 50, sigY);
    doc.line(sigX + sigWidth - 25, sigY, sigX + sigWidth, sigY);
    sigY += 24;

    if (data.paybill || data.accountNumber) {
        doc.setFont('helvetica', 'normal');
        if (data.paybill) {
            doc.text(`Lipa Na M-Pesa Pay Bill No: ${data.paybill}`, sigX, sigY);
            sigY += 14;
        }
        if (data.accountNumber) {
            doc.text(`Account number: ${data.accountNumber}`, sigX, sigY);
        }
    }

    const filename = `globe-pharmacy-invoice-${data.invoiceNumber || 'draft'}.pdf`;
    doc.save(filename);
}