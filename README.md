# Manna Jar
A note-taking website/application for Chinese Christians.
Support size: 360px-1920px
## Link
[manna-jar.web.app](https://manna-jar.web.app/)

---*Experience Manna Jar without sign up*---

Id: john@gmail.com / Password: john12345
## Features
- **AutoVerse**: An automatic biblical scripture input feature with an [open API](https://bible.fhl.net/json/), supporting various biblical abbreviation formats.
- **BackLinks**: A bidirectional note references using [Quill-mention](https://github.com/quill-mention/quill-mention).
- **GraphView**: Create with [React graph vis](https://www.npmjs.com/package/react-graph-vis), enabling users to navigate corresponding notes by clicking nodes.
- **AI summary**: Generates belief summaries based on recent notes and recommends review-worthy notes, leveraging the [OpenAI API](https://openai.com/blog/openai-api).
- **Share Via Links**: Enabled sharing articles with a link, with safeguards against duplicate collections and self-sharing.
- **Fontsize Switch**: Switch display fontsize of note for better reading experience.
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
![autoVerse](https://github.com/kentyangfake/Manna-Jar/assets/41883118/ae85e14c-50ab-4650-96e8-cb46cde0de13)
![backLinks](https://github.com/kentyangfake/Manna-Jar/assets/41883118/a4c22a9f-9a52-4202-b10a-850b5d92c140)
## Contact
[LinkedIn](https://www.linkedin.com/in/yu-chien-yang-fe) / email: yuuchien.yang@gmail.com
