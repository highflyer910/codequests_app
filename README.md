# Codequests

<p align="center">
  <img src="https://res.cloudinary.com/highflyer910/image/upload/v1684951606/screencapture-localhost-5173-2023-05-24-22_03_36_thawoi.png" alt="Image 1" width="250" style="margin-right: 5px;">
  <img src="https://res.cloudinary.com/highflyer910/image/upload/v1684951606/screencapture-localhost-5173-2023-05-24-22_02_38_bzjzxm.png" alt="Image 2" width="250">
</p>

Have you ever found yourself with a long list of side projects, only to forget about them or struggle to keep track of them? If so, Qodequests is here to help! 🚀

Qodequests was born out of the personal experience of constantly forgetting about side projects. As a developer myself, I understand the struggle of juggling multiple ideas and losing track of what needs to be done. That's why I decided to create Qodequests – to provide a simple solution for organizing and managing side projects.

## Contributing

If you have ideas for new features, improvements, or bug fixes, please feel free to contribute! Simply fork this repository, make your changes, and submit a pull request. Together, we can make Qodequests even better!

## Roadmap

Qodequests is an ongoing project, and here are some of the features and improvements I'm planning to add:

- Project Details: Add descriptions, due dates, and other relevant information to each project.
- Task Management: Break down your projects into smaller tasks and track their progress.
- Collaboration: Invite others to collaborate on your projects and work together towards success.
- Notifications and Reminders: Get notified about project deadlines and upcoming tasks.

## Built using:

- [Vue](https://vuejs.org/)
- [Firebase](https://firebase.google.com/)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [Netlify](https://www.netlify.com/)


## Project Setup

| Command       | Action                                      |
| :------------ | :------------------------------------------ |
| `npm install` | Installs dependencies                       |
| `npm dev`     | Starts local dev server at `localhost:3000` |
| `npm build`   | Build your production site to `./dist/`     |

**Create a GitHub OAuth App:**
- Go to [GitHub Developer Settings](https://github.com/settings/developers) and click on "New OAuth App."
- Fill in the required details, such as the Application name, Homepage URL, and Authorization callback URL. 
- Once you've created the app, you will receive a Client ID and Client Secret.

**Configure Firebase:**
- Create a new Firebase project at [Firebase](https://firebase.google.com/)
- Enable GitHub as a sign-in provider and obtain your `Client ID` and `Client Secret` from the GitHub OAuth App settings.
- Retrieve your Firebase configuration containing your API keys, authentication details, and other necessary information.
- Update the `firebaseConfig` object with your Firebase configuration details.

## License

MIT
