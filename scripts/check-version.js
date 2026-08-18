const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const packageVersion = require(path.join(root, 'package.json')).version;
const versionFile = fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim();
const browserVersion = fs.readFileSync(path.join(root, 'version.js'), 'utf8').match(/version\s*=\s*'([^']+)'/);

if (versionFile !== packageVersion || !browserVersion || browserVersion[1] !== packageVersion) {
  throw new Error('VERSION, package.json, and version.js must use the same version.');
}
