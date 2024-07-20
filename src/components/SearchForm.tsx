export default function SearchForm({
  search,
  setSearch,
  fetchUser,
  fetchRepos,
  handleClearClick,
  setType,
  type,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  fetchUser: (username: string) => void;
  fetchRepos: (q: string) => void;
  handleClearClick: () => void;
  setType: React.Dispatch<React.SetStateAction<"user" | "repo">>;
  type: "user" | "repo";
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(),
          type === "user" ? fetchUser(search) : fetchRepos(search);
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
      <button
        onClick={() => setType(type === "user" ? "repo" : "user")}
        className="button"
        style={{ margin: "0.5rem" }}
        type="button"
      >
        Switch to
        {type === "user" ? <span> User </span> : <span> Repository </span>}
        Search
      </button>
      <input
        required
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder={`Enter GitHub ${
          type === "user" ? "username" : "repository"
        }`}
        style={{
          padding: "0.25rem",
          border: "1px solid",
          borderRadius: "0.25rem",
        }}
      />
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
        <button type="button" onClick={handleClearClick} className="button">
          Clear
        </button>
        <button type="submit" className="button">
          Fetch {type === "user" ? "Profile" : "Repository"}
        </button>
      </div>
    </form>
  );
}
