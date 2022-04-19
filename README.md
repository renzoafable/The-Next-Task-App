<div id="top"></div>

<br />
<div align="center">
  <h1 align="center">The Next Task App</h1>

  <p align="center">
    An extremely simple Todo App (with an overly complicated implementation 🤣 ) built to reacquaint myself with NextJS as well as to apply some common tools and practices I use in my day-to-day life as a developer. 👨🏻‍💻
    <br />
    <br />
    <br />
    <a href="https://next-task-app.vercel.app/login">View Demo</a>
    ·
    <a href="https://github.com/renzoafable/The-Next-Task-App/issues">Report Bug</a>
    ·
    <a href="https://github.com/renzoafable/The-Next-Task-App/issues">Request Feature</a>
  </p>

  [![TypeScript][ts-shield]][ts-url]
  [![Sass][sass-shield]][sass-url]
  [![React][react-shield]][react-url]
  [![Bootstrap][bootstrap-shield]][bootstrap-url]

</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project 🙋</a>
      <ul>
        <li><a href="#goals">Goals 🎯</a></li>
      </ul>
      <ul>
        <li><a href="#built-with">Built With 🛠</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started 🚦</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites 👣</a></li>
        <li><a href="#installation">Installation 📀</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact ☎️</a></li>
    <li><a href="#acknowledgments">Acknowledgments 📜</a></li>
  </ol>
</details>

## About The Project 🙋

<div align="center">

  [![The Next App Screen Shot][product-screenshot]](https://next-task-app.vercel.app)

</div>

This project was supposed to be a quick refresher for NextJS. After a few hours since starting the project, the goal went from refreshing myself with NextJS to building a simple enough application that would allow me to incorporate technologies I use and practices I follow while building a NextJS app from scratch.

### Goals 🎯
In general, the main goals I had for this project were:

* To reacquaint myself with NextJS ✅
* To add tools I commonly use such as TypeScript, Sass, ESLint, etc. to a barebones NextJS project built using `create-next-app` ✅
* To learn how pre-rendering works in NextJS ✅
* To see how easy it is to deploy a NextJS app to Vercel ✅

<p align="right">(<a href="#top">back to top</a>)</p>

### Key Learnings 💡
Just some quick thoughts I had while building the app:

* The out of the box ESLint configuration of NextJS seems lacking so I had to configure it myself 😪
* The file-system based page routing is just... 🤯
* Adding TypeScript was a breeze with the `npm run dev` script
* I loved how redirects and rewrites can be done using the `next.config.js` file. I hate doing that through code. 🤣
* Deploying to Vercel was easy-peezy 🌬
* Overall, regardless of the type of app I'm gonna build in the future, I would now prefer NextJS over just plain ReactJS. The abstractions offered by NextJS are exactly what I would want from a ReactJS framework. Let's see! 🎉👏

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With 🛠

* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [Bootstrap](https://getbootstrap.com)
* [React-Bootstrap](https://react-bootstrap.github.io)
* [TypeScript](https://www.typescriptlang.org)
* [Sass](https://sass-lang.com)
* [Todo API from Postman](https://documenter.getpostman.com/view/8858534/SW7dX7JG#b341a08c-bd3a-49d3-8876-f6f02245e830)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started 🚦

This project was built using the `create-next-app` CLI. To get a local copy up, run the following simple steps.

### Prerequisites 👣

* NPM
  ```sh
  npm install npm@latest -g
  ```

### Installation 📀

1. Clone the repo and `cd` into that directory
    ```sh
    git clone https://github.com/renzoafable/The-Next-Task-App.git
    ```

2. Install NPM packages
    ```sh
    npm install
    ```

3. Start the development server
    ```sh
    npm run dev
    ```

4. Visit `localhost:3000` from your browser

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact ☎️

[![LinkedIn][linkedin-shield]][linkedin-url]
[![Github][github-shield]][github-url]
[![GMail][gmail-shield]][gmail-url]

<p align="right">(<a href="#top">back to top</a>)</p>

## Acknowledgments 📜

* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#top">back to top</a>)</p>

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/renzoafable
[github-shield]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://github.com/renzoafable
[ts-shield]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[ts-url]: https://www.typescriptlang.org
[sass-shield]: https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white
[sass-url]: https://sass-lang.com
[react-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[bootstrap-shield]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[gmail-shield]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[gmail-url]: mailto:renzoafable@gmail.com
[product-screenshot]: .docs/app_demo.gif
