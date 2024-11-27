import { useState } from "react";
import MusicFilters, { IMusicFiltersProps } from "./MusicFilters";
import BackgroundFilters, {
  IBackgroundFiltersProps,
} from "./BackgroundFilters";

interface IFilterControlsProps
  extends IMusicFiltersProps,
    IBackgroundFiltersProps {
  handleStartPause: () => void;
}

function FilterControls({
  handleColorChange,
  handleFileUpload,
  handleShapeChange,
  handleStartPause,
}: IFilterControlsProps) {
  const [filterState, setFilterState] = useState<"bg" | "music">("music");

  const handleFilterTypeChange = (type: "bg" | "music") => {
    setFilterState(type);
  };
  return (
    <>
      <div className="audio-controls">
        <div className="control-container">
          <div className="control-types">
            <span
              onClick={() => handleFilterTypeChange("music")}
              className={`material-symbols-outlined control-type ${
                filterState == "music" ? "active" : ""
              }`}
            >
              music_note
            </span>
            <span
              onClick={() => handleFilterTypeChange("bg")}
              className={`material-symbols-outlined control-type ${
                filterState == "music" ? "active" : ""
              }`}
            >
              wallpaper
            </span>
          </div>
          <div className="controls">
            {filterState == "music" && (
              <MusicFilters
                handleColorChange={handleColorChange}
                handleFileUpload={handleFileUpload}
                handleShapeChange={handleShapeChange}
              />
            )}
            {filterState == "bg" && (
              <BackgroundFilters handleFileUpload={handleFileUpload} />
            )}
          </div>
        </div>

        <div className="pp-button-wrapper">
          <button
            className="play-pause-button"
            onClick={handleStartPause}
            type="button"
          >
            <span
              style={{ fontSize: "3rem" }}
              className="material-symbols-outlined"
            >
              play_pause
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default FilterControls;
