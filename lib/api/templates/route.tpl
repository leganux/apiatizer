/*
* Auto-genered by <{{username}}> : {{full_name_developer}}
* Date: {{current_date}}
* Route: {{route_name}}
*/

const express = require('express');

const api = express.Router();
const {{route_name}}Controller = require('../controllers/{{route_name}}.controller');

const md_Auth = require('../middleware/auth.middleware');

api.post('/{{route_name}}/', md_Auth.verify, {{route_name}}Controller.createElement);
api.post('/{{route_name}}/many', md_Auth.verify, {{route_name}}Controller.createElements);
api.get('/{{route_name}}/one/', md_Auth.verify, {{route_name}}Controller.getOneElement);
api.get('/{{route_name}}/:id', md_Auth.verify, {{route_name}}Controller.getElementById);
api.get('/{{route_name}}/', md_Auth.verify, {{route_name}}Controller.getElements);
api.put('/{{route_name}}/find_update_or_create/', md_Auth.verify, {{route_name}}Controller.updateOrCreateElement);
api.put('/{{route_name}}/find_where_and_update/', md_Auth.verify, {{route_name}}Controller.findAndUpdateElement);
api.put('/{{route_name}}/:id', md_Auth.verify, {{route_name}}Controller.updateElementById);
api.delete('/{{route_name}}/:id', md_Auth.verify, {{route_name}}Controller.deleteElementById);
api.post('/{{route_name}}/datatable/', md_Auth.verify, {{route_name}}Controller.datatable);
api.get('/{{route_name}}/aggregate/', md_Auth.verify, {{route_name}}Controller.aggregate);

module.exports = api;
