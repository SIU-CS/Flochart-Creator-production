# Client Side

Used 'create-react-app' to get a boilerplate up and running. Directory structure is as follows:
```
.
├── config
│   ├── env.js
│   ├── jest
│   │   ├── cssTransform.js
│   │   └── fileTransform.js
│   ├── paths.js
│   ├── polyfills.js
│   ├── webpack.config.dev.js
│   └── webpack.config.prod.js
├── node_modules
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── scripts
│   ├── build.js
│   ├── start.js
│   └── test.js
└── src
    ├── assets
    │   └── index.css
    ├── components
    │   └── App.js
    └── index.js
```

| Important File/Directory     | Purpose                                                              |
|------------------------------|----------------------------------------------------------------------|
| config                       | Holds react and webpack config files.                                |
| config/webpack.config.dev.js | Webpack config file run with "npm start."                            |
| config/webpack.config.dev.js | Webpack config file run with "npm build."                            |
| node_modules                 | Packages installed via npm.                                          |
| package.json                 | List of saved packages stored in npm_modules.                        |
| public                       | Where react runs its code.                                           |
| public/index.html            | Index page for the site. React plugs into the div with id="root"     |
| scripts                      | Scripts to run webpack and npm. Run 'npm start' to start dev server. |
| src                          | All the actual React stuff.                                          |
| src/assets                   | CSS, SASS, images, documents, etc can be stored here.                |
| src/components               | Any React components should go here.                                 |
| src/components/App.js        | A sample component for example.                                      |
| src/index.js                 | Entry point for React.                                               |

