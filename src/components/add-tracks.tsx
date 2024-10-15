import { useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import { UploadIcon } from "@/assets";
import { RootState } from "@/app/store";
import GridPattern from "./grid-pattern";
import { handleValidMediaFiles } from "@/utils/handleMediaFiles";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const AddTracks = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const tracks = useSelector((state: RootState) => state.tracks);

  const handleFileChange = (newFiles: File[]) => {
    const files = newFiles.filter(
      (file) => file.type.startsWith("audio") || file.type.startsWith("video"),
    );
    handleValidMediaFiles(files, dispatch); // Dispatching to Redux store
  };

  const handleClick = () => fileInputRef.current?.click();

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

          <div className="relative mx-auto mt-10 max-h-[40vh] w-full max-w-xl overflow-scroll">
            {!tracks.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
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