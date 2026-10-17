'use client';

import { InvoiceData } from '@/lib/invoice/types';
import { calculatePharmacyLineTotal, calculatePharmacyNetTotal } from '@/lib/invoice/pharmacy-calculations';
import { formatNumber } from '@/lib/formatting';
import {
    GLOBE_PHARMACY_INFO,
    GLOBE_PHARMACY_TERMS,
    GLOBE_PHARMACY_LOGO_PATH,
} from '@/lib/invoice/globe-pharmacy-constants';
import styles from './PharmacyInvoicePreview.module.css';

interface PharmacyInvoicePreviewProps {
    data: InvoiceData;
}

export default function PharmacyInvoicePreview({ data }: PharmacyInvoicePreviewProps) {
    const netTotal = calculatePharmacyNetTotal(data.lineItems);

    return (
        <div className={styles.invoice}>
            {/* FIXED HEADER — not user-editable */}
            <div className={styles.header}>
                <img src={GLOBE_PHARMACY_LOGO_PATH} alt="Globe Pharmacy logo" className={styles.logo} />
                <div className={styles.headerText}>
                    <div className={styles.companyName}>{GLOBE_PHARMACY_INFO.name}</div>
                    <div className={styles.companySubtitle}>{GLOBE_PHARMACY_INFO.subtitle}</div>
                    <div className={styles.companyDetails}>
                        {GLOBE_PHARMACY_INFO.address.split('\n').map((line, i) => (
                            <span key={i}>{line}<br /></span>
                        ))}
                        {GLOBE_PHARMACY_INFO.phone}<br />
                        {GLOBE_PHARMACY_INFO.email}
                    </div>
                </div>
            </div>

            <div className={styles.invoiceTitle}>Sales Invoice</div>

            <div className={styles.information}>
                <div className={styles.infoCol}>
                    <div className={styles.infoLabel}>Customer Name</div>
                    <div>{data.clientName || '—'}</div>
                    <div className={styles.infoLabel}>Address</div>
                    <div>{data.clientAddress || '—'}</div>
                    <div className={styles.infoLabel}>Tax ID</div>
                    <div>{data.customerTaxId || '—'}</div>
                </div>
                <div className={styles.infoCol}>
                    <div className={styles.infoLabel}>PO No</div>
                    <div>{data.poNumber || '—'}</div>
                    <div className={styles.infoLabel}>Invoice No</div>
                    <div style={{ fontWeight: 600 }}>{data.invoiceNumber || '—'}</div>
                    <div className={styles.infoLabel}>Date</div>
                    <div>{data.invoiceDate || '—'}</div>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.itemsTable}>
                    <thead>
                    <tr>
                        <th>HS Code</th>
                        <th>Itemcode</th>
                        <th>Description</th>
                        <th>Batch No</th>
                        <th>Exp Date</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Tax</th>
                        <th>Disc%</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.lineItems.map((item) => (
                        <tr key={item.id}>
                            <td className={styles.center}>{item.hsCode || '—'}</td>
                            <td className={styles.center}>{item.itemCode || '—'}</td>
                            <td>{item.description || '—'}</td>
                            <td className={styles.center}>{item.batchNo || '—'}</td>
                            <td className={styles.center}>{item.expiryDate || '—'}</td>
                            <td className={styles.center}>{item.quantity}</td>
                            <td className={styles.right}>{formatNumber(item.unitPrice)}</td>
                            <td className={styles.center}>{item.taxPercent ?? 0}</td>
                            <td className={styles.center}>{formatNumber(item.discPercent ?? 0)}</td>
                            <td className={styles.right}>{formatNumber(calculatePharmacyLineTotal(item))}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.totals}>
                <div className={styles.totalRow}>
                    <span>Net Total</span>
                    <span>Sh {formatNumber(netTotal)}</span>
                </div>
                <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                    <span>Grand Total</span>
                    <span>Sh {formatNumber(netTotal)}</span>
                </div>
            </div>

            <div className={styles.bottomSection}>
                <div className={styles.terms}>
                    <ol>
                        {GLOBE_PHARMACY_TERMS.map((line, i) => (
                            <li key={i}>{line}</li>
                        ))}
                    </ol>
                </div>

                <div className={styles.signatures}>
                    <div className={styles.signatureRow}>
                        <span>Invoice Prepared by:</span>
                        <div className={styles.signatureLine} />
                    </div>
                    <div className={styles.signatureRow}>
                        <span>Goods Checked by:</span>
                        <div className={styles.signatureLine} />
                    </div>
                    <div className={styles.receivedRow}>
                        <strong>Goods received by:</strong>
                        <div className={styles.signatureLineSmall} />
                        <strong>Date:</strong>
                        <div className={styles.dateLine} />
                    </div>

                    {(data.paybill || data.accountNumber) && (
                        <div className={styles.payment}>
                            {data.paybill && <><strong>Lipa Na M-Pesa Pay Bill No:</strong> {data.paybill}<br /></>}
                            {data.accountNumber && <><strong>Account number:</strong> {data.accountNumber}</>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}