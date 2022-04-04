#!/usr/bin/env node

const executeCommand = require('./utils/execute-command');
const merge = require('deepmerge')
const monorepoPackageJson = require('./templates/packageJsons/monorepo.json');
const { promises: fs } = require('fs');
const path = require('path');

async function initialize() {
  const root = process.cwd();
  // initialize the monorepo
  await executeCommand('yarn init --yes');
  // add lerna
  // await executeCommand('yarn add -g lerna@^3.22.0');
  await executeCommand('yarn add -dev lerna@^3.22.0');
  // install packages
  await executeCommand('yarn install');
  // initialize lerna
  await executeCommand('yarn bin lerna init');
  // copy the monorepo files into the new monorepo
  await executeCommand(`cp -rf ${__dirname}/templates/monorepo/ ./`);
  // merges the package.json with the template
  const newPackageJson = await fs.readFile(path.resolve(root, './package.json'), 'utf8');
  await fs.writeFile(path.resolve(root, './package.json'), JSON.stringify(merge.all([JSON.parse(newPackageJson), monorepoPackageJson]), null, 2));
  const packageJson = JSON.parse(newPackageJson);
  // add application links on readme
  await executeCommand(`echo "[![Staging](https://github.com/moroale93/${packageJson.name}/actions/workflows/deployToStaging.yml/badge.svg?branch=main&event=push)](https://github.com/moroale93/${packageJson.name}/actions/workflows/deployToStaging.yml)" >> ./README.md`);
  await executeCommand(`echo "[![Production](https://github.com/moroale93/${packageJson.name}/actions/workflows/deployToProduction.yml/badge.svg)](https://github.com/moroale93/${packageJson.name}/actions/workflows/deployToProduction.yml)" >> ./README.md`);
  // install packages
  await executeCommand('yarn install');
}

initialize();
