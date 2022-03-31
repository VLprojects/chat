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
      <rect x="12.75" y="11.8999" width="113.05" height="18.7" rx="9.35" fill="white" />
      <rect x="12.75" y="34" width="113.05" height="18.7" rx="9.35" fill="white" />
      <rect x="12.75" y="56.1001" width="113.05" height="18.7" rx="9.35" fill="white" />
      <circle cx="111.349" cy="21.2498" r="7.08333" fill="#23BE33" />
      <path
        d="M110.101 24.0832C109.941 24.0832 109.781 24.0195 109.658 23.8918L107.992 22.1481C107.748 21.8927 107.748 21.479 107.992 21.2236C108.236 20.9681 108.631 20.9681 108.876 21.2236L110.1 22.5047L113.825 18.6081C114.069 18.3526 114.465 18.3526 114.709 18.6081C114.953 18.8635 114.953 19.2772 114.709 19.5327L110.542 23.8918C110.421 24.0195 110.261 24.0832 110.101 24.0832Z"
        fill="white"
      />
    </svg>
  );
};
