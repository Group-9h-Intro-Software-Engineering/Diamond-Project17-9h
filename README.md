# CaSMM

> Computation and Science Modeling through Making

Cloud-based programming interface

![Deploy Staging](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Staging/badge.svg)
![Deploy Production](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Production/badge.svg)

<br/>

# Project 17: Teacher View and Lesson Creation

## Team 9h Members
- Kevin Pham (Project Manager)
- Loc Dinh (Scrum Master)
- Jack Ditzel
- Gilon Kravatsky
- Ryan Hulke
- Michael Tumminia

## Features Implemented
-  Roster Search (Kevin): Search through a list of students in the roster to find a specific one
![Screenshot 2023-12-13 161640](https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h/assets/93224729/c9667577-11ce-4bcd-9e16-f3a0e681c319)
-  Roster Grouping (Kevin): Group students into specific subsections from the roster
![image](https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h/assets/93224729/531042a7-8ad9-4938-a9b3-6ff8ad89b038)
![image](https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h/assets/93224729/18ced630-f1d8-4ea3-adb6-f9c494e8282c)
![image](https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h/assets/93224729/20d4d2ac-1ae9-4496-8ffa-3adfcfbcc925)

-  Active Assignment (Loc): Display current active unit and lesson standard, stylized hover effects
![image](https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h/assets/93224729/48865674-1b36-4026-831e-021fcb6c4007)
![image](https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h/assets/93224729/cfd7246b-62da-4960-bd7d-5e21ef97af20)

-  Lesson Saving (Gilon): Autosave workspace every 1 second, can still be manually saved as well
-  Lesson Navigation (Gilon): Allows for lesson sharing between teachers, modified Strapi backend
-  Tutorial/Help (Gilon): Display basic help button for teachers, dynamically sized help box
-  Lesson Editor Page Table (Jack): Display sorted lessons from Content Creator by grade level inside of a stylized table
![image](https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h/assets/93224729/c11b3d3c-cd6e-4953-9487-3c7374a47c41)
![image](https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h/assets/93224729/c24713b7-158b-4654-9e04-0bd08c64c3af)

-  Lesson from Homepage Access (Michael): Button for teachers to assign/unassign an activity as well as saving for future use
![image](https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h/assets/93224729/d8bcbebf-04cf-4d34-87af-274ff1de7692)
![image](https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h/assets/93224729/942d0804-8713-4ba6-98b3-26e3bd79d1cd)
![image](https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h/assets/93224729/d0106aa0-c118-4ca9-9544-9d79a95805a1)

-  Create New Lesson (Ryan): Functional lesson creation with stylized button
![image](https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h/assets/93224729/1901c4ae-69da-43fb-b151-5ed1911d94bc)

## Instructions to Run

### Option 1: Update teacher permissions manually
1. Lauch Docker app and run `docker compose up` in main project directory
2. Open `localhost:1337/admin` in browser, and sign in with test credentials (username: superadmin@mail.com, password: TN9q6RZhDaw6)
3. Navigate to Settings -> Roles -> Classroom Manager
4. Update roles to match the following screenshots, then press "Save":
![image](https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h/assets/93224729/23919975-4b1b-4a50-aee0-310061cd9b12)
![image](https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h/assets/93224729/ada0dc9d-57dd-4676-ad42-764c9a93ce12)
![image](https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h/assets/93224729/e5b63d95-8a09-45d7-84cc-1955fd8f0a50)
![image](https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h/assets/93224729/52fadd8b-b6e6-4dcf-9f8a-31430e4a0208)



### Update teacher permissions with code


## Application

