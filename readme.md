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

## How to use

The following command generates the monorepo structure:
```sh
generate-monorepo
```

The following command adds a react app to the monorepo:
```sh
create-react-app <app-name> --o=<owner-name> --d=<app-description>
```

The following command adds a TS library to the monorepo:
```sh
create-ts-library <library-name> --o=<owner-name> --d=<library-description>
```
