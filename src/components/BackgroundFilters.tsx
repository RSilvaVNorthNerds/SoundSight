export interface IBackgroundFiltersProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function BackgroundFilters({ handleFileUpload }: IBackgroundFiltersProps) {
  return (
    <>
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

export default BackgroundFilters;
