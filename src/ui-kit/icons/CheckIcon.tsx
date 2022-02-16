import React, { CSSProperties, ReactElement } from 'react';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  style?: CSSProperties;
}

export default (props: IProps): ReactElement => {
  const { className, fill = '#2D264B', width = 20, height = 20, style } = props;

  return (
    <svg
      style={{ ...style, width, height }}
      width={width}
      height={height}
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM15.5588 7.50027C15.8351 7.19167 15.8089 6.71752 15.5003 6.44123C15.1917 6.16493 14.7175 6.19113 14.4412 6.49973L11.0721 10.2629C10.3894 11.0254 9.9296 11.5363 9.53652 11.8667C9.16207 12.1814 8.94213 12.25 8.75 12.25C8.55787 12.25 8.33794 12.1814 7.96348 11.8667C7.5704 11.5363 7.11064 11.0254 6.42794 10.2629L5.55877 9.29209C5.28248 8.98349 4.80833 8.9573 4.49973 9.23359C4.19113 9.50988 4.16493 9.98403 4.44123 10.2926L5.34753 11.3049C5.98338 12.0152 6.51374 12.6076 6.99835 13.0149C7.51099 13.4458 8.06393 13.75 8.75 13.75C9.43607 13.75 9.98901 13.4458 10.5016 13.0149C10.9863 12.6076 11.5166 12.0152 12.1525 11.3049L15.5588 7.50027Z"
        fill="#2D264B"
      />
    </svg>
  );
};
