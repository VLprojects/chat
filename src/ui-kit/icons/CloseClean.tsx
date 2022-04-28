import React, { CSSProperties, ReactElement } from 'react';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  style?: CSSProperties;
}

export default (props: IProps): ReactElement => {
  const { className, fill = '#D2D2E4', width = 12, height = 12, style } = props;

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
        d="M1.33403 0.000578098C1.06975 0.000905507 0.811563 0.0800467 0.592456 0.227892C0.373349 0.375737 0.203268 0.585574 0.10394 0.830597C0.00461216 1.07562 -0.0194532 1.3447 0.0348181 1.60348C0.0890895 1.86225 0.219234 2.09896 0.408626 2.28338L4.12063 5.99715L0.408626 9.71092C0.281072 9.83344 0.179237 9.9802 0.109083 10.1426C0.0389292 10.305 0.00186758 10.4797 6.87814e-05 10.6566C-0.00173002 10.8335 0.0317702 11.009 0.0986071 11.1728C0.165444 11.3366 0.264274 11.4854 0.38931 11.6105C0.514346 11.7356 0.663073 11.8345 0.826782 11.9013C0.990491 11.9682 1.16589 12.0017 1.34271 11.9999C1.51953 11.9981 1.69421 11.961 1.85652 11.8909C2.01884 11.8207 2.16552 11.7188 2.28799 11.5912L6 7.8774L9.712 11.5912C9.83447 11.7188 9.98115 11.8207 10.1435 11.8909C10.3058 11.9611 10.4805 11.9981 10.6573 11.9999C10.8341 12.0017 11.0095 11.9682 11.1732 11.9013C11.3369 11.8345 11.4857 11.7356 11.6107 11.6105C11.7357 11.4854 11.8346 11.3366 11.9014 11.1728C11.9682 11.009 12.0017 10.8336 11.9999 10.6566C11.9981 10.4797 11.9611 10.305 11.8909 10.1426C11.8208 9.9802 11.7189 9.83344 11.5914 9.71092L7.87936 5.99715L11.5914 2.28338C11.7834 2.09661 11.9146 1.85615 11.9677 1.59351C12.0208 1.33087 11.9934 1.0583 11.889 0.811532C11.7846 0.564762 11.6081 0.355297 11.3827 0.210589C11.1573 0.0658805 10.8934 -0.00732073 10.6257 0.000578098C10.2804 0.0108714 9.95272 0.155247 9.712 0.403119L6 4.11689L2.28799 0.403119C2.16398 0.275586 2.01566 0.174247 1.8518 0.105102C1.68793 0.0359579 1.51187 0.000414782 1.33403 0.000578098Z"
        fill={fill}
      />
    </svg>
  );
};
