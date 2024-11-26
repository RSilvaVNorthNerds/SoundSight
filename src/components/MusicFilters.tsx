export interface IMusicFiltersProps {
  handleColorChange: (color: string) => void;
  handleShapeChange: (shape: string) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function MusicFilters({
  handleColorChange,
  handleFileUpload,
  handleShapeChange,
}: IMusicFiltersProps) {
  return (
    <>
      <label htmlFor="color">Color: </label>
      <select
        name="color"
        onChange={(event) => {
          handleColorChange(event.target.value);
        }}
      >
        <option value="0x00008b">Blue</option>
        <option value="0x8b0000">Red</option>
        <option value="0x008b00">Green</option>
      </select>
      <label htmlFor="shape">Shape: </label>
      <select
        name="shape"
        onChange={(event) => {
          handleShapeChange(event.target.value);
        }}
      >
        <option value="Icosahedron">Icosahedron</option>
        <option value="Sphere">Sphere</option>
        <option value="Cube">Cube</option>
      </select>
      <input
        type="file"
        name="file-upload"
        id="file-uploader"
        onChange={handleFileUpload}
        accept=".mp3"
      />
    </>
  );
}

export default MusicFilters;