### `client` 
[client](/client#client) is the frontend of the application. It is powered by [React](https://reactjs.org/) and [Blockly](https://developers.google.com/blockly).

### `server`

[server](/server#server) is the web server and application server. It is powered by [Node](https://nodejs.org/en/) and [Strapi](https://docs-v3.strapi.io/developer-docs/latest/getting-started/introduction.html).

### `compile`

  [compile](/compile#compile) is an arduino compiler service. It is an unofficial fork of [Chromeduino](https://github.com/spaceneedle/Chromeduino).

<br/>

## Environments

> The project is divided into three conceptual environments.

### Development
#### Structure

The development environment is composed of five servers. The first one is run with the [Create React App](https://create-react-app.dev/docs/getting-started/) dev server. The later four are containerized with docker and run with [docker compose](https://docs.docker.com/compose/).

* `casmm-client-dev` - localhost:3000

* `casmm-server-dev` - localhost:1337/admin

* `casmm-compile-dev` 

* `casmm-db-dev` - localhost:5432

  > The first time the db is started, the [init_db.sh](/scripts/init_db.sh) script will run and seed the database with an environment specific dump. Read about Postgres initialization scripts [here](https://github.com/docker-library/docs/blob/master/postgres/README.md#initialization-scripts). To see how to create this dump, look [here](https://github.com/DavidMagda/CaSMM_fork_2023/blob/develop/scripts/readme.md).

* `casmm-compile_queue-dev`

#### Running

`casmm-client-dev`

1. Follow the [client](/client#setup) setup
2. Run `yarn start` from `/client`

`casmm-server-dev`, `casmm-compile-dev`, `casmm-db-dev`, and `casmm-compile_queue-dev`

1. Install [docker](https://docs.docker.com/get-docker/)

2. Run `docker compose up` from `/`

   > Grant permission to the **scripts** and **server** directories if you are prompted
   

### Staging

#### Structure

The staging environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm-staging` - [casmm-staging.herokuapp.com](https://casmm-staging.herokuapp.com/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm-staging` is automatically built from the latest commits to branches matching `release/v[0-9].[0-9]`. Heroku runs the container orchestration from there.

### Production

#### Structure

The production environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm` - [www.casmm.org](https://www.casmm.org/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm` is automatically built from the latest commits to `master`. Heroku runs the container orchestration from there.

<br/>

## Maintenance

All three components of the application have their own dependencies managed in their respective `package.json` files. Run `npm outdated` in each folder to see what packages have new releases. Before updating a package (especially new major versions), ensure that there are no breaking changes. Avoid updating all of the packages at once by running `npm update` because it could lead to breaking changes. 

### Strapi

This is by far the largest and most important dependency we have. Staying up to date with its [releases](https://github.com/strapi/strapi/releases) is important for bug/security fixes and new features. When it comes to actually upgrading Strapi make sure to follow the [migration guides](https://docs-v3.strapi.io/developer-docs/latest/update-migration-guides/migration-guides.html#v3-guides)!

<br/>

## CI/CD

All of the deployments and releases are handled automatically with [GitHub Actions](https://docs.github.com/en/actions). The workflows implement custom [Actions](https://github.com/STEM-C/CaSMM/actions) that live in the [auto](https://github.com/STEM-C/auto) repo.

<br/>

## Contributing

### Git Flow 

> We will follow this git flow for the most part — instead of individual release branches, we will have one to streamline staging deployment 

![Git Flow](https://nvie.com/img/git-model@2x.png)

### Branches

#### Protected

> Locked for direct commits — all commits must be made from a non-protected branch and submitted via a pull request with one approving review

- **master** - Production application

#### Non-protected

> Commits can be made directly to the branch

- **release** - Staging application
- **develop** - Working version of the application
- **feature/<`scaffold`>-<`feature-name`>** - Based off of develop
  - ex. **feature/cms-strapi**
- **hotfix/<`scaffold`>-<`fix-name`>** - Based off of master
  - ex. **hotfix/client-cors**

### Pull Requests

Before submitting a pull request, rebase the feature branch into the target branch to resolve any merge conflicts.

- PRs to **master** should squash and merge
- PRs to all other branches should create a merge commit
