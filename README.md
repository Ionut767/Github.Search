# GitHub.Search 🔍

Extension preview:

<p align="center">
  <img src="./src/assets/banner.png" alt="GitHub User Fetcher Banner">
</p>

Welcome to GitHub.Search! 👋 A simple React extension designed for fetching and displaying GitHub user profiles and repositories. 📄

## 🎉 Features

- Fetch GitHub user profiles by username. 👤
- Fetch GitHub repositories by name. 📚
- Display user profile information, including followers, following, and bio. 📝
- Display repository information, including name, description, and stars. ⭐
- Clear the fetched user data. 🗑️
- Clear the fetched repository data. 🗑️

## How To Add It To Your Chrome Extensions

#### Requirements are [Node.js](https://nodejs.org/) and [bunjs](https://bun.sh/) (bunjs is optional)

- Dowload the project from [here](https://github.com/Ionut767/Github.Search/archive/refs/heads/main.zip) (Github.Search-main.zip)
- Unzip the project
- Open your terminal and navigate to the project directory
- Run `npm install` or `bun install` in the terminal, then run `npm run build` or `bun run build`
- Open Chrome and go to `chrome://extensions`
- Click on `Load unpacked extension...` and go to the project directory, then select the `dist` folder ("`../path/to/Github.Search-main/dist`")
- Add the extension to your Chrome Extensions

🎊 Now you can use the extension! 🚀

## 🔩 How It Works

- Enter a GitHub username in the input field and click the "Fetch Profile" button. The extension will fetch the user's profile data from the GitHub API and display it on the page. You can clear the fetched data by clicking the "Clear" button. 🔄
- Enter a GitHub repository name in the input field and click the "Fetch Repository" button. The extension will fetch the repository's information from the GitHub API and display it on the page. You can clear the fetched data by clicking the "Clear" button. 🔄

## 📝 Code Overview

The main component of this extension is `App`. It uses React hooks to manage state and fetch data from the GitHub API. The `User` and `Repo` interfaces define the shape of the user and repository data, respectively.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue. 🎉

## 📃 License

This project is licensed under the [MIT](/LICENSE). See the LICENSE file for details. 📝

## ⚠️ Warning

This project is a fan-made extension and is not affiliated with GitHub, Inc. Any issues or concerns should be directed to the individual maintaining this project!

Please note that this project is a personal initiative and is not endorsed by GitHub, Inc. GitHub provides the data used by this extension through their API, which is free to use under their rules/terms. This project does not host any data on an external server/source, and it is not responsible for any actions taken by users with the extension. The code is publicly available, and users are free to modify it as they see fit on their own systems. It is also not affiliated with GitHub, Inc.!!! I am not responsible for any actions taken by users with the extension.
