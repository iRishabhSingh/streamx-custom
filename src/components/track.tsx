import { motion } from "framer-motion";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";

import {
  AudioIcon,
  GridIcon,
  HeartIcon,
  LoopIcon,
  TrackMenuIcon,
  VideoIcon,
} from "@/assets";
import { cn } from "@/lib/utils";
import { truncateTrackName } from "@/utils/formatUtils";
import type { Track as TrackProp } from "@/types/mediaTypes";
import TrackActionsMenu from "@/components/track-action-menu";

const Track: React.FC<{ track: TrackProp }> = ({ track }) => {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: track.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { name, isMarkedAsFavorite, isLoopEnabled } = track;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      if (showOptionsMenu && !target.closest(".options-menu")) {
        setShowOptionsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptionsMenu, setShowOptionsMenu]);

  return (
    <motion.article
      style={style}
      {...attributes}
      ref={setNodeRef}
      className={cn(
        "relative mx-auto mt-4 flex w-full items-center rounded-lg bg-neutral-900/10 dark:bg-neutral-400/10",
      )}
    >
      {/* Drag Handle */}
      <motion.div
        tabIndex={0}
        {...listeners}
        title="Drag to reorder"
        className="cursor-move rounded-lg p-2 opacity-60 hover:opacity-80"
      >
        <GridIcon size={20} />
      </motion.div>

      {/* Track Content */}
      <motion.div className="flex w-full flex-1 flex-grow items-center justify-between gap-2 rounded-lg border border-neutral-200 bg-white p-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        {/* Track Icon and Name */}
        <div className="flex flex-1 items-center gap-2">
          {/* Media Type Icon */}
          <div className="flex-shrink-0 text-neutral-700 dark:text-neutral-300">
            {track.type === "audio" ? <AudioIcon /> : <VideoIcon />}
          </div>

          {/* Track Details */}
          <div className="flex-1 text-start text-sm font-medium text-neutral-800 dark:text-neutral-200">
            <p className="relative w-16 overflow-hidden text-ellipsis text-nowrap after:absolute after:right-0 after:top-0 after:h-full after:w-10 after:rounded-r-md after:bg-gradient-to-l after:from-black/50 after:to-transparent after:content-[''] sm:w-auto sm:after:hidden">
              {truncateTrackName(name)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-shrink-0 items-center gap-3">
          {/* Favorite toggle Button */}
          <button
            aria-label="Toggle Favorite"
            className={cn(
              "hidden rounded-full p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900 md:flex",
              isMarkedAsFavorite
                ? "text-red-500"
                : "hover:bg-neutral-100 dark:hover:bg-neutral-800",
            )}
          >
            <HeartIcon
              size={20}
              variant={isMarkedAsFavorite ? "filled" : "outlined"}
              fill={isMarkedAsFavorite ? "#FF3040" : "currentColor"}
            />
          </button>

          {/* Loop toggle Button */}
          <button
            aria-label="Toggle Loop"
            className={cn(
              "hidden rounded-full p-2 transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:bg-neutral-800 dark:focus-visible:ring-offset-neutral-900 md:flex",
              isLoopEnabled && "bg-neutral-200 dark:bg-neutral-800",
            )}
          >
            <LoopIcon size={20} />
          </button>

          {/* Options Menu */}
          <button
            aria-label="Track Options"
            onClick={() => setShowOptionsMenu((prev) => !prev)}
            className="rounded-full p-2 transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:bg-neutral-800 dark:focus-visible:ring-offset-neutral-900"
          >
            <TrackMenuIcon size={20} />
          </button>

          {/* Dropdown Menu */}
          {showOptionsMenu && (
            <div className="options-menu absolute right-0 mt-2">
              <TrackActionsMenu track={track} />
            </div>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
};

export default Track;
