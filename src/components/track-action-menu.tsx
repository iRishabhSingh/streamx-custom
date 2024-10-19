import { useState } from "react";

import type { Track } from "@/types/mediaTypes";
import TrackDetailsPopup from "@/components/track-details-popup";
import { HeartIcon, LoopIcon, SkipIcon, RemoveIcon, InfoIcon } from "@/assets";

const TrackActionsMenu: React.FC<{ track: Track }> = ({ track }) => {
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);

  const toggleDetailsPopup = () => setIsDetailsPopupOpen((prev) => !prev);

  const { isMarkedAsFavorite, isLoopEnabled, shouldSkip } = track;

  const actions = [
    {
      label: isMarkedAsFavorite ? "Unlike" : "Like",
      icon: (
        <HeartIcon
          size={20}
          variant={isMarkedAsFavorite ? "filled" : "outlined"}
          fill={isMarkedAsFavorite ? "#FF3040" : "currentColor"}
        />
      ),
      onClick: () => {},
      className: "md:hidden",
    },
    {
      label: isLoopEnabled ? "Disable Loop" : "Loop",
      icon: <LoopIcon size={20} />,
      onClick: () => {},
      className: "md:hidden",
    },
    {
      label: shouldSkip ? "Don't skip" : "Skip track",
      icon: <SkipIcon variant={shouldSkip ? "filled" : "outlined"} size={20} />,
      onClick: () => {},
      className: "",
    },
    {
      label: "More details",
      icon: <InfoIcon size={20} />,
      onClick: toggleDetailsPopup,
      className: "",
    },
    {
      label: "Delete track",
      icon: <RemoveIcon size={20} />,
      onClick: () => {},
      className: "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <>
      <div className="relative z-50 inline-block font-light">
        {/* Action Menu */}
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border bg-white shadow-lg dark:bg-neutral-900">
          <ul className="flex flex-col py-2">
            {actions.map(({ label, icon, onClick, className }) => (
              <li key={label}>
                <button
                  aria-label={label}
                  className={`flex w-full items-center gap-2 p-2 text-start hover:bg-neutral-200 dark:hover:bg-neutral-700 ${className}`}
                  onClick={onClick}
                >
                  {icon}
                  <span className="ml-2">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Track Details Popup */}
      {isDetailsPopupOpen && (
        <TrackDetailsPopup track={track} onClose={toggleDetailsPopup} />
      )}
    </>
  );
};

export default TrackActionsMenu;
