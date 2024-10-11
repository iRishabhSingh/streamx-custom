export interface Track {
  id: string; // Unique identifier for the track
  name: string; // Name of the media track
  type: string; // Type of media, e.g., "audio" or "video"
  url: string; // URL to access the media file
  size: number; // Size of the media file in bytes
  durationInSeconds: number; // Duration of the track in seconds
  addedOn: string; // Date when the track was added to the playlist
  isCurrentlyPlaying: boolean; // Indicates if the track is currently being played
  isMarkedAsFavorite: boolean; // Indicates if the track is marked as favorite
  isLoopEnabled: boolean; // Indicates if loop is enabled for the track
  shouldSkip: boolean; // Indicates if the track should be skipped
  hasBeenPlayed: boolean; // Indicates if the track has been played
}

export interface Playlist {
  tracks: Track[]; // List of media tracks in the playlist
  currentTrackIndex: number; // Index of the currently playing track
  isCurrentlyPlaying: boolean; // Indicates if the playlist is currently playing
  isLoopEnabled: boolean; // Indicates if loop mode is enabled for the entire playlist
  isShuffleEnabled: boolean; // Indicates if shuffle mode is enabled
  volumeLevel: number; // Volume level (range: 0.0 to 1.0)
  isMuted: boolean; // Indicates if the audio is muted
  isAutoPlayEnabled: boolean; // Indicates if autoplay is enabled for the next track
  playedAllTracks: boolean; // Indicates if all tracks in the playlist have been played
  playbackSpeedMultiplier: number; // Speed multiplier for playback, e.g., 1.0 for normal speed
}
