import React, { CSSProperties, ReactElement } from 'react';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  style?: CSSProperties;
}

export default (props: IProps): ReactElement => {
  const { className, width = 20, height = 20, style } = props;

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
        d="M6.56836 6.56795C7.64267 6.04401 8.8497 5.75 10.1254 5.75C12.5988 5.75 14.814 6.85517 16.3043 8.59864L17.4839 7.28103C17.7084 7.03029 18.0936 7.00901 18.3444 7.2335C18.5951 7.45798 18.6164 7.84323 18.3919 8.09397L17.0392 9.6049C17.8071 10.8457 18.2504 12.3086 18.2504 13.875C18.2504 15.1507 17.9564 16.3577 17.4325 17.432C20.137 16.113 22.0004 13.3366 22.0004 10.125C22.0004 5.63769 18.3627 2 13.8754 2C10.6638 2 7.8874 3.86336 6.56836 6.56795Z"
        fill="#2D264B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 22C13.6421 22 17 18.6421 17 14.5C17 10.3579 13.6421 7 9.5 7C5.35786 7 2 10.3579 2 14.5C2 18.6421 5.35786 22 9.5 22ZM13.6691 12.6252C13.8763 12.3938 13.8567 12.0381 13.6252 11.8309C13.3938 11.6237 13.0381 11.6433 12.8309 11.8748L10.304 14.6972C9.79202 15.2691 9.4472 15.6522 9.15239 15.9C8.87155 16.136 8.7066 16.1875 8.5625 16.1875C8.4184 16.1875 8.25345 16.136 7.97261 15.9C7.6778 15.6522 7.33298 15.2691 6.82096 14.6972L6.16908 13.9691C5.96186 13.7376 5.60625 13.718 5.3748 13.9252C5.14334 14.1324 5.1237 14.488 5.33092 14.7195L6.01065 15.4787C6.48754 16.0114 6.88531 16.4557 7.24876 16.7612C7.63324 17.0844 8.04794 17.3125 8.5625 17.3125C9.07705 17.3125 9.49176 17.0844 9.87624 16.7612C10.2397 16.4557 10.6375 16.0114 11.1143 15.4787L13.6691 12.6252Z"
        fill="#2D264B"
      />
    </svg>
  );
};