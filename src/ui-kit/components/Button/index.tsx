import cls from 'classnames';
import React, { FC, ReactNode } from 'react';
import useStyles from './styles';

interface ButtonProps {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: 'contained' | 'text' | 'submit' | 'outlined' | 'flatTransparent';
  size?: 'large' | 'medium' | 'small';
  className?: string;
  [prop: string]: unknown;
}

const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    onClick,
    fullWidth = false,
    disabled = false,
    variant = 'text',
    size = 'medium',
    className,
    ...other
  } = props;
  const classes = useStyles();

  const classList = cls(classes.button, className, classes[variant], classes[size], { [classes.fullWidth]: fullWidth });

  return (
    <button type="button" disabled={disabled} onClick={onClick} className={classList} {...other}>
      {children}
    </button>
  );
};

export default Button;
