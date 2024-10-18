import React from "react";
import type { IconProps } from "@/types/iconProps";

const GridIcon: React.FC<IconProps> = ({
  size = 24,
  fill = "none",
  strokeWidth = 2,
  stroke = "currentColor",
  ...props
}) => {
  return (
    <svg
      fill={fill}
      width={size}
      height={size}
      stroke={stroke}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    </svg>
  );
};

export default GridIcon;
