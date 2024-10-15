import { useSelector } from "react-redux";

import { RootState } from "@/app/store";
import { AddTracks } from "@/components/add-tracks";
import MediaFileDropZone from "@/MediaFileDropZone";

function App() {
  const isCurrentlyPlaying = useSelector(
    (state: RootState) => state.isCurrentlyPlaying,
  );

  return (
    <MediaFileDropZone>
      {!isCurrentlyPlaying && (
        <div className="flex h-full w-full items-center justify-center">
          <AddTracks />
        </div>
      )}
    </MediaFileDropZone>
  );
}

export default App;
