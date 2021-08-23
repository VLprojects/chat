import cls from 'classnames';
import React, { FC, ReactNode } from 'react';
import useStyles from './styles';

interface ButtonProps {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: 'contained' | 'text' | 'submit' | 'outlined';
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
  const classes = useStyles();

  const classList = cls(classes.button, className, classes[variant], classes[size], { [classes.fullWidth]: fullWidth });

  return (
    <button type="button" disabled={disabled} onClick={onClick} className={classList}>
      {children}
    </button>
  );
};

export default Button;
