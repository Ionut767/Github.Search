import { useEffect, useState } from "react";
import Profile from "./components/Profile";
import { repos, User } from "./types";
import SearchForm from "./components/SearchForm";
import Repos from "./components/Repos";

export default function App() {
  const [search, setSearch] = useState("");
  const [repos, setRepos] = useState<repos[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const [type, setType] = useState<"user" | "repo">("user");
  useEffect(() => {
    const keys = ["search", "user", "repoq", "displayForm"];
    chrome.storage.sync.get(keys, (result) => {
      const { search: unm, user: usr, repoq: rq, displayForm: df } = result;
      unm && (setSearch(unm), usr && fetchUser(usr), rq && fetchRepos(rq));
      setHide(df || false);
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({
      search: search,
    });
  }, [search]);

  const fetchUser = (search: string) => {
    if (
      !search ||
      user?.login?.toLocaleLowerCase() === search.toLocaleLowerCase()
    ) {
      return;
    }

    setIsLoading(true);
    fetch(`https://api.github.com/users/${search}`)
      .then((res) => res.json())
      .then((data: User) => {
        setUser(data);
        chrome.storage.sync.set({ user: data.login });
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
        chrome.storage.sync.set({ repoq: q });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setRepos(null);
        setIsLoading(false);
      });
  };
  const handleClearClick = () => {
    setSearch("");
    setRepos(null);
    if (type === "user") {
      setUser(null);
      if (type == "user")
        chrome.storage.sync.remove(["search", "user", "repoq"]);
    }
  };
  const formstate = () => {
    if (!search) return;
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
      {!isLoading ? (
        <>
          {!hide && (
            <SearchForm
              setType={setType}
              type={type}
              search={search}
              setSearch={setSearch}
              fetchUser={fetchUser}
              fetchRepos={fetchRepos}
              handleClearClick={handleClearClick}
            />
          )}
          {repos && type === "repo" ? (
            <Repos repos={repos} search={search} />
          ) : (
            user &&
            user.name && (
              <>
                <p
                  onClick={formstate}
                  style={{ cursor: "pointer", color: "gray", margin: "10px" }}
                >
                  {!hide ? "Hide" : "Show"} the form
                </p>
                <Profile user={user} search={search} />
              </>
            )
          )}
        </>
      ) : (
        <p style={{ fontSize: "1.5rem" }}>Loading...</p>
      )}
    </main>
  );
}
