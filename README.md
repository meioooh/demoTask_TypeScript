# My first project based on TypeScript + Playwright.

## It contains a few automated UI tests for [the-internet.herokuapp.com](https://the-internet.herokuapp.com/).

### Download project

Before downloading, make sure **Git** is installed on your system.
Run CLI and type:
    _git -v_ or _git --version_

1. If it installed - you will see the version number in the output. 
2. If not, go to [Git](https://git-scm.com/install) and Install it Step-By-Step.



After that, project can be downloaded by simply running from CLI:
**_git clone https://github.com/meioooh/demoTask_TypeScript.git_**

### Install project

To install dependencies you can read:
    _.github/workflows/playwright.yml_

or 
   1. Open CLI inside of cloned project;
   2. Run command _npm ci_ & wait until it downloaded (**This installs packages from package.json**);
   3. Run command _npx playwright install --with-deps_ & wait until it downloaded (**This installs Playwright Browsers**).


### Running tests
