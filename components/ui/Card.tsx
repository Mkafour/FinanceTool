import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    className?: string;
}

export const Card: React.FC<CardProps> = ({
                                              children,
                                              title,
                                              description,
                                              className = '',
                                          }) => {
    return (
        <div className={`${styles.card} ${className}`.trim()}>
            {(title || description) && (
                <div className={styles.cardHeader}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                    {description && <p className={styles.description}>{description}</p>}
                </div>
            )}
            {children}
        </div>
    );
};