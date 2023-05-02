const fs = require('fs');

const createController = (args) => {
    let fileTemplate = fs.readFileSync(`${__dirname}/templates/controller.tpl`, {encoding: 'utf-8'});
    for (const prop in args) {
        const regexSeeker = new RegExp(`{{${prop}}}`, 'gm');
        fileTemplate  = fileTemplate.replace(regexSeeker, args[prop]);
    }
    fs.writeFileSync(`${process.cwd()}/controllers/${args['controller_name']}.controller.js`, fileTemplate, {encoding: 'utf-8'});
    console.log(`[APIATIZER]: Controller ${args['controller_name']} created`);
};

module.exports = {
    createController,
};