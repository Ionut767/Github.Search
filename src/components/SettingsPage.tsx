export default function SettingsPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "320px",
        padding: "1rem",
        backgroundColor: "#0d1117",
        color: "#dcddde",
        fontFamily: "Whitney, sans-serif",
      }}
    >
      <h1>Settings</h1>
      <p style={{ marginBottom: "2rem", color: "#6A9955" }}>
        /** In working! <br /> Here is the design... */
      </p>
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          marginBottom: "2rem",
          padding: "1rem",
          borderRadius: "5px",
          backgroundColor: "#2f3136",
        }}
      >
        <h2>Avatar</h2>
        {renderSetting("Position", "avatarPosition", [
          "left",
          "right",
          "center",
        ])}
        {renderSetting("Size", "avatarSize", ["small", "medium", "large"])}
        {renderSetting("Border Color", "avatarBorderColor", null, "text")}
        {renderSetting(
          "Hover Border Color",
          "avatarBorderColorHover",
          null,
          "text"
        )}
        {renderSetting("Border Radius", "avatarBorderRadius", null, "text")}
        {renderSetting(
          "Hover Border Radius",
          "avatarBorderRadiusHover",
          null,
          "text"
        )}
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          marginBottom: "2rem",
          padding: "1rem",
          borderRadius: "5px",
          backgroundColor: "#2f3136",
        }}
      >
        <h2>Username</h2>
        {renderSetting("Position", "usernamePosition", ["left", "right"])}
        {renderSetting("Color", "usernameColor", null, "text")}
        {renderSetting("Hover Color", "usernameColorHover", null, "text")}
        {renderSetting("Size", "usernameSize", ["small", "medium", "large"])}
        {renderSetting("Font Weight", "usernameFontWeight", [
          "normal",
          "bold",
          "bolder",
          "lighter",
          "100",
          "200",
          "300",
          "400",
          "500",
          "600",
          "700",
          "800",
          "900",
        ])}
        {renderSetting("Hover Font Weight", "usernameFontWeightHover", [
          "normal",
          "bold",
          "bolder",
          "lighter",
          "100",
          "200",
          "300",
          "400",
          "500",
          "600",
          "700",
          "800",
          "900",
        ])}
        {renderSetting("Font Style", "usernameFontStyle", [
          "normal",
          "italic",
          "oblique",
        ])}
        {renderSetting("Hover Font Style", "usernameFontStyleHover", [
          "normal",
          "italic",
          "oblique",
        ])}
        {renderSetting("Font Family", "usernameFontFamily", null, "text")}
        {renderSetting(
          "Hover Font Family",
          "usernameFontFamilyHover",
          null,
          "text"
        )}
        {renderSetting("Font Variant", "usernameFontVariant", [
          "normal",
          "small-caps",
        ])}
        {renderSetting("Hover Font Variant", "usernameFontVariantHover", [
          "normal",
          "small-caps",
        ])}
        {renderSetting("Text Decoration", "usernameTextDecoration", [
          "none",
          "underline",
          "overline",
          "line-through",
        ])}
        {renderSetting("Hover Text Decoration", "usernameTextDecorationHover", [
          "none",
          "underline",
          "overline",
          "line-through",
        ])}
        {renderSetting("Text Align", "usernameTextAlign", [
          "left",
          "right",
          "center",
          "justify",
        ])}
        {renderSetting("Hover Text Align", "usernameTextAlignHover", [
          "left",
          "right",
          "center",
          "justify",
        ])}
        {renderSetting("Text Transform", "usernameTextTransform", [
          "none",
          "capitalize",
          "uppercase",
          "lowercase",
        ])}
        {renderSetting("Hover Text Transform", "usernameTextTransformHover", [
          "none",
          "capitalize",
          "uppercase",
          "lowercase",
        ])}{" "}
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          marginBottom: "2rem",
          padding: "1rem",
          borderRadius: "5px",
          backgroundColor: "#2f3136",
        }}
      >
        <h2>Button</h2>
        {renderSetting("Animated Button", "animatedButton", ["false", "true"])}
        {renderSetting("Button Color", "animatedButtonColor", null, "text")}
        {renderSetting("Text Color", "animatedButtonTextColor", null, "text")}
        {renderSetting(
          "Border Color",
          "animatedButtonBorderColor",
          null,
          "text"
        )}
        {renderSetting(
          "Hover Border Color",
          "animatedButtonBorderColorHover",
          null,
          "text"
        )}
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          marginBottom: "2rem",
          padding: "1rem",
          borderRadius: "5px",
          backgroundColor: "#2f3136",
        }}
      >
        <h2>Background</h2>
        {renderSetting("Background Color", "backgroundColor", null, "text")}
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          marginBottom: "2rem",
          padding: "1rem",
          borderRadius: "5px",
          backgroundColor: "#2f3136",
        }}
      >
        <h2>Text</h2>
        {renderSetting("Text Color", "textColor", null, "text")}
      </div>
    </div>
  );
}

function renderSetting(
  label: string,
  name: string,
  options: string[] | null = null,
  type: "select" | "text" = "select"
): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <label>{label}:</label>
      {type === "text" ? (
        <input
          type="text"
          name={name}
          id={name}
          style={{
            padding: "0.5rem",
            borderRadius: "3px",
            border: "none",
            backgroundColor: "#40444b",
            color: "#dcddde",
          }}
        />
      ) : (
        <select
          name={name}
          id={name}
          style={{
            padding: "0.5rem",
            borderRadius: "3px",
            border: "none",
            backgroundColor: "#40444b",
            color: "#dcddde",
          }}
        >
          {options &&
            options.map((option, index) => (
              <option key={index} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
        </select>
      )}
    </div>
  );
}
