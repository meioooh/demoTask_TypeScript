# My first project based on TypeScript + Playwright.

## It contains a few automated UI tests for [the-internet.herokuapp.com](https://the-internet.herokuapp.com/).

### Download project:

Before downloading, make sure **Git** is installed on your system.
Run CLI and type:
    _git -v_ or _git --version_

1. If it installed - you will see the version number in the output. 
2. If not, go to [Git](https://git-scm.com/install) and Install it Step-By-Step.



After that, project can be downloaded by simply running from CLI:
```git clone https://github.com/meioooh/demoTask_TypeScript.git```

### Install project:

To install dependencies you can read:
    _.github/workflows/playwright.yml_

or 
   1. Open CLI inside of cloned project;
   2. Run command ```npm ci``` & wait until it downloaded (**This installs packages from package.json**);
   3. Run command ```npx playwright install --with-deps``` & wait until it downloaded (**This installs Playwright Browsers**).


### Running tests:
   1. Open project folder **demoTask_TypeScript**;
   2. Run command ```npx playwright test```;
   3. Wait unti it finished;
   4. To view test-report, run command ```npx playwright show-report```.