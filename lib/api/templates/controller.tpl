/*
* Auto-genered by <{{username}}> : {{full_name_developer}}
* Date: {{current_date}}
* Controller: {{controller_name}}
*/

const apiato = require('apiato');
const {{controller_name}}Model = require('../models/{{controller_name}}.model');
const ms_{{controller_name}} = new apiato();

{{dependencies}}

const validationObject = {
    {{validation_rows}}
};

const populate = [
    {{populate}}
];

const options = {};

const beforeCallback = async (request) => {
    // TODO: Do something nice!
    return request;
};

const afterCallback = async (response) => {
    // TODO: Do something awesome!
    return response;
};


// Add here pipeline for datatable
let aggregate_pipeline_dt = []

// Add here piepline for custom route
let aggregate_pipeline = []

const functions = {
    createElement: ms_{{controller_name}}.createOne({{controller_name}}Model, validationObject, populate, options, beforeCallback, afterCallback),
    createElements: ms_{{controller_name}}.createMany({{controller_name}}Model, validationObject, populate, options, beforeCallback, afterCallback),
    getOneElement: ms_{{controller_name}}.getOneWhere({{controller_name}}Model, populate, options, beforeCallback, afterCallback),
    getElementById: ms_{{controller_name}}.getOneById({{controller_name}}Model, populate, options, beforeCallback, afterCallback),
    getElements: ms_{{controller_name}}.getMany({{controller_name}}Model, populate, options, beforeCallback, afterCallback),
    updateOrCreateElement: ms_{{controller_name}}.findUpdateOrCreate({{controller_name}}Model, validationObject, populate, options, beforeCallback, afterCallback),
    findAndUpdateElement: ms_{{controller_name}}.findUpdate({{controller_name}}Model, validationObject, populate, options, beforeCallback, afterCallback),
    updateElementById: ms_{{controller_name}}.updateById({{controller_name}}Model, validationObject, populate, options, beforeCallback, afterCallback),
    deleteElementById: ms_{{controller_name}}.findIdAndDelete({{controller_name}}Model, options, beforeCallback, afterCallback),
    /*
        You can modify the response for each basicCRUD function.
        Ej.

    getElements: ms_{{controller_name}}.getMany({{controller_name}}Model, populate, options, beforeCallback, async (response) => {
        // response.data [MODIIFY]
        return response;
    ),
    */
    datatable: ms_{{controller_name}}.datatable_aggregate({{controller_name}}Model, aggregate_pipeline_dt, 'name,description,order'),
    aggregate: ms_{{controller_name}}.aggregate({{controller_name}}Model,aggregate_pipeline ),

    // Here, you can add your custom services
}

module.exports = functions;
