interface Props {
  fill: string;
  width?: string | number;
  height?: string | number;
}
function Star({ fill, height, width }: Props) {
  return (
    <svg
      width={width ? width : 16}
      height={height ? height : 16}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 9.87 9.39"
      fill={fill ? fill : 'none'}
      stroke="black"
      strokeWidth="0.5"
    >
      <polygon points="4.94 0.56 6.3 3.32 9.34 3.76 7.14 5.91 7.66 8.93 4.94 7.5 2.22 8.93 2.74 5.91 0.54 3.76 3.58 3.32 4.94 0.56" />
    </svg>
  );
}

export default Star;
