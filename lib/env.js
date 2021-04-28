const {version} = require('../package.json');

const _version= Symbol.for('CPromise:version');
const _versionNumber= Symbol.for('CPromise:version:number');

const versionNumber=  version
  .split('.')
  .reverse()
  .reduce((computed, part, i)=> computed + part * Math.pow(1000, i), 0);

let warned= false;

const warnVersionInteraction = (thing) => {
  if (!warned) {
    warned = true;
    const meta = thing.constructor[_version];
    const versions = `v${version} <=> ${meta ? 'v' + meta.version : '<version older than v0.11.11>'}`;
    console.warn(
      `Interaction of multiple versions of CPromise detected (${versions}).
      Please update your dependencies to the latest version and avoid using multiple package versions at the same time`
    );
  }
  return thing;
}

module.exports= {
  version,
  _version,
  versionNumber,
  _versionNumber,
  warnVersionInteraction
}
