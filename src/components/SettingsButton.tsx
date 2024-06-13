export default function SettingsButton({
  showSettings,
  setShowSettings,
}: {
  showSettings: boolean;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <p
        style={{ cursor: "pointer", color: "gray", margin: "10px" }}
        onClick={() => setShowSettings(!showSettings)}
      >
        Settings
      </p>
    </>
  );
}
