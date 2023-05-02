/*
* Auto-genered by <{{username}}> : {{full_name_developer}}
* Date: {{current_date}}
* Model: {{model_name}}
*/

const mongoose = require('mongoose');
const {Schema} = mongoose;
const dataTables = require('mongoose-datatables-fork');

{{dependencies}}

const {{model_name}}Model = new Schema({
    {{schema_rows}}
},{
    timestamps:true
});

{{model_name}}Model.plugin(dataTables);
module.exports = mongoose.model('{{model_name}}', {{model_name}}Model);
