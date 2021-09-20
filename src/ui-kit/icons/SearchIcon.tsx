import React, { CSSProperties } from 'react';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  style?: CSSProperties;
}

export default (props: IProps) => {
  const { className, fill = '#fff', width = 24, height = 24, style } = props;

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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.8536 20.1464L16.9994 16.2923C18.2445 14.882 19 13.0292 19 11C19
            6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.0292 19
            14.882 18.2445 16.2923 16.9994L20.1464 20.8536C20.3417 21.0488 20.6583 21.0488 20.8536
            20.8536C21.0488 20.6583 21.0488 20.3417 20.8536 20.1464ZM17.9997 11.0004C17.9997
            14.8664 14.8657 18.0004 10.9997 18.0004C7.13368 18.0004 3.99967 14.8664 3.99967
            11.0004C3.99967 7.13439 7.13368 4.00038 10.9997 4.00038C14.8657 4.00038 17.9997 7.13439 17.9997 11.0004Z"
        fill={fill}
      />
    </svg>
  );
};
