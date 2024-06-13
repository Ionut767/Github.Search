import React from "react";
import { User } from "../types";

export default function Profile({
  user,
  username,
}: {
  user: User;
  username: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "15rem",
        height: "100%",
        // paddingInline: "5rem",
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
          className="button"
          style={{
            marginBottom: "10px",
            padding: "10px",
            //   cursor: "pointer",
            //   color: "white",
            backgroundColor: "#2C3034",
            width: "100%",
            //   border: "1px solid #21262D",
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
      {user.location && <p style={{ fontSize: "1.125rem" }}>{user.location}</p>}
    </div>
  );
}
