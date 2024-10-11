import { Track } from "@/types/mediaTypes";
import { addTrack } from "@/features/playlist/playlistSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit/react";

// Handle file uploads and metadata extraction
export const handleValidMediaFiles = async (
  files: File[],
  dispatch: Dispatch<UnknownAction>,
) => {
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
          size: file.size,
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
