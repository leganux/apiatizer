const fs = require('fs');

const CONFIG_BASE = '// NEW ENDPOINTS';

const _addRouteIndex = (routeName) => {
    let apiRouteFile = fs.readFileSync(`${process.cwd()}/routes/_api.routes.js`, {encoding: 'utf-8'});
    apiRouteFile = apiRouteFile.replace(CONFIG_BASE, `${CONFIG_BASE}
    router.use('/', require('./${routeName}.routes'));
    `);
    fs.writeFileSync(`${process.cwd()}/routes/_api.routes.js`, apiRouteFile, {encoding: 'utf-8'});
};

const createRoute = (args) => {
    let fileTemplate = fs.readFileSync(`${__dirname}/templates/route.tpl`, {encoding: 'utf-8'});
    for (const prop in args) {
        const regexSeeker = new RegExp(`{{${prop}}}`, 'gm');
        fileTemplate  = fileTemplate.replace(regexSeeker, args[prop]);
    }
    fs.writeFileSync(`${process.cwd()}/routes/${args['route_name']}.routes.js`, fileTemplate, {encoding: 'utf-8'});
    console.log(`[APIATIZER]: Route ${args['route_name']} created`);
    _addRouteIndex(args['route_name']);
    console.log(`[APIATIZER]: Route ${args['route_name']} added to _api.routes`);
};

module.exports = {
    createRoute
};