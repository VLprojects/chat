import React, { CSSProperties, ReactElement } from 'react';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  style?: CSSProperties;
}

export default (props: IProps): ReactElement => {
  const { className, fill = '', width = 136, height = 90, style } = props;

  return (
    <svg
      style={{ ...style, width, height }}
      width={width}
      height={height}
      className={className}
      viewBox="0 0 136 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="134" height="88" rx="10" fill="#A4ADFF" stroke={fill} strokeWidth="2" />
      <rect x="12.75" y="11.9004" width="113.05" height="18.7" rx="9.35" fill="white" />
      <circle cx="110.499" cy="21.2503" r="7.08333" fill="#163498" />
      <path
        d="M109.251 24.0837C109.091 24.0837 108.931 24.02 108.809 23.8923L107.142 22.1486C106.898 21.8932 106.898 21.4795 107.142 21.2241C107.386 20.9686 107.782 20.9686 108.026 21.2241L109.251 22.5052L112.975 18.6086C113.22 18.3531 113.615 18.3531 113.859 18.6086C114.103 18.864 114.103 19.2777 113.859 19.5332L109.692 23.8923C109.571 24.02 109.411 24.0837 109.251 24.0837Z"
        fill="white"
      />
      <rect x="12.75" y="34" width="113.05" height="18.7" rx="9.35" fill="white" />
      <rect x="12.75" y="56.0996" width="113.05" height="18.7" rx="9.35" fill="white" />
      <circle cx="110.499" cy="43.3499" r="7.08333" fill="#163498" />
      <path
        d="M109.251 46.1833C109.091 46.1833 108.931 46.1196 108.809 45.9919L107.142 44.2482C106.898 43.9928 106.898 43.5791 107.142 43.3237C107.386 43.0682 107.782 43.0682 108.026 43.3237L109.251 44.6048L112.975 40.7082C113.22 40.4527 113.615 40.4527 113.859 40.7082C114.103 40.9636 114.103 41.3773 113.859 41.6328L109.692 45.9919C109.571 46.1196 109.411 46.1833 109.251 46.1833Z"
        fill="white"
      />
    </svg>
  );
};
