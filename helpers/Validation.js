const { badRequest, notFound } = require("../errors");

const isHere = (key) => {
  if (!key) {
    throw new badRequest("Provide data", ``);
  }
};

const isHere_notfound = (key) => {
  if (!key) {
    throw new notFound("No booking with this id", "");
  }
  if (key.length == 0) {
    throw new notFound("No booking with this id", "");
  }
};

module.exports = {
  isHere,
  isHere_notfound,
};
