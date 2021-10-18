import React, { CSSProperties, ReactElement } from 'react';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  style?: CSSProperties;
}

export default (props: IProps): ReactElement => {
  const { className, fill = '#333333', width = 8, height = 16, style } = props;

  return (
    <>
      <svg
        style={{ ...style, width, height }}
        width={width}
        height={height}
        className={className}
        viewBox="0 0 8 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.75924 14.3492C8.11866 14.7685 8.0701 15.3998 7.65077
        15.7592C7.23145 16.1187 6.60015 16.0701 6.24073 15.6508L0.240743 8.65079C-0.0802476 8.2763
        -0.0802476 7.7237 0.240743 7.34921L6.24073 0.349226C6.60015 -0.0700989 7.23145 -0.11866 7.65077
        0.240761C8.0701 0.600182 8.11866 1.23148 7.75924 1.65081L2.31707 8L7.75924 14.3492Z"
          fill={fill}
        />
      </svg>
    </>
  );
};
