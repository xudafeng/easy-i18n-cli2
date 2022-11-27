#!/usr/bin/env node

'use strict';

const { EOL } = require('os');
const path = require('path');
const { program } = require('commander');

const { version } = require('../package');

program
  .option('-v, --version')
  .option('-c, --config <string>', 'config file path');

program.parse();

const options = program.opts();

if (options.version) {
  console.info('%s  %s%s', EOL, version, EOL);
  process.exit(0);
}

let config = {};

if (options.config) {
  const configPath = path.resolve(process.cwd(), options.config);
  config = {
    ...config,
    ...require(configPath),
  };
}

require('../lib/easy-i18n')(config);
