import React, { FC } from 'react';

interface IImage {
  src: string;
  alt: string;
}

const Image: FC<IImage> = (props) => {
  const { src, alt } = props;
  return (
    <img src={src} alt={alt} />
  );
};

export default Image;
