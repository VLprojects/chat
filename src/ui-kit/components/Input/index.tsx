import React, { KeyboardEvent, SyntheticEvent } from 'react';
import styles from './Input.module.scss';

interface IProps {
  placeholder?: string;
  onChange?: (v: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  value?: string;
  id?: string;
  variant?: 'contained' | 'text' | 'outlined';
  size?: 'large' | 'medium' | 'small';
  fullWidth?: boolean;
}

const Input: React.FC<IProps> = (props) => {
  const {
    placeholder,
    onChange,
    className,
    type,
    value = '',
    id = '',
    onKeyDown,
    variant = 'text',
    size = 'medium',
    fullWidth = false,
  } = props;

  const cn = [styles.input, className];

  if (fullWidth) {
    cn.push(styles.fullWidth);
  }

  if (variant) {
    cn.push(styles[variant]);
  }

  if (size) {
    cn.push(styles[size]);
  }

  const changeHandler = (e: SyntheticEvent<HTMLInputElement> & { target: HTMLInputElement }) => {
    if (onChange) onChange(e.target.value);
  };

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) onKeyDown(e);
  };

  return (
    <input
      id={id}
      type={type}
      className={cn.join(' ')}
      placeholder={placeholder}
      onChange={changeHandler}
      onKeyDown={keyDownHandler}
      value={value}
    />
  );
};

export default Input;
