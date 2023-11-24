const { Router } = require("express");

const routes = new Router()

routes.get("/hola", (req, res) => {

  return res.json({message: "hola que tal"})
});

module.exports = routes

