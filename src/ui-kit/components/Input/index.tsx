import cls from 'classnames';
import React, { KeyboardEvent, SyntheticEvent } from 'react';
import useStyles from './styles';

interface IProps {
  placeholder?: string;
  onChange?: (v: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  value?: string;
  id?: string;
  variant?: 'text' | 'outlined';
  size?: 'medium' | 'large';
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
  const classes = useStyles();
  const classList = cls(classes.input, className, classes[variant], classes[size], { [classes.fullWidth]: fullWidth });

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
      className={classList}
      placeholder={placeholder}
      onChange={changeHandler}
      onKeyDown={keyDownHandler}
      value={value}
    />
  );
};

export default Input;
