import { useRef, useEffect } from "react";

import {
  HeartIcon,
  AudioIcon,
  VideoIcon,
  ClockIcon,
  CalendarIcon,
  FileIcon,
  StorageIcon,
  LoopIcon,
  SkipIcon,
  CloseIcon,
} from "@/assets";
import {
  formatDuration,
  formatFileSize,
  formatRelativeTime,
} from "@/utils/formatUtils";
import { Track } from "@/types/mediaTypes";

interface TrackDetailsPopupProps {
  track: Track;
  onClose: () => void;
}

const TrackDetailsPopup: React.FC<TrackDetailsPopupProps> = ({
  track,
  onClose,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const {
    name,
    type,
    size,
    durationInSeconds,
    addedOn,
    isMarkedAsFavorite,
    isLoopEnabled,
    shouldSkip,
  } = track;

  // Close popup when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Popup content */}
      <div
        ref={popupRef}
        className="relative w-[22rem] max-w-full rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-900"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-[-1rem] top-[-1rem] rounded-full bg-neutral-100 p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-neutral-800 dark:focus-visible:ring-offset-neutral-900"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {/* Track Details in Table Format */}
        <div className="overflow-hidden rounded-xl border-2 shadow-md">
          <table className="min-w-full table-auto">
            <tbody className="divide-y-2">
              {/* Type */}
              <tr>
                <td className="flex items-center gap-2 whitespace-nowrap px-6 py-4">
                  {type === "audio" ? <AudioIcon /> : <VideoIcon />}
                  <span className="font-medium">Type</span>
                </td>
                <td className="px-6 py-4 text-start text-sm text-gray-700 dark:text-gray-300">
                  <span className="capitalize">{type}</span> file
                </td>
              </tr>

              {/* Duration */}
              <tr>
                <td className="flex items-center gap-2 whitespace-nowrap px-6 py-4">
                  <ClockIcon />
                  <span className="font-medium">Duration</span>
                </td>
                <td className="px-6 py-4 text-start text-sm text-gray-700 dark:text-gray-300">
                  {formatDuration(durationInSeconds)}
                </td>
              </tr>

              {/* Size */}
              <tr>
                <td className="flex items-center gap-2 whitespace-nowrap px-6 py-4">
                  <StorageIcon />
                  <span className="font-medium">Size</span>
                </td>
                <td className="px-6 py-4 text-start text-sm text-gray-700 dark:text-gray-300">
                  {formatFileSize(size)}
                </td>
              </tr>

              {/* Format */}
              <tr>
                <td className="flex items-center gap-2 whitespace-nowrap px-6 py-4">
                  <FileIcon />
                  <span className="font-medium">Format</span>
                </td>
                <td className="px-6 py-4 text-start text-sm text-gray-700 dark:text-gray-300">
                  <span className="rounded bg-gray-700/30 px-2 py-1 uppercase dark:bg-gray-200/30">
                    {name.substring(name.lastIndexOf(".") + 1)}
                  </span>
                </td>
              </tr>

              {/* Added On */}
              <tr>
                <td className="flex items-center gap-2 whitespace-nowrap px-6 py-4">
                  <CalendarIcon />
                  <span className="font-medium">Added</span>
                </td>
                <td className="px-6 py-4 text-start text-sm text-gray-700 dark:text-gray-300">
                  {formatRelativeTime(new Date(addedOn))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Header Section */}
        {(isMarkedAsFavorite || isLoopEnabled || shouldSkip) && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {/* Heart icon to show if liked */}
            {isMarkedAsFavorite && (
              <HeartIcon variant="filled" className="text-red-500" />
            )}

            {/* Loop icon */}
            {isLoopEnabled && (
              <span className="rounded-full bg-neutral-200 p-2 dark:bg-neutral-800">
                <LoopIcon />
              </span>
            )}

            {/* Skip icon */}
            {shouldSkip && <SkipIcon variant="filled" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackDetailsPopup;
