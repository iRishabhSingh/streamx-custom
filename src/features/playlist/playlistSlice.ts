import type { Playlist, Track } from "@/types/mediaTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Playlist = {
  tracks: [],
  currentTrackIndex: 0,
  isLoopEnabled: false,
  isShuffleEnabled: false,
  volumeLevel: 0.5,
  isMuted: false,
  isAutoPlayEnabled: true,
  playbackSpeedMultiplier: 1,
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    addTrack: (state, action: PayloadAction<Track>) => {
      state.tracks.push(action.payload);
    },

    removeTrackById: (state, action: PayloadAction<string>) => {
      const trackIndex = state.tracks.findIndex(
        (track) => track.id === action.payload,
      );
      state.tracks = state.tracks.filter(
        (track) => track.id !== action.payload,
      );
      if (trackIndex === state.currentTrackIndex) {
        state.currentTrackIndex = Math.min(
          state.currentTrackIndex,
          state.tracks.length - 1,
        );
      }
    },

    clearPlaylist: (state) => {
      state.tracks = [];
      state.currentTrackIndex = 0;
    },

    setCurrentTrackIndex: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.tracks.length) {
        state.currentTrackIndex = action.payload;
      } else if (state.isLoopEnabled) {
        state.currentTrackIndex =
          (state.currentTrackIndex + 1) % state.tracks.length;
      }
    },

    setLoopEnabled: (state, action: PayloadAction<boolean>) => {
      state.isLoopEnabled = action.payload;
    },

    setShuffleEnabled: (state, action: PayloadAction<boolean>) => {
      state.isShuffleEnabled = action.payload;
      if (action.payload) {
        state.tracks.sort(() => Math.random() - 0.5);
      }
    },

    setVolumeLevel: (state, action: PayloadAction<number>) => {
      state.volumeLevel = Math.max(0, Math.min(1, action.payload));
    },

    setMuted: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },

    setAutoPlayEnabled: (state, action: PayloadAction<boolean>) => {
      state.isAutoPlayEnabled = action.payload;
    },

    setPlaybackSpeed: (state, action: PayloadAction<number>) => {
      state.playbackSpeedMultiplier = action.payload;
    },

    toggleTrackFavorite: (state, action: PayloadAction<string>) => {
      const track = state.tracks.find((track) => track.id === action.payload);
      if (track) {
        track.isMarkedAsFavorite = !track.isMarkedAsFavorite;
      }
    },
  },
});

export const {
  addTrack,
  removeTrackById,
  clearPlaylist,
  setCurrentTrackIndex,
  setLoopEnabled,
  setShuffleEnabled,
  setVolumeLevel,
  setMuted,
  setAutoPlayEnabled,
  setPlaybackSpeed,
  toggleTrackFavorite,
} = playlistSlice.actions;

export default playlistSlice.reducer;
