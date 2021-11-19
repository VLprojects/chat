import React, { CSSProperties, ReactElement } from 'react';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  style?: CSSProperties;
}

export default (props: IProps): ReactElement => {
  const { className, fill = '#A1B0BC', width = 16, height = 16, style } = props;

  return (
    <svg
      style={{ ...style, width, height }}
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0578 0.0769517C11.8847 0.074548 11.7044 0.16349
        11.5386 0.365413L7.63473 5.32695C5.97127 5.05772 4.38232 5.34859
        2.84627 6.88464L5.21165 9.25003L0.0385742 16L6.78857 10.827L9.15396
         13.1923C10.7092 11.6346 10.9905 10.0048 10.6924 8.32695H10.7117L15.654
         4.53849C16.0602 4.21397 16.0025 3.77407 15.7117 3.4808L12.5386
         0.307721C12.404 0.173106 12.2309 0.0793554 12.0578 0.0769517Z"
        fill={fill}
      />
    </svg>
  );
};
