const {promises: fs} = require('fs');
const path = require('path');
const https = require('https');

console.log('Deploying applications');

async function executeOnAppDirectories(commandPath, environment, callback) {
  const packages = await fs.readdir(commandPath);
  packages.filter(async function(package) {
    const packageJson = await fs.readFile(
        path.resolve(`${commandPath}/${package}`, './package.json'), 'utf8',
    );
    if (JSON.parse(packageJson).kind === 'react-app') {
      callback(package, environment);
    }
  });
}

function deploy(package, environment) {
  const cleanPackageName = package.replace(/-/g, '');
  const postData = JSON.stringify({
    type: 'CNAME',
    name: environment !== 'production' ?
      `${cleanPackageName}${environment}` : cleanPackageName,
    content: '@',
    ttl: 1,
    proxied: true,
  });

  const options = {
    hostname: `api.cloudflare.com`,
    port: 443,
    path: `/client/v4/zones/${process.env.CF_ZONE_ID}/dns_records`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
      'X-Auth-Email': process.env.CF_EMAIL,
      'X-Auth-Key': process.env.CF_API_KEY,
    },
  };

  const req = https.request(options, () => {
    console.log(`Package ${package} deployed to ${environment}`);
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.write(postData);
  req.end();
}

const index = process.argv.findIndex((val) =>
  ['development', 'staging', 'production'].indexOf(val) !== -1);

if (index === -1) {
  console.error('Please provide an environment as an argument');
  process.exit(1);
}

executeOnAppDirectories('./packages', process.argv[index], deploy);
