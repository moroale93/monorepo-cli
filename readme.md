[![CICD](https://github.com/moroale93/monorepo-cli/actions/workflows/main.yml/badge.svg?branch=main&event=push)](https://github.com/moroale93/monorepo-cli/actions/workflows/main.yml)
[![NPM version](http://img.shields.io/npm/v/frontend-monorepo-cli.svg)](https://www.npmjs.org/package/frontend-monorepo-cli)

## How to setup
This project is a CLI to setup a monorepo and create various types of packages.

```sh
npm install -g frontend-monorepo-cli
```

### CI/CD
Create a new Environment ou you GitHub project named `cicd`.
Add now the following secrets:
- GIT_PUBLISHER_EMAIL: email of the publisher
- NPM_TOKEN: token for the npm registry

## How to's
### How to generate the monorepo
Before you can use the CLI, you need to create a new repository.
Once done, you enter the repo and run the following command:
```sh
generate-monorepo
```
This setups the monorepo structure.

### How to add a React application package to the monorepo
You just need to execute the following command from the root of the monorepo:
```sh
create-react-app <app-name> --o=<owner-name> --d=<app-description>
```
PS: options are optional.

### How to add a Typescript library package to the monorepo
You just need to execute the following command from the root of the monorepo:
```sh
create-ts-library <library-name> --o=<owner-name> --d=<library-description>
```
PS: options are optional.

### How to setup the CICD
Github Actions is the CICD system.
To make it working, you need to create a new environment at repository level.
The name of the environment is `cicd`.
Once done, you should add the following secrets to the `cicd` environment:
- CF_API_KEY = The Cloudflare global API key 
- CF_API_TOKEN = The Cloudflare global API token
- CF_EMAIL = The Cloudflare global email
- CF_ZONE_ID = The Cloudflare zone id to deploy the application 
- NPM_TOKEN = Your npm token (with publishing rights)
- GIT_PUBLISHER_EMAIL = The email of your gihub repo contributor, which will be used as the publisher of new versions

When you open a PR on github, the code will be checked (linted, tested and built).
When a PR is merged to the main branch, every TS libary will be deployed to NPM, and every React app will be deployed to Cloudflare (to a staging site).
When you create a Github release, and every React app will be deployed to Cloudflare (to the production site).

### How to get the Cloudflare secrets
- CF_ZONE_ID = You can find it on the Cloudflare dashboard homepage, clicking on the website you want to deploy to, and you find it on the right side of the page.
- CF_EMAIL = The email of the Cloudflare account owner
- CF_API_KEY = You can generate one from your profile page > API Tokens > Global API Key
- CF_API_TOKEN = You can generate one from your profile page > API Tokens > Create Token > Edit Cloudflare Workers
