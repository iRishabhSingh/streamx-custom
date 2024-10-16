import { motion } from "framer-motion";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { cn } from "@/lib/utils";
import { truncateTrackName } from "@/utils/formatUtils";
import type { Track as TrackProp } from "@/types/mediaTypes";

const Track: React.FC<{ track: TrackProp }> = ({ track }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: track.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      className={cn(
        "relative z-40 mx-auto mt-4 flex w-full items-center justify-center gap-2 rounded-md",
      )}
    >
      <motion.div
        className={cn(
          "relative flex w-full flex-col items-start justify-between rounded-md bg-white p-4 dark:bg-neutral-900 md:flex-row md:items-center",
        )}
      >
        {truncateTrackName(track.name)}
      </motion.div>
    </motion.div>
  );
};

export default Track;

// id
// name
// type
// url
// size
// durationInSeconds
// addedOn
//   isCurrentlyPlaying
//   isMarkedAsFavorite
//   isLoopEnabled
//   shouldSkip
//   hasBeenPlayed
