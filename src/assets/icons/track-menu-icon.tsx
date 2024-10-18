import { IconProps } from "@/types/iconProps";

const TrackMenuIcon: React.FC<IconProps> = ({
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
        d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm0-6a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm0 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"
        fill={fill}
      />
    </svg>
  );
};

export default TrackMenuIcon;
