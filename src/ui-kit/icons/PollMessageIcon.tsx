import React, { CSSProperties, ReactElement } from 'react';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  style?: CSSProperties;
}

export default (props: IProps): ReactElement => {
  const { className, fill = '#060A2D', width = 12, height = 12, style } = props;

  return (
    <svg
      style={{ ...style, width, height }}
      width={width}
      height={height}
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.38462 0C0.623798 0 0 0.603664 0 1.33992V8.48619C0 9.22245 0.623798 9.82611 1.38462 9.82611H5.85937L9.23077 12V9.82611H10.6154C11.3762 9.82611 12 9.22245 12 8.48619V1.33992C12 0.603664 11.3762 0 10.6154 0H1.38462ZM1.38462 0.893283H10.6154C10.875 0.893283 11.0769 1.08869 11.0769 1.33992V8.48619C11.0769 8.73742 10.875 8.93283 10.6154 8.93283H8.30769V10.3321L6.14063 8.93283H1.38462C1.125 8.93283 0.923077 8.73742 0.923077 8.48619V1.33992C0.923077 1.08869 1.125 0.893283 1.38462 0.893283ZM2.76923 2.67985V3.57313H9.23077V2.67985H2.76923ZM2.76923 4.46641V5.3597H9.23077V4.46641H2.76923ZM2.76923 6.25298V7.14626H6.46154V6.25298H2.76923Z"
        fill={fill}
      />
    </svg>
  );
};
