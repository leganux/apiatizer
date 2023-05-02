#! /usr/bin/env node

'use strict';
const readline = require('readline');
const {stdin: input, stdout: output} = require('process');

const core = require('../lib');
const program = require('commander');
const pkg = require('../package.json');

program.version(pkg.version, '-v, --version');

// API commands

const {getGitData} = require('../lib/utils/git');
const {getAllFiles} = require('../lib/utils/files');

program
    .command('endpoint:create <model_name>')
    // .option('-s, --styles [style]', 'Select styles pre-processor for developing')
    .action(async (name, cmd) => {
        //Force to be camelCase TODO
        const git = getGitData();

        const schema = [];

        const readLineInterface = readline.createInterface({input, output});

        const ask = async (question) => {
            return new Promise(resolve => {
                readLineInterface.question(question, input => resolve(input));
            });
        };

        let newParam = true;

        while (newParam) {
            const item = {};
            let isDependency = false;
            try {
                item.name = await ask('Add param name : ');
                const type = await ask(`Choose a type : 
            1. String
            2. Number
            3. Boolean
            4. Date
            5. ObjectId
            6. Array of ObjectId
            7. Object
            > `);

                switch (type) {
                    case '1':
                    case 'String':
                    case 'string':
                    default:
                        item.type = 'String';
                        break;
                    case '2':
                    case 'Number':
                    case 'number':
                        item.type = 'Number';
                        break;
                    case '3':
                    case 'Boolean':
                    case 'boolean':
                        item.type = 'Boolean';
                        break;
                    case '4':
                    case 'Date':
                    case 'date':
                        item.type = 'Date';
                        break;
                    case '5':
                    case '6':
                    case 'ObjectId':
                        item.type = 'Schema.Types.ObjectId';
                        isDependency = true;
                        break;
                    
                    case '7':
                    case 'Object':
                    case 'object':
                        item.type = 'Schema.Types.Mixed';
                       
                        break;
                }
                if(isDependency) {
                    let models = getAllFiles(`${process.cwd()}/models`);
                    models = models.map(model => model.split('/').reverse()[0]);
                    models = models.filter(model => {
                        const regex = /.model.js/;
                        return regex.test(model);
                    });
                    const dependencyModelIndex = await ask(`Select model: 
                       ${models.map((model, index) => `${index + 1}. ${model}
                       > `)}
                    `.replace(/,/mg, ''));
                    item.dependencyModel = models[dependencyModelIndex - 1].replace('.js', '');
                }
                const another_param = await ask(`Add new param : 
            1. Yes
            2. No
            > `);
                schema.push(item);
                newParam = another_param === '1' || another_param.trim().toLowerCase() === 'yes' || another_param.trim().toLowerCase() === 'y';
            } catch (e) {
                console.log(`Error: `, e);
            }
        }

        readLineInterface.close();

        core.api.model.createModel({
            username: git.user.email,
            full_name_developer: git.user.name,
            current_date: new Date(),
            model_name: name,
            dependencies: schema.reduce((lines, item) => {
                if(item?.dependencyModel && item.dependencyModel !== '') {
                    return lines + `const ${item.dependencyModel.replace('.model', '')}Model = require('./${item.dependencyModel}');
`;
                } else {
                    return '';
                }
            }, ''),
            schema_rows: schema.reduce((lines, item) => {
                const isRef = item.dependencyModel && item.dependencyModel !== '';
    return lines + `${item.name} : {
        type: ${item.type},
        ${isRef ? `ref: ${item.dependencyModel.replace('.model', '')}Model,` : ''}
    },
    `
            }, ''),
        });
        core.api.controller.createController({
            username: git.user.email,
            full_name_developer: git.user.name,
            current_date: new Date(),
            controller_name: name,
            dependencies: schema.reduce((lines, item) => {
                if(item?.dependencyModel && item.dependencyModel !== '') {
                    return lines + `const ${item.dependencyModel.replace('.model', '')}Model = require('../models/${item.dependencyModel}');
`;
                } else {
                    return '';
                }
            }, ''),
            populate: schema.reduce((lines, item) => {
                if(item?.dependencyModel && item?.dependencyModel !== '') {
                    return lines + `{
        path: '${item.name}',
        model: ${item?.dependencyModel.replace('.model', '')}Model
    },
    `;
                } else {
                    return '';
                }
            }, ''),
            validation_rows: schema.reduce((lines, item) => {
    return lines + `${item.name}: '${item.type.toLowerCase()}',
    `
            }, ''),
        });
        core.api.route.createRoute({
            username: git.user.email,
            full_name_developer: git.user.name,
            current_date: new Date(),
            route_name: name
        });
    });

program.parse(process.argv);
