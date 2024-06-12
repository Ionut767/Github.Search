export default function SearchForm({
  username,
  setUsername,
  fetchUser,
  handleClearClick,
}: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  fetchUser: (username: string) => void;
  handleClearClick: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(), fetchUser(username);
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginBottom: "1.5rem",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <input
        required
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter GitHub username"
        style={{
          padding: "0.25rem",
          border: "1px solid",
          borderRadius: "0.25rem",
        }}
      />
      <button
        type="submit"
        style={{
          marginTop: "0.5rem",
          padding: "0.25rem",
          border: "1px solid #ccc",
          borderRadius: "0.25rem",
        }}
      >
        Fetch Profile
      </button>
      <button
        type="button"
        onClick={handleClearClick}
        style={{
          marginTop: "0.5rem",
          padding: "0.25rem",
          border: "1px solid #ccc",
          borderRadius: "0.25rem",
        }}
      >
        Clear
      </button>
    </form>
  );
}
