import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import Track from "@/components/track";
import { RootState } from "@/app/store";
import GridPattern from "@/components/grid-pattern";
import { setTracks } from "@/features/playlist/playlistSlice";
import { handleValidMediaFiles } from "@/utils/handleMediaFiles";
import { LoopIcon, RemoveIcon, ShuffleIcon, UploadIcon } from "@/assets";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const AddTracks = () => {
  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const tracks = useSelector((state: RootState) => state.tracks);

  const handleFileChange = (newFiles: File[]) => {
    const validFiles = newFiles.filter(
      (file) => file.type.startsWith("audio") || file.type.startsWith("video"),
    );
    handleValidMediaFiles(validFiles, dispatch);
  };

  const handleClick = () => fileInputRef.current?.click();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) return;

    const oldIndex = tracks.findIndex((track) => track.id === active.id);
    const newIndex = tracks.findIndex((track) => track.id === over?.id);

    const updatedTracks = arrayMove(tracks, oldIndex, newIndex);

    dispatch(setTracks(updatedTracks));
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.div
        onClick={() => !tracks.length && handleClick()}
        whileHover="animate"
        className="group/file relative block w-full cursor-pointer overflow-hidden rounded-lg p-10"
      >
        <label htmlFor="file-upload-handle" className="hidden">
          Add media
        </label>
        <input
          multiple
          type="file"
          className="hidden"
          ref={fileInputRef}
          id="file-upload-handle"
          accept="audio/*,video/*"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
        />

        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <p className="relative z-20 font-sans text-base font-bold text-neutral-700 dark:text-neutral-300">
            Upload file
          </p>
          <p className="relative z-20 mt-2 font-sans text-sm font-normal text-neutral-400 dark:text-neutral-400">
            Drag or drop your files here or click to upload
          </p>

          <div className="relative mx-auto mt-10 w-full max-w-xl">
            <DndContext
              sensors={sensors}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCorners}
            >
              <SortableContext
                items={tracks}
                strategy={verticalListSortingStrategy}
              >
                {tracks.length > 0 && (
                  <div className="rounded-lg border">
                    <div className="flex flex-wrap items-center justify-between gap-y-2 rounded-t-lg border-b bg-neutral-200 px-4 py-2 text-start dark:bg-neutral-900">
                      <span className="w-full px-2 text-center font-medium sm:w-auto sm:text-start">
                        Playlist
                      </span>
                      <div className="flex w-full justify-center gap-4 px-2 sm:w-auto sm:justify-end">
                        {/* Loop */}
                        <button
                          aria-label="Loop"
                          className="rounded-full p-2 transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:bg-neutral-800 dark:focus-visible:ring-offset-neutral-900"
                        >
                          <LoopIcon size={20} />
                        </button>

                        {/* Shuffle */}
                        <button
                          aria-label="Shuffle"
                          className="rounded-full p-2 transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:bg-neutral-800 dark:focus-visible:ring-offset-neutral-900"
                        >
                          <ShuffleIcon size={20} />
                        </button>

                        {/* Clear Playlist Button */}
                        <button
                          aria-label="Clear Playlist"
                          className="rounded-full p-2 text-red-600 transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-red-400 dark:hover:bg-neutral-800 dark:focus-visible:ring-offset-neutral-900"
                        >
                          <RemoveIcon size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="mx-4 mb-4 max-h-[40dvh] overflow-scroll">
                      {tracks.map((track) => (
                        <Track key={track.id} track={track} />
                      ))}
                    </div>
                  </div>
                )}
              </SortableContext>
            </DndContext>

            {!tracks.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "relative z-40 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md bg-white group-hover/file:shadow-2xl dark:bg-neutral-900",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]",
                )}
              >
                <UploadIcon size={16} />
              </motion.div>
            )}

            {!tracks.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md border border-dashed border-sky-400 bg-transparent opacity-0"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
