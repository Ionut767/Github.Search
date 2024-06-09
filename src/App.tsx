import React, { useEffect, useState } from "react";

const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(
      ["username", "user", "displayForm"],
      function (result) {
        if (result.username) setUsername(result.username);
        if (result.user) setUser(JSON.parse(result.user));
        if (result.displayForm) setHide(result.displayForm);
      }
    );
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({ username: username, user: JSON.stringify(user) });
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleFetchClick = () => {
    fetchUser(username);
  };

  const handleClearClick = () => {
    setUsername("");
    setUser(null);
    chrome.storage.sync.remove(["username", "user"]);
  };
  const formstate = () => {
    if (!username) return;
    if (hide) chrome.storage.sync.set({ displayForm: false });
    else chrome.storage.sync.set({ displayForm: true });
    setHide(!hide);
  };

  return (
    <main
      className="flex flex-col items-center justify-center h-full bg-gray-100 p-5"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      {/** */}
      {user && (
        <p
          onClick={formstate}
          style={{ cursor: "pointer", color: "gray", margin: "0" }}
        >
          {!hide ? "Hide" : "Show"} the form
        </p>
      )}{" "}
      {!hide && (
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
            onChange={handleInputChange}
            placeholder="Enter GitHub username"
            style={{
              padding: "0.25rem",
              border: "1px solid #ccc",
              borderRadius: "0.25rem",
            }}
          />
          <button
            onClick={handleFetchClick}
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
        <p className="text-3xl font-bold pt-10">Loading...</p>
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
              border: "1px solid #2C3034",
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
              }}
              href={`https://github.com/${username}?tab=followers`}
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
              }}
              href={`https://github.com/${username}?tab=following`}
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

export interface User {
  followers: number;
  following: number;
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  email: string;
  location: string;
}
