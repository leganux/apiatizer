const gitconfig = require('git-config-path');
const parse = require('parse-git-config');
const _extend = require('extend-shallow');

const getGitData = (options) => {
    const gitConfig = gitconfig(_extend({type: 'global'}, options && options.gitconfig));
    options = _extend({cwd: '/', path: gitConfig}, options);
    return parse.sync(options) || {};
};

module.exports = {getGitData};
