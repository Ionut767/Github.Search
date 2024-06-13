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
        alignContent: "center",
        marginBottom: "0.5rem",
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
      <br />
      <button type="submit" className="button">
        Fetch Profile
      </button>
      <br />
      <button type="button" onClick={handleClearClick} className="button">
        Clear
      </button>
    </form>
  );
}
