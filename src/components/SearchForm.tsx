export default function SearchForm({
  username,
  setUsername,
  fetchUser,
  fetchRepos,
  handleClearClick,
  type,
}: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  fetchUser: (username: string) => void;
  fetchRepos: (q: string) => void;
  handleClearClick: () => void;
  type: "user" | "repo";
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(),
          type === "user" ? fetchUser(username) : fetchRepos(username);
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
        placeholder={`Enter GitHub ${
          type === "user" ? "username" : "repository"
        }`}
        style={{
          padding: "0.25rem",
          border: "1px solid",
          borderRadius: "0.25rem",
        }}
      />
      <br />
      <button type="submit" className="button">
        Fetch {type === "user" ? "Profile" : "Repository"}
      </button>
      <br />
      <button type="button" onClick={handleClearClick} className="button">
        Clear
      </button>
    </form>
  );
}
