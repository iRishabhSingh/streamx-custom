import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  deleteTrack,
  updateTrackField,
} from "@/features/playlist/playlistActions";
import { Button } from "@/components/ui/button";
import type { Track } from "@/types/mediaTypes";
import ConfirmationPopup from "@/components/confirmation-popup";
import TrackDetailsPopup from "@/components/track-details-popup";
import { HeartIcon, LoopIcon, SkipIcon, RemoveIcon, InfoIcon } from "@/assets";

const TrackActionsMenu: React.FC<{ track: Track }> = ({ track }) => {
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const dispatch = useDispatch();

  const { isMarkedAsFavorite, isLoopEnabled, shouldSkip } = track;

  const toggleDetailsPopup = () => setIsDetailsPopupOpen((prev) => !prev);

  const handleDeleteTrack = () => {
    if (isMarkedAsFavorite) {
      setIsDeletePopupOpen(true);
    } else {
      deleteTrack(track, dispatch);
    }
  };

  const confirmDelete = () => {
    deleteTrack(track, dispatch);
    setIsDeletePopupOpen(false);
  };

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
      onClick: () => updateTrackField(track, "isMarkedAsFavorite", dispatch),
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
      onClick: () => updateTrackField(track, "shouldSkip", dispatch),
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
      onClick: handleDeleteTrack,
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
                <Button
                  variant="ghost"
                  onClick={onClick}
                  aria-label={label}
                  className={`flex w-full items-center justify-start gap-2 rounded-none p-2 text-start hover:bg-neutral-200 dark:hover:bg-neutral-700 ${className}`}
                >
                  {icon}
                  <span className="ml-2">{label}</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Track Details Popup */}
      {isDetailsPopupOpen && (
        <TrackDetailsPopup track={track} onClose={toggleDetailsPopup} />
      )}

      {/* Delete Confirmation Popup */}
      {isDeletePopupOpen && (
        <ConfirmationPopup
          confirmText="Delete"
          onConfirm={confirmDelete}
          onCancel={() => setIsDeletePopupOpen(false)}
          message="Are you sure you want to delete this track?"
        />
      )}
    </>
  );
};

export default TrackActionsMenu;
