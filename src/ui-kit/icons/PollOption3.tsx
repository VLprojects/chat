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
      <rect x="13" y="39" width="113" height="19" rx="4" fill="white" />
      <g opacity="0.4">
        <path d="M21 45H21.8814V51.9209H21V45Z" fill="#060A2D" />
        <path
          d="M25.1871 46.9774H26.031V45.5932H26.8749V46.9774H28.0939V47.7881H26.8749V50.3686C26.8749 50.863 27.0937 51.1102 27.5313 51.1102H28.1876V51.9209H27.4094C26.9655 51.9209 26.6248 51.7957 26.3873 51.5452C26.1497 51.2947 26.031 50.9355 26.031 50.4675V47.7881H25.1871V46.9774Z"
          fill="#060A2D"
        />
        <path
          d="M29.1286 45H29.9725V47.5607C30.1288 47.3498 30.3257 47.1883 30.5633 47.0763C30.8008 46.9576 31.0728 46.8983 31.3791 46.8983C31.9229 46.8983 32.3543 47.0796 32.6731 47.4421C32.9981 47.798 33.1607 48.3187 33.1607 49.0042V51.9209H32.3167V49.0042C32.3167 48.5824 32.223 48.2693 32.0354 48.065C31.8479 47.854 31.5822 47.7486 31.2384 47.7486C30.8571 47.7486 30.5539 47.8606 30.3289 48.0847C30.1038 48.3089 29.985 48.5989 29.9725 48.9548V51.9209H29.1286V45Z"
          fill="#060A2D"
        />
        <path
          d="M34.5971 46.9774H35.4411V51.9209H34.5971V46.9774ZM35.0191 46.226C34.8566 46.226 34.7222 46.17 34.6159 46.0579C34.5096 45.9459 34.4565 45.8041 34.4565 45.6328C34.4565 45.4614 34.5096 45.3197 34.6159 45.2076C34.7222 45.0956 34.8566 45.0395 35.0191 45.0395C35.1816 45.0395 35.316 45.0956 35.4223 45.2076C35.5286 45.3197 35.5817 45.4614 35.5817 45.6328C35.5817 45.8041 35.5286 45.9459 35.4223 46.0579C35.316 46.17 35.1816 46.226 35.0191 46.226Z"
          fill="#060A2D"
        />
        <path
          d="M36.9213 46.9774H37.5777L37.6621 47.6596C37.8246 47.4157 38.034 47.2279 38.2903 47.096C38.5466 46.9642 38.8404 46.8983 39.1717 46.8983C39.7156 46.8983 40.1469 47.0796 40.4657 47.4421C40.7908 47.798 40.9533 48.3187 40.9533 49.0042V51.9209H40.1094V49.0042C40.1094 48.5824 40.0156 48.2693 39.8281 48.065C39.6406 47.854 39.3749 47.7486 39.0311 47.7486C38.6497 47.7486 38.3466 47.8606 38.1215 48.0847C37.8965 48.3089 37.7777 48.5989 37.7652 48.9548V51.9209H36.9213V46.9774Z"
          fill="#060A2D"
        />
        <path
          d="M43.8901 49.7952L43.1587 50.7443V51.9209H42.3148V45H43.1587V49.5184L45.0528 46.9774H46.0655L44.4433 49.1427L46.2531 51.9209H45.2216L43.8901 49.7952Z"
          fill="#060A2D"
        />
        <path
          d="M47.6552 52C47.4614 52 47.302 51.9341 47.177 51.8023C47.0582 51.6638 46.9988 51.4991 46.9988 51.3079C46.9988 51.1168 47.0582 50.9553 47.177 50.8234C47.302 50.685 47.4614 50.6158 47.6552 50.6158C47.849 50.6158 48.0053 50.685 48.124 50.8234C48.2491 50.9553 48.3116 51.1168 48.3116 51.3079C48.3116 51.4991 48.2491 51.6638 48.124 51.8023C48.0053 51.9341 47.849 52 47.6552 52Z"
          fill="#060A2D"
        />
        <path
          d="M49.9994 52C49.8056 52 49.6462 51.9341 49.5212 51.8023C49.4024 51.6638 49.343 51.4991 49.343 51.3079C49.343 51.1168 49.4024 50.9553 49.5212 50.8234C49.6462 50.685 49.8056 50.6158 49.9994 50.6158C50.1932 50.6158 50.3495 50.685 50.4683 50.8234C50.5933 50.9553 50.6558 51.1168 50.6558 51.3079C50.6558 51.4991 50.5933 51.6638 50.4683 51.8023C50.3495 51.9341 50.1932 52 49.9994 52Z"
          fill="#060A2D"
        />
        <path
          d="M52.3436 52C52.1498 52 51.9904 51.9341 51.8654 51.8023C51.7466 51.6638 51.6872 51.4991 51.6872 51.3079C51.6872 51.1168 51.7466 50.9553 51.8654 50.8234C51.9904 50.685 52.1498 50.6158 52.3436 50.6158C52.5374 50.6158 52.6937 50.685 52.8125 50.8234C52.9375 50.9553 53 51.1168 53 51.3079C53 51.4991 52.9375 51.6638 52.8125 51.8023C52.6937 51.9341 52.5374 52 52.3436 52Z"
          fill="#060A2D"
        />
      </g>
    </svg>
  );
};
