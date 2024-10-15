import React from "react";
import type { IconProps } from "@/types/iconProps";

const UploadIcon: React.FC<IconProps> = ({
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
      <path stroke="none" d="M0 0h24v24H0z" fill={fill} />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
      <path d="M7 9l5 -5l5 5" />
      <path d="M12 4v12" />
    </svg>
  );
};

export default UploadIcon;
