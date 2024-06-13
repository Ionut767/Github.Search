export type User = {
  followers: number;
  following: number;
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  email: string;
  location: string;
};
export type settings = {
  // Button
  animatedButton: boolean;
  animatedButtonColor: string;
  animatedButtonTextColor: string;
  animatedButtonBorderColor: string;
  animatedButtonBorderColorHover: string;
  // Background
  backgroundColor: string;
  // Text
  textColor: string;
  // Avatar
  avatarPosition: "left" | "right" | "center";
  avatarSize: "small" | "medium" | "large";
  avatarBorderColor: string;
  avatarBorderColorHover: string;
  avatarBorderRadius: string;
  avatarBorderRadiusHover: string;
  // Username
  usernamePosition: "left" | "right";
  usernameColor: string;
  usernameColorHover: string;
  usernameSize: "small" | "medium" | "large";
  usernameFontWeight:
    | "normal"
    | "bold"
    | "bolder"
    | "lighter"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  usernameFontWeightHover:
    | "normal"
    | "bold"
    | "bolder"
    | "lighter"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  usernameFontStyle: "normal" | "italic" | "oblique";
  usernameFontStyleHover: "normal" | "italic" | "oblique";
  usernameFontFamily: string;
  usernameFontFamilyHover: string;
  usernameFontVariant: "normal" | "small-caps";
  usernameFontVariantHover: "normal" | "small-caps";
  usernameTextDecoration: "none" | "underline" | "overline" | "line-through";
  usernameTextDecorationHover:
    | "none"
    | "underline"
    | "overline"
    | "line-through";
  usernameTextAlign: "left" | "right" | "center" | "justify";
  usernameTextAlignHover: "left" | "right" | "center" | "justify";
  usernameTextTransform: "none" | "capitalize" | "uppercase" | "lowercase";
  usernameTextTransformHover: "none" | "capitalize" | "uppercase" | "lowercase";
};
