import React, { ComponentType } from 'react';
import { FieldInputProps, FieldRenderProps } from 'react-final-form';

type IFieldHOCProps<T> = T & {
  helperText?: string;
  margin?: 'normal' | 'none';
};

function FieldHOC<T>(
  Field: ComponentType<IFieldHOCProps<T>>,
): React.FC<IFieldHOCProps<T> & FieldRenderProps<FieldInputProps<T>>> {
  return (props) => {
    const {
      input,
      // meta: { touched, error },
      helperText,
      margin,
      ...rest
    } = props;

    return (
      <Field
        {...(rest as T)}
        value={input.value}
        // checked={!!input.value}
        onChange={input.onChange}
        onBlur={input.onBlur}
        // error={touched && !!error}
      />
    );
  };
}

export default FieldHOC;
