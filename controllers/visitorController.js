const { models } = require("../database/connect");
const addVisitor = async (req, res) => {
  const newVistor = await models.visitors.create(req.body);
  res.status(201).json(newVistor);
};

module.exports = {
  addVisitor,
};
