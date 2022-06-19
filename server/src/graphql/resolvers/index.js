const path = require("path");
const { mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const resolversArray = loadFilesSync(path.join(__dirname), {
    extensionsü: ["js"], extractExports: fileExport => typeof fileExport === 'function' ? fileExport('query_root') : fileExport
});

module.exports = mergeResolvers(resolversArray);