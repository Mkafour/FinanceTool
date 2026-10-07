import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  variant = 'primary',
                                                  fullWidth = false,
                                                  className = '',
                                                  ...props
                                              }) => {
    return (
        <button
            className={`
        ${styles.button}
        ${styles[variant]}
        ${fullWidth ? styles.fullWidth : ''}
        ${className}
      `.trim()}
            {...props}
        >
            {children}
        </button>
    );
};