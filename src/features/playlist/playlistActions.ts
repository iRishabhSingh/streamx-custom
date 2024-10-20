import {
  setTracks,
  setLoopEnabled,
  setShuffleEnabled,
  setAutoPlayEnabled,
} from "@/features/playlist/playlistSlice";
import type { Track } from "@/types/mediaTypes";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

// Playlist Actions
export const handleAutoPlay = (
  isAutoPlayEnabled: boolean,
  dispatch: Dispatch<UnknownAction>,
) => {
  dispatch(setAutoPlayEnabled(!isAutoPlayEnabled));
};

export const handleLoop = (
  isLoopEnabled: boolean,
  dispatch: Dispatch<UnknownAction>,
) => {
  dispatch(setLoopEnabled(!isLoopEnabled));
};

export const handleShuffle = (
  isShuffleEnabled: boolean,
  tracks: Track[],
  dispatch: Dispatch<UnknownAction>,
) => {
  if (isShuffleEnabled) {
    dispatch(setShuffleEnabled(false));
    return;
  }

  const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);
  dispatch(setShuffleEnabled(true));
  dispatch(setTracks(shuffledTracks));
};

export const handleClearPlaylist = (dispatch: Dispatch<UnknownAction>) => {
  dispatch(setTracks([]));
};
