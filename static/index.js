const ejs = require("ejs");
const fs = require('fs')
const path = require('path')

const compiled = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8'));
module.exports = compiled;
