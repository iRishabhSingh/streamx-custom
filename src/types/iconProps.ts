export interface IconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  fill?: string;
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  variant?: "outlined" | "filled";
}
