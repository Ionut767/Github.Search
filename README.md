# GitHub.Search 🔍

Extension preview:

<p align="center">
  <img src="./src/assets/banner.png" alt="GitHub User Fetcher Banner">
</p>

Welcome to the GitHub.Search! 👋 This is a simple React application that allows you to fetch and display user profiles from GitHub. 📄

## 🎉 Features

- Fetch GitHub user profiles by username. 👤
- Display user profile information, including followers, following, and bio. 📝
- Clear the fetched user data. 🗑️

## 🔩 How It Works

Enter a GitHub username in the input field and click the "Fetch Profile" button. The application will fetch the user's profile data from the GitHub API and display it on the page. You can clear the fetched data by clicking the "Clear" button. 🔄

## 📝 Code Overview

The main component of this application is `App`. It uses React hooks to manage state and fetch data from the GitHub API. The `User` interface defines the shape of the user data.

Here's a brief overview of the main functions in the `App` component:

- `fetchUser`: Fetches a user's profile data from the GitHub API. 📡
- `handleInputChange`: Updates the `username` state when the input field changes. ✍️
- `handleFetchClick`: Calls `fetchUser` when the "Fetch Profile" button is clicked. 💻
- `handleClearClick`: Clears the `username` and `user` states when the "Clear" button is clicked. 🗑️

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue. 🎉

## 📃 License

This project is licensed under the [MIT](/LICENSE). See the LICENSE file for details. 📝
