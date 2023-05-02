const fs = require('fs');

const createModel = (args) => {
    let fileTemplate = fs.readFileSync(`${__dirname}/templates/model.tpl`, {encoding: 'utf-8'});
    for (const prop in args) {
        const regexSeeker = new RegExp(`{{${prop}}}`, 'gm');
       fileTemplate  = fileTemplate.replace(regexSeeker, args[prop]);
    }
    fs.writeFileSync(`${process.cwd()}/models/${args['model_name']}.model.js`, fileTemplate, {encoding: 'utf-8'});
    console.log(`[APIATIZER]: Model ${args['model_name']} created`);
};

module.exports = {
    createModel,
};