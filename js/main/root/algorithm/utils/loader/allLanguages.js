/*
 * show all languages available
 */

module.exports.settings.parameters.language.options = Array.from(new Set(Object.values(module.exports.dict).map(Object.keys).flat().map(i => i.toLowerCase()))).sort()
