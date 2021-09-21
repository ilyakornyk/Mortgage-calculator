const express = require(`express`);
const route = express.Router();
const services = require(`../services/render`);
const controller = require(`../controller/controller`);

// @ Root Route
route.get(`/`, services.homeRoutes);

route.get(`/add-bank`, services.add_bank);

route.get(`/mortgage-calculator`, services.mortgage_calculator);

route.get(`/update-bank`, services.update_bank);
route.get(`/make-table`, services.table);

// API
route.post(`/api/banks`, controller.create);
route.get(`/api/banks`, controller.find);
route.put(`/api/banks/:id`, controller.update);
route.delete(`/api/banks/:id`, controller.delete);

module.exports = route;