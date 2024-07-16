import { useEffect, useState } from "react";
import Profile from "./components/Profile";
import { repos, User } from "./types";
import SearchForm from "./components/SearchForm";

export default function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<repos[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const [type, setType] = useState<"user" | "repo">("user");
  useEffect(() => {
    const keys = ["username", "user", "displayForm"];
    chrome.storage.sync.get(keys, (result) => {
      const { username: unm, user: usr, displayForm: df } = result;
      setUsername(unm || "");
      setUser(usr ? JSON.parse(usr) : null);
      setHide(df || false);
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({
      username,
      user: JSON.stringify(user),
    });
  }, [username, user]);

  const fetchUser = (username: string) => {
    if (
      !username ||
      user?.login?.toLocaleLowerCase() === username.toLocaleLowerCase()
    ) {
      return;
    }

    setIsLoading(true);
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data: User) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setUser(null);
        setIsLoading(false);
      });
  };
  const fetchRepos = (q: string) => {
    setIsLoading(true);
    fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(
        q
      )}&per_page=10`
    )
      .then((res) => res.json())
      .then((data) => {
        setRepos(data.items);
        console.log(repos);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setRepos(null);
        setIsLoading(false);
      });
  };
  const handleClearClick = () => {
    setUsername("");
    if (type === "user") {
      setUser(null);
      if (type == "user") chrome.storage.sync.remove(["username", "user"]);
    }
  };
  const formstate = () => {
    if (!username) return;
    chrome.storage.sync.set({ displayForm: !hide });
    setHide(!hide);
  };
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        minWidth: "320px",
      }}
    >
      {!hide && !isLoading && (
        <>
          <button
            onClick={() => setType(type === "user" ? "repo" : "user")}
            className="button"
            style={{ margin: "1rem" }}
          >
            Switch to
            {type === "user" ? <span> User </span> : <span> Repository </span>}
            Search
          </button>
          <SearchForm
            type={type}
            username={username}
            setUsername={setUsername}
            fetchUser={fetchUser}
            fetchRepos={fetchRepos}
            handleClearClick={handleClearClick}
          />
        </>
      )}
      {isLoading ? (
        <p style={{ fontSize: "1.5rem" }}>Loading...</p>
      ) : repos && type === "repo" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {repos.map((repo) => (
            <div
              key={repo.id}
              style={{
                border: "1px solid gray",
                padding: "15px",
                margin: "10px",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                position: "relative",
                overflow: "hidden",
              }}
              data-repo-id={repo.id}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <h3 style={{ fontSize: "1.5rem", marginInline: "10px" }}>
                  {repo.name}
                </h3>
                <p style={{ fontSize: "1rem", marginBottom: "10px" }}>
                  {repo.description}
                </p>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "10px" }}
                >
                  <p style={{ fontSize: "1rem", marginBottom: "10px" }}>
                    Forks: {repo.forks}{" "}
                  </p>
                  <p style={{ fontSize: "1rem", marginBottom: "10px" }}>
                    Stars: {repo.stargazers_count}
                  </p>
                  <p style={{ fontSize: "1rem", marginBottom: "10px" }}>
                    Language: {repo.language}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => window.open(repo.owner.html_url, "_blank")}
                >
                  <img
                    src={repo.owner.avatar_url}
                    alt={repo.owner.login}
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "1rem",
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <strong>{repo.owner.login}</strong>
                  </p>
                </div>
              </div>
              <button
                className="button"
                onClick={() => window.open(repo.html_url, "_blank")}
              >
                Visit Repository
              </button>
            </div>
          ))}
          {repos.length > 0 && (
            <button
              style={{ margin: "10px" }}
              className="button"
              onClick={() =>
                window.open(
                  `https://github.com/search?q=${decodeURIComponent(
                    username
                  )}&type=repositories`,
                  "_blank"
                )
              }
            >
              See all
            </button>
          )}
        </div>
      ) : (
        user &&
        username &&
        user.name && (
          <>
            <p
              onClick={formstate}
              style={{ cursor: "pointer", color: "gray", margin: "10px" }}
            >
              {!hide ? "Hide" : "Show"} the form
            </p>
            <Profile user={user} username={username} />
          </>
        )
      )}
    </main>
  );
}
