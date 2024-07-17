import { useEffect, useState } from "react";
import Profile from "./components/Profile";
import { repos, User } from "./types";
import SearchForm from "./components/SearchForm";
import Repos from "./components/Repos";

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
    setRepos(null);
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
        <Repos repos={repos} username={username} />
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
