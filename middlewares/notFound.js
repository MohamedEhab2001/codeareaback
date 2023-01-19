const not_found = (req, res) =>
  res
    .status(404)
    .send(
      "The route is incorrect or you request a route with unsupported METHOD"
    );
module.exports = not_found;
