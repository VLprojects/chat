import React, { CSSProperties, ReactElement } from 'react';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  style?: CSSProperties;
}

export default (props: IProps): ReactElement => {
  const { className, fill = '#000', width = 16, height = 18, style } = props;

  return (
    <svg
      style={{ ...style, width, height }}
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.0257921 0.660726C-0.11223 0.228766 0.330535 -0.155041 0.715904
        0.0630638L15.748 8.56064C16.0842 8.75042 16.0835 9.24965 15.7487
        9.43943L0.716587 17.937C0.331217 18.1551 -0.11223 17.7706 0.0264753
        17.3393L2.70903 9.00039L0.0257921 0.660726ZM1.33154 1.55085L13.6217
        8.49974L3.56586 8.49903L1.33154 1.55085ZM1.33154 16.4485L3.56586
        9.50033L13.6217 9.50104L1.33154 16.4485Z"
        fill={fill}
      />
    </svg>
  );
};
