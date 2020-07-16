# SpeakEasy.tools

SpeakEasy.tools is a data-driven web application for helping people to 
learn a second language through artificial intelligence, data science, immersion, and 
gamification.

## Dependencies

* [Node.js](https://nodejs.org/en/)
* [yarn](https://yarnpkg.com/), installable by doing `npm install -g yarn`

## Installation

This project uses [yarn](https://yarnpkg.com/) package manager to handle its dependencies, and related
lockfile. With Node.js and yarn installed, you can install the project dependencies by doing `yarn install`.
You can then run the application locally by running `yarn start`.

### Yarn Scripts

* `yarn install` Installs dependencies listed in *package.json*
* `yarn start` Runs the application locally at http://localhost:3000
* `yarn build` Builds an optimized bundle for production
* `yarn build:deploy` Builds the project, and then copies files to the speakeasy server. You should _not_ use this!
* `yarn lint` Shows smelly code that you should fix
* `yarn lint:fix` Attempst to fix all that smelly code for you

## Contributing

Pull requests are welcomed. For major changes, please open an issue first to discuss
what you would like to change.

## License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)
