import React, { useEffect, useState } from "react";

const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const keys = ["username", "user", "displayForm"];
    chrome.storage.sync.get(keys, (result) => {
      const { username: u, user: uu, displayForm: df } = result;
      setUsername(u || "");
      setUser(uu ? JSON.parse(uu) : null);
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
      {user && (
        <p
          onClick={formstate}
          style={{ cursor: "pointer", color: "gray", margin: "0" }}
        >
          {!hide ? "Hide" : "Show"} the form
        </p>
      )}{" "}
      {!hide && !isLoading && (
        <div
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
            onClick={() => fetchUser(username)}
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
        </div>
      )}
      {isLoading ? (
        <p style={{ fontSize: "1.5rem" }}>Loading...</p>
      ) : user?.name ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "15rem",
            height: "100%",
            paddingInline: "5rem",
          }}
        >
          <div
            style={{
              width: "12rem",
              height: "12rem",
              borderRadius: "50%",
              marginTop: "1rem",
              border: "3px solid #2C3034",
            }}
          >
            <img
              src={user.avatar_url}
              alt="Avatar"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </div>
          <div style={{ textAlign: "center", width: "100%" }}>
            <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "0" }}>
              {user.name}
            </p>
            <p
              style={{
                color: "#8d96a0",
                lineHeight: "24px",
                fontSize: "1rem",
                margin: "0",
              }}
            >
              {user.login} · Developer
            </p>
          </div>
          <div
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <a
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
              onClick={() =>
                window.open(`https://github.com/${username}?tab=followers`)
              }
            >
              <span style={{ fontWeight: "bold" }}> {user.followers} </span>{" "}
              followers  ·
            </a>
            <a
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
              onClick={() =>
                window.open(`https://github.com/${username}?tab=following`)
              }
            >
              <span style={{ fontWeight: "bold" }}>   {user.following}  </span>
              following
            </a>
          </div>
          <div
            style={{
              fontSize: "1.125rem",
              whiteSpace: "pre-line",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            <button
              style={{
                marginBottom: "10px",
                padding: "10px",
                cursor: "pointer",
                color: "white",
                backgroundColor: "#2C3034",
                width: "100%",
                border: "1px solid #21262D",
              }}
              onClick={() => window.open(`https://github.com/${user.login}`)}
            >
              Visit profile
            </button>
            {user.bio?.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>

          {user.email && <p style={{ fontSize: "1.125rem" }}>{user.email}</p>}
          {user.location && (
            <p style={{ fontSize: "1.125rem" }}>{user.location}</p>
          )}
        </div>
      ) : null}
    </main>
  );
};

export default App;

type User = {
  followers: number;
  following: number;
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  email: string;
  location: string;
};
