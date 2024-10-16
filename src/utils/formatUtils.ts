// Utility function to truncate track name
export const truncateTrackName = (name: string): string => {
  const extensionIndex = name.lastIndexOf(".");
  const baseName =
    extensionIndex !== -1 ? name.substring(0, extensionIndex) : name;

  return baseName.length > 30 ? baseName.substring(0, 17) + "..." : baseName;
};
