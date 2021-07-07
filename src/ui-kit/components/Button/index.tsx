import React, { FC, ReactNode } from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: 'contained' | 'text' | 'submit';
  size?: 'large' | 'medium' | 'small';
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  fullWidth = false,
  disabled = false,
  variant = 'text',
  size = 'medium',
  className,
}) => {
  const cn = [styles.button, className];

  if (fullWidth) {
    cn.push(styles.fullWidth);
  }

  if (variant) {
    cn.push(styles[variant]);
  }

  if (size) {
    cn.push(styles[size]);
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn.join(' ')}
    >
      {children}
    </button>
  );
};

export default Button;
