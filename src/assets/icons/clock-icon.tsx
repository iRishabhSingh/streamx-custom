import { IconProps } from "@/types/iconProps";

const ClockIcon: React.FC<IconProps> = ({
  size = 24,
  stroke = "none",
  strokeWidth = 2,
  fill = "currentColor",
  ...props
}) => {
  return (
    <svg
      fill={fill}
      width={size}
      height={size}
      stroke={stroke}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity="0.4"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        fill={fill}
      />
      <path
        d="M15.7106 15.93C15.5806 15.93 15.4506 15.9 15.3306 15.82L12.2306 13.97C11.4606 13.51 10.8906 12.5 10.8906 11.61V7.51001C10.8906 7.10001 11.2306 6.76001 11.6406 6.76001C12.0506 6.76001 12.3906 7.10001 12.3906 7.51001V11.61C12.3906 11.97 12.6906 12.5 13.0006 12.68L16.1006 14.53C16.4606 14.74 16.5706 15.2 16.3606 15.56C16.2106 15.8 15.9606 15.93 15.7106 15.93Z"
        fill={fill}
      />
    </svg>
  );
};

export default ClockIcon;
