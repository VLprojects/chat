import InputUnstyled, { InputUnstyledProps } from '@mui/base/InputUnstyled';
import InputAdornment from '@mui/material/InputAdornment';
import React, { FocusEvent, KeyboardEvent, SyntheticEvent, useMemo, useState } from 'react';
import { COLOURS } from 'theme/consts';

import { StyledInputElement, StyledTextareaElement } from './StyledInput';

interface IProps extends Omit<InputUnstyledProps, 'onChange'> {
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
  rightIcon?: React.ReactNode;
  inputProps?: Record<string, string | number>;
  errorText?: React.ReactNode | string;
}

const CustomInput = React.forwardRef(function CustomInput(props: IProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const {
    onChange,
    rightIcon = null,
    fullWidth,
    inputProps,
    disabled,
    onFocus,
    onBlur,
    error,
    errorText,
    ...rest
  } = props;
  const [focused, setFocused] = useState(false);
  const endAdornment = rightIcon && <InputAdornment position="end">{rightIcon}</InputAdornment>;

  const changeHandler = (e: SyntheticEvent<HTMLInputElement> & { target: HTMLInputElement }) => {
    onChange && onChange(e.target.value);
  };
  const onFocusHandler = (e: FocusEvent<HTMLDivElement>) => {
    switch (e.type) {
      case 'focus':
        setFocused(true);
        onFocus && onFocus(e);
        break;
      case 'blur':
        setFocused(false);
        onBlur && onBlur(e);
        break;
      default:
        break;
    }
  };

  const padding = props.multiline ? '12px 16px' : '14px 16px';

  const borderColor = useMemo(() => {
    if (error) return COLOURS.ERROR;
    return focused ? COLOURS.ACTIVE : COLOURS.LIGHT_01;
  }, [focused]);

  return (
    <InputUnstyled
      style={{
        padding,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: `1px solid ${borderColor}`,
        borderRadius: '10px',
        ...(fullWidth && { width: '100%' }),
        background: disabled ? COLOURS.LIGHT_01 : 'inherit',
      }}
      components={{ Input: StyledInputElement, Textarea: StyledTextareaElement }}
      // @ts-ignore
      componentsProps={{ input: { ...inputProps, error } }}
      onChange={changeHandler}
      onFocus={onFocusHandler}
      onBlur={onFocusHandler}
      endAdornment={endAdornment}
      disabled={disabled}
      {...rest}
      ref={ref}
    />
  );
});

export default CustomInput;
