#!/usr/bin/env node
const executeCommand = require('./utils/execute-command');
const { promises: fs } = require('fs');
const yargs = require('yargs/yargs');
const path = require('path');
const { hideBin } = require('yargs/helpers');
const merge = require('deepmerge')
const reactAppJson = require('./templates/packageJsons/react-app.json');

const argv = yargs(hideBin(process.argv))
  .command('$0 <packageName>', 'Add a new React App to the monorepo', yargs => {
    yargs.positional('packageName', {
      describe: 'Name of the package, without a scope.',
      type: 'string',
    });
  })
  .options({
    d: {
      alias: 'description',
      describe: 'Description of the package.',
      type: 'string',
      default: 'This is a generated package',
    },
    o: {
      alias: 'owner',
      describe: 'Owner of the package.',
      type: 'string',
      default: undefined,
    },
  })
  .help()
  .argv;

async function createTsLibrary() {
  const root = process.cwd();
  const dirName = `packages/${argv.packageName}`;
  const pkgDir = path.resolve(root, dirName);
  let packageName = argv.packageName;
  if (argv.owner) {
    packageName = `${argv.owner}/${packageName}`;
  }

  try {
    // add the package with lerna
    await executeCommand(`lerna create ${packageName} --es-module  --description "${argv.d}" --yes`);
    // remove the wrong files
    await executeCommand(`rm -rf ${dirName}/src`);
    await executeCommand(`rm -rf ${dirName}/__tests__`);
    // add the libraries files
    await executeCommand(`cp -rf ${__dirname}/templates/react-app-base/ ./${dirName}`);
    // merges the package.json with the template
    const newPackageJson = await fs.readFile(path.resolve(pkgDir, './package.json'), 'utf8');
    await fs.writeFile(path.resolve(pkgDir, './package.json'), JSON.stringify(merge.all([JSON.parse(newPackageJson), reactAppJson]), null, 2));
    // install packages
    await executeCommand('yarn install');
    // create the wrangler file
    const wranglerFileContent = await fs.readFile(path.resolve(__dirname, './partial-templates/react-app-base/wrangler.toml'), 'utf8');
    const cleanPackageName = packageName.replace(/-/g, '');
    const replacedWranglerFileContent = wranglerFileContent.replace(/<APP-NAME>/g, cleanPackageName);
    await fs.writeFile(path.resolve(pkgDir, './wrangler.toml'), replacedWranglerFileContent);
    // add application links on readme
    await executeCommand(`rm ./packages/${packageName}/README.md`);
    await executeCommand(`echo "# ${packageName}" >> ./packages/${packageName}/README.md`);
    await executeCommand(`echo "" >> ./packages/${packageName}/README.md`);
    await executeCommand(`echo "## Application links" >> ./packages/${packageName}/README.md`);
    await executeCommand(`echo "" >> ./packages/${packageName}/README.md`);
    await executeCommand(`echo "- [Staging app](https://${cleanPackageName}staging.alemoretto.it)" >> ./packages/${packageName}/README.md`);
    await executeCommand(`echo "- [Production app](https://${cleanPackageName}.alemoretto.it)" >> ./packages/${packageName}/README.md`);
  } catch (error) {
    console.error(error);
  }
}

createTsLibrary();
