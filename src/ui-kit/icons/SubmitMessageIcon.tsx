import React, { CSSProperties, ReactElement } from 'react';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  style?: CSSProperties;
}

export default (props: IProps): ReactElement => {
  const { className, fill = '#DEE3E7', width = 32, height = 232, style } = props;

  return (
    <svg
      style={{ ...style, width, height }}
      width={width}
      height={height}
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="16" fill={fill} />
      <path
        d="M11.8047 15.4714L15.3333 11.9431V21.6667C15.3333 22.0347 15.632 22.3334 16 22.3334C16.368
        22.3334 16.6667 22.0347 16.6667 21.6667V11.9431L20.1953 15.4717C20.3253 15.6017 20.496 15.6667
        20.6667 15.6667C20.8373 15.6667 21.008 15.6017 21.138 15.4714C21.3983 15.2111 21.3983 14.7891
        21.138 14.5287L16.4713 9.86206C16.2113 9.60173 15.7887 9.60173 15.5287 9.86206L10.862 14.5287C10.6017
          14.7891 10.6017 15.2111 10.862 15.4714C11.122 15.7317 11.5447 15.7317 11.8047 15.4714Z"
        fill="white"
      />
    </svg>
  );
};
