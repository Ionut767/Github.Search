import { useEffect, useState } from "react";
import Profile from "./components/Profile";
import { User } from "./types";
import SearchForm from "./components/SearchForm";
import SettingsPage from "./components/SettingsPage";
import SettingsButton from "./components/SettingsButton";

export default function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
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
        setIsLoading(false);
      });
  };

  const handleClearClick = () => {
    setUsername("");
    setUser(null);
    chrome.storage.sync.remove(["username", "user"]);
  };
  const formstate = () => {
    if (!username) return;
    chrome.storage.sync.set({ displayForm: !hide });
    setHide(!hide);
  };
  const SettingsButtonComponent = () => (
    <SettingsButton
      showSettings={showSettings}
      setShowSettings={setShowSettings}
    />
  );
  if (showSettings)
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ width: "100%", backgroundColor: "#2f3136" }}>
          <SettingsButtonComponent />
        </div>
        <SettingsPage />
      </div>
    );
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
          <SettingsButtonComponent />
          <SearchForm
            username={username}
            setUsername={setUsername}
            fetchUser={fetchUser}
            handleClearClick={handleClearClick}
          />
        </>
      )}
      {isLoading ? (
        <p style={{ fontSize: "1.5rem" }}>Loading...</p>
      ) : (
        user && (
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
