import type { Playlist, Track } from "@/types/mediaTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Playlist = {
  tracks: [],
  currentTrackIndex: 0,
  isCurrentlyPlaying: false,
  isLoopEnabled: false,
  isShuffleEnabled: false,
  volumeLevel: 0.5,
  isMuted: false,
  isAutoPlayEnabled: true,
  playedAllTracks: false,
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

    playNextTrack: (state) => {
      if (state.tracks[state.currentTrackIndex].isLoopEnabled) return;

      // Stop current track from playing
      state.tracks[state.currentTrackIndex].isCurrentlyPlaying = false;

      if (state.isShuffleEnabled) {
        // Filter tracks that have not been played and should not be skipped
        const unplayedTracks = state.tracks.filter(
          (track) => !track.hasBeenPlayed && !track.shouldSkip,
        );

        if (unplayedTracks.length > 0) {
          // Pick a random track from unplayed tracks
          const randomTrackIndex = Math.floor(
            Math.random() * unplayedTracks.length,
          );
          const nextTrack = unplayedTracks[randomTrackIndex];

          // Find the index of the next track in the original track list
          state.currentTrackIndex = state.tracks.findIndex(
            (track) => track.id === nextTrack.id,
          );

          // Mark the new track as played
          state.tracks[state.currentTrackIndex].hasBeenPlayed = true;
        } else {
          // Mark that all tracks have been played
          state.playedAllTracks = true;

          // Reset all tracks to unplayed if all have been played
          state.tracks.forEach((track) => {
            track.hasBeenPlayed = false;
          });

          // Recursively call playNextTrack to pick a track again
          playNextTrack();
          return;
        }
      } else {
        let nextIndex = (state.currentTrackIndex + 1) % state.tracks.length;

        // Loop until we find a track that should not be skipped
        while (state.tracks[nextIndex].shouldSkip) {
          nextIndex = (nextIndex + 1) % state.tracks.length;

          // Break if we loop back to the start to avoid an infinite loop
          if (nextIndex === state.currentTrackIndex) {
            break;
          }
        }

        state.currentTrackIndex = nextIndex;

        // If looping is disabled and we've reached the start again, stop playing
        if (!state.isLoopEnabled && state.currentTrackIndex === 0) {
          return;
        }

        // Mark the new track as played
        state.tracks[state.currentTrackIndex].hasBeenPlayed = true;
      }

      // Start playing the next track
      state.tracks[state.currentTrackIndex].isCurrentlyPlaying = true;
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
  playNextTrack,
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
