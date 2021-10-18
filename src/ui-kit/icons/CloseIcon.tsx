import React, { CSSProperties, ReactElement } from 'react';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  style?: CSSProperties;
}

export default (props: IProps): ReactElement => {
  const { className, fill = '#333333', width = 24, height = 24, style } = props;

  return (
    <svg
      style={{ ...style, width, height }}
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.3399 2C19.7299 2 21.9999 4.38 21.9999 7.92V16.091C21.9999 19.621 19.7299 22 16.3399
        22H7.66988C4.27988 22 1.99988 19.621 1.99988 16.091V7.92C1.99988 4.38 4.27988 2 7.66988
        2H16.3399ZM15.0099 8.971C14.6699 8.63 14.1199 8.63 13.7699 8.971L11.9999 10.75L10.2199
        8.971C9.86988 8.63 9.31988 8.63 8.97988 8.971C8.63988 9.311 8.63988 9.871 8.97988 10.21L10.7599
        11.991L8.97988 13.761C8.63988 14.111 8.63988 14.661 8.97988 15C9.14988 15.17 9.37988 15.261 9.59988
        15.261C9.82988 15.261 10.0499 15.17 10.2199 15L11.9999 13.231L13.7799 15C13.9499 15.181 14.1699
        15.261 14.3899 15.261C14.6199 15.261 14.8399 15.17 15.0099 15C15.3499 14.661 15.3499 14.111
        15.0099 13.771L13.2299 11.991L15.0099 10.21C15.3499 9.871 15.3499 9.311 15.0099 8.971Z"
        fill={fill}
      />
    </svg>
  );
};
