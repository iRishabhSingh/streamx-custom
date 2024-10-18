// Utility function to truncate track name
export const truncateTrackName = (name: string): string => {
  const extensionIndex = name.lastIndexOf(".");
  const baseName =
    extensionIndex !== -1 ? name.substring(0, extensionIndex) : name;

  return baseName.length > 30 ? baseName.substring(0, 17) + "..." : baseName;
};

// Helper function to format time units with pluralization
const formatTimeUnit = (value: number, unit: string): string => {
  return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
};

// Format duration into hours, minutes, and seconds
export const formatDuration = (durationInSeconds: number): string => {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  return [
    hours > 0 ? `${hours}` : null,
    `${minutes < 10 && hours > 0 ? "0" : ""}${minutes}`,
    `${seconds < 10 ? "0" : ""}${seconds}`,
  ]
    .filter(Boolean)
    .join(":");
};

// Format relative time to display human-readable time difference
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return formatTimeUnit(diffInSeconds, "second");

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return formatTimeUnit(diffInMinutes, "minute");

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return formatTimeUnit(diffInHours, "hour");

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return formatTimeUnit(diffInDays, "day");

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return formatTimeUnit(diffInWeeks, "week");

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return formatTimeUnit(diffInMonths, "month");

  const diffInYears = Math.floor(diffInDays / 365);
  return formatTimeUnit(diffInYears, "year");
};

// Utility function to convert file size to human-readable format
export const formatFileSize = (sizeInBytes: number): string => {
  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  if (sizeInBytes === 0) return "0 Bytes";

  const unitIndex = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
  const sizeInUnit = sizeInBytes / Math.pow(1024, unitIndex);

  return `${sizeInUnit.toFixed(2)} ${units[unitIndex]}`;
};
