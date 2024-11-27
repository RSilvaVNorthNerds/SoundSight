export interface IBackgroundFiltersProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function BackgroundFilters({ handleFileUpload }: IBackgroundFiltersProps) {
  return (
    <>
      <label htmlFor="bg-file-upload">Change Background Image: </label>
      <input
        type="file"
        name="bg-file-upload"
        id="file-uploader"
        onChange={handleFileUpload}
        accept=".mp3"
      />
    </>
  );
}

export default BackgroundFilters;
