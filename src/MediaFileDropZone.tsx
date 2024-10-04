import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";

import { RootState } from "@/app/store";
import type { Track } from "@/types/mediaTypes";
import { addTrack, playNextTrack } from "@/features/playlist/playlistSlice";

interface MediaFileDropZoneProps {
  children: React.ReactNode;
}

const MediaFileDropZone: React.FC<MediaFileDropZoneProps> = ({ children }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Handle when files are dragged over the drop zone
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true); // Show the overlay when dragging
  };

  // Handle when files are dragged out of the drop zone
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false); // Hide the overlay when not dragging
  };

  // Handle drop event, check for valid media types (audio or video), and pass valid files
  const handleValidMediaFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false); // Hide the overlay when files are dropped

    const files = Array.from(event.dataTransfer.files);
    const validMediaFiles = files.filter(
      (file) => file.type.startsWith("audio") || file.type.startsWith("video"),
    );

    if (validMediaFiles.length > 0) {
      onMediaFilesAccepted(validMediaFiles); // Call the passed function with valid media files
    }
  };

  const dispatch = useDispatch();
  const tracks = useSelector((state: RootState) => state.tracks);
  const currentTrackIndex = useSelector(
    (state: RootState) => state.currentTrackIndex,
  );
  const currentTrack = tracks[currentTrackIndex];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Handle file uploads and metadata extraction
  const onMediaFilesAccepted = async (files: File[]) => {
    if (files) {
      files.forEach((file) => {
        const fileUrl = URL.createObjectURL(file);
        const mediaElement = document.createElement(
          file.type.startsWith("video") ? "video" : "audio",
        );

        mediaElement.src = fileUrl;
        mediaElement.addEventListener("loadedmetadata", () => {
          const track: Track = {
            id: fileUrl,
            name: file.name,
            type: file.type.startsWith("video") ? "video" : "audio",
            url: fileUrl,
            durationInSeconds: mediaElement.duration,
            addedOn: new Date().toISOString(),
            isCurrentlyPlaying: false,
            isMarkedAsFavorite: false,
            isLoopEnabled: false,
            shouldSkip: false,
            hasBeenPlayed: false,
          };

          dispatch(addTrack(track));
        });

        mediaElement.load();
      });
    }
  };

  // Automatically play the next track when the current one ends
  useEffect(() => {
    const mediaElement =
      currentTrack?.type === "audio" ? audioRef.current : videoRef.current;

    if (mediaElement) {
      mediaElement.onended = () => {
        dispatch(playNextTrack());
      };
    }
  }, [currentTrack, dispatch]);

  console.log(tracks);

  return (
    <div
      className="relative h-screen w-screen"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleValidMediaFileDrop}
    >
      {children}

      {isDragging && (
        <div className="absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black text-center">
          <h1 className="mb-6 text-xl font-extrabold tracking-wide text-white sm:text-3xl md:text-4xl lg:text-5xl">
            Ready to Drop Your Media?
          </h1>
          <p className="mb-1 text-xs font-light tracking-tight text-gray-300 sm:text-sm">
            While we primarily support Video and Audio files, duh!
          </p>
          <p className="mb-8 text-[10px] font-normal text-gray-300 sm:text-xs">
            Just drop your files and let StreamX handle the rest!
          </p>

          <div className="border-whitesmoke md:border-l-6 md:border-t-6 absolute left-0 top-0 m-4 h-12 w-12 rounded-tl-3xl border-l-4 border-t-4 md:h-16 md:w-16 lg:h-20 lg:w-20 lg:border-l-8 lg:border-t-8"></div>
          <div className="border-whitesmoke md:border-b-6 md:border-r-6 absolute bottom-0 right-0 m-4 h-12 w-12 rounded-br-3xl border-b-4 border-r-4 md:h-16 md:w-16 lg:h-20 lg:w-20 lg:border-b-8 lg:border-r-8"></div>
        </div>
      )}
    </div>
  );
};

export default MediaFileDropZone;
