<div align="center">
  <a href="https://manna-jar.web.app/" style="margin-bottom:30px; margin-top:30px; display:block;"> 
    <h1>嗎 哪 罐 子</h1>
  </a>

 ![npm peer dependency version (scoped)](https://img.shields.io/npm/dependency-version/eslint-config-prettier/peer/eslint) ![License](https://img.shields.io/badge/License-MIT-blue)

  <p align="center">
    <a href="https://www.linkedin.com/in/yu-chien-yang-fe">About Me</a>
    |
    <a href="https://manna-jar.web.app/">Manna Jar</a>
    |
    <a href="https://youtu.be/XIifHA6auQI">Demo</a>
  </p>
</div>

## Manna Jar
A note-taking website/application for Chinese Christians.
Support size: 360px-1920px
- **AutoVerse**: An automatic biblical scripture input feature with an [open API](https://bible.fhl.net/json/), supporting various biblical abbreviation formats.
- **BackLinks**: Broaden your view to see this note in other contexts. Link relevant pages with one click.
- **GraphView**: The graph is your knowledge at a glance, lets you visualize the relationships between the notes in your vault and enabling navigate corresponding notes by clicking nodes.
- **AI summary**: Generates belief summaries based on recent notes and recommends review-worthy notes.
- **Share Via Links**: Enabled sharing articles with a link, with safeguards against duplicate collections and self-sharing.
- **Fontsize Switch**: Switch display fontsize of note for better reading experience.
## Link
[manna-jar.web.app](https://manna-jar.web.app/)

---*Experience Manna Jar without sign up*---

Id: john@gmail.com / Password: john12345
## About
- Utilized **Redux / RTK** for systematic state management, separated sync/async event logic with **Thunk**.
- Implemented **TypeScript** to ensure strict type checking to prevent development issues.
- Collaborated with **chatGPT** to develop *AutoVerse*, an automatic biblical scripture input feature using Regex and an [open API](https://bible.fhl.net/json/).
- Integrated *BackLinks*, a bidirectional note references using [Quill-mention](https://github.com/quill-mention/quill-mention), a well-designed data structure, and **Firestore** database, allowing for the creation of referenced lists on the front-end.
- Generated *GraphView* using [React graph vis](https://www.npmjs.com/package/react-graph-vis) and a designed data structure. Enabling users to navigate corresponding notes by clicking nodes. Handled node size and relevance filtering on the front-end.
- Integrated *AI summary* feature with [OpenAI API](https://openai.com/blog/openai-api).
- Enabled article *sharing via links*, including note data from the sharer through URLs.
- Implemented *font size switching* by updating CSS variables with **setProperty API**.
- Maintained user login status using **Firebase Auth** and **localStorage**.
- Employed **TailwindCSS** and **ClassNames** for efficient CSS management.

## Tech Stack
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) 
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Quill](https://img.shields.io/badge/Quill-52B0E7?style=for-the-badge&logo=apache&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
## Flow Chart
```mermaid
flowchart TB
A{Index} 
A -->|not login| B{Landing}
B --> E[About]
B --> F(Login/Signup)
A -->|login| C{Home}
C --> D[Profile/Logout]
C --> J[GraphView] -->|Navigate| K
K{Note} --> L(Editor) -->|Create Link|J
C --> G[Sermon notes] --> K
C --> H[Devotion notes] --> K
C --> I[Shared notes] --> K
```
## Demo
1. **AutoVerse**:Insert Bible Verse's easily into your notes just by typing them out. supporting various biblical abbreviation formats.
![autoVerse](./ReadmeGif/AutoVerse.gif)<br>
2. **BackLinks**: A bidirectional note referencing, allowing users to easily create references by typing "#" and selecting note titles from a dropdown. The feature also supports searching for specific notes.
![backLinks](./ReadmeGif/BackLinks.gif)
3. **GraphView**: The graph is your knowledge at a glance, lets you visualize the relationships between the notes in your vault and enabling navigate corresponding notes by clicking nodes.
![GraphView](./ReadmeGif/GraphView.gif)
4. **Fontsize Switch**: Switch display fontsize of note for better reading experience.
![Fontsize](./ReadmeGif/Fontsize.gif)
5. **Share Via Links**: Enabled sharing articles with a link, with safeguards against duplicate collections and self-sharing.
![Share](./ReadmeGif/ShareViaLink.gif)
