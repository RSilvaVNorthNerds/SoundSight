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
      <div
        className="audio-controls"
        style={{
          backgroundColor: "#181818",
          padding: "1rem",
          borderRadius: "10px",
          position: "fixed",
          bottom: "1rem",
          display: "flex",
        }}
      >
        <div
          style={{ width: "100%", height: "100%", position: "relative" }}
          className="control-container"
        >
          <div
            style={{
              position: "absolute",
              transform: "translateY(calc(-100% - 16px))",
            }}
            className="control-types"
          >
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

        <button
          style={{
            backgroundColor: "#000000",
            display: "flex",
            placeContent: "center",
            height: "auto",
          }}
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
    </>
  );
}

export default FilterControls;
