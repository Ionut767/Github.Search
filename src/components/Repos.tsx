import { repos } from "../types";
export default function Repos({
  repos,
  username,
}: {
  repos: repos[];
  username: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
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
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              {[
                { icon: "star", value: repo.stargazers_count },
                { icon: "language", value: repo.language },
                { icon: "fork", value: repo.forks },
              ].map((item: { icon: string; value: number | string }) =>
                item.value
                  ? ((typeof item.value === "number" && item.value > 0) ||
                      (typeof item.value === "string" &&
                        item.value.length > 0)) && (
                      <p
                        key={item.icon}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "1rem",
                          marginBottom: "10px",
                          textAlign: "center",
                        }}
                      >
                        <img
                          src={`https://raw.githubusercontent.com/Ionut767/Github.Search/main/src/assets/${item.icon.toLocaleLowerCase()}.svg`}
                          alt={item.icon}
                          style={{
                            width: "20px",
                            height: "20px",
                            margin: "2px",
                          }}
                        />
                        {item.icon[0].toUpperCase() + item.icon.slice(1)}:{" "}
                        {item.value}
                      </p>
                    )
                  : null
              )}
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
  );
}
