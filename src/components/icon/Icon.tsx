import { IconNames, Icons } from "./icons";

interface IconProperties {
  size: number;
  viewBox: string;
  name: IconNames;
  color?: string;
}

export default function Icon({ size, viewBox, name, color }: IconProperties) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {
        // @ts-ignore
        Icons[name](color)
      }
    </svg>
  );
}
