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
const ModelKeysValidate = (attributes, body, arrOfIgnore = []) => {
  const noNeed = [
    "id",
    "created_at",
    "updated_at",
    "createdAt",
    "updatedAt",
    ...arrOfIgnore,
  ];
  const attributesKeys = Object.keys({ ...attributes });
  attributesKeys.forEach((key) => {
    if (!noNeed.includes(key) && !(key in body)) {
      throw new badRequest("Provide data", `cannot find ${key} in the JSON`);
    }
  });
};
module.exports = {
  isHere,
  isHere_notfound,
  ModelKeysValidate,
};
