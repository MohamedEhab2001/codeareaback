const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const DemoTemplate = ejs.compile(
  fs.readFileSync(path.resolve(__dirname, "demo.html"), "utf8")
);

const PayementTemplate = ejs.compile(
  fs.readFileSync(path.resolve(__dirname, "payment.html"), "utf8")
);

const TechTemplate = ejs.compile(
  fs.readFileSync(path.resolve(__dirname, "tech.html"), "utf8")
);

const RenewTemplate = ejs.compile(
  fs.readFileSync(path.resolve(__dirname, "renew.html"), "utf8")
);

module.exports = {
  DemoTemplate,
  PayementTemplate,
  TechTemplate,
  RenewTemplate,
};
