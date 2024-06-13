import { settings } from "./types";

chrome.storage.local.get(["settings"], (result) => {
  const { settings: userSettings } = result;

  if (!userSettings) {
    chrome.storage.local.set({ settings: {} as settings });
    return "No settings found";
  }
  return userSettings;
});
