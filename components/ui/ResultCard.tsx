import React from 'react';
import styles from './ResultCard.module.css';

interface ResultCardProps {
    title: string;
    value: string;
    subtext?: string;
    highlight?: boolean;
    className?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
                                                          title,
                                                          value,
                                                          subtext,
                                                          highlight = false,
                                                          className = '',
                                                      }) => {
    return (
        <div
            className={`
        ${styles.card}
        ${highlight ? styles.highlighted : ''}
        ${className}
      `.trim()}
        >
            <span className={styles.label}>{title}</span>
            <span className={styles.value}>{value}</span>
            {subtext && <span className={styles.subtext}>{subtext}</span>}
        </div>
    );
};