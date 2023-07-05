"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onAfterMake = exports.onBeforeMake = exports.onError = exports.onAfterBuild = exports.onAfterCompressSettings = exports.onBeforeCompressSettings = exports.onBeforeBuild = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = require("./util");
const TAG = 'miles-build';
const TemplatePrefix = util_1.util.ProjectPath + "/assets/publish/";
function log(...arg) {
    return console.log(`[${TAG}] `, ...arg);
}
const onBeforeBuild = async function (options, result) {
    // Todo some thing
    util_1.util.mkDirIfNotExists(TemplatePrefix + options.platform);
    appendMBuildLog("Build Start");
};
exports.onBeforeBuild = onBeforeBuild;
const onBeforeCompressSettings = async function (options, result) {
    // Todo some thing
    appendMBuildLog('get settings test', result.settings);
};
exports.onBeforeCompressSettings = onBeforeCompressSettings;
const onAfterCompressSettings = async function (options, result) {
    // Todo some thing
    appendMBuildLog('webTestOption ' + 'onAfterCompressSettings');
};
exports.onAfterCompressSettings = onAfterCompressSettings;
const onAfterBuild = async function (options, result) {
    // Todo some thing
    let dir = TemplatePrefix + options.platform;
    appendMBuildLog(options.buildPath);
};
exports.onAfterBuild = onAfterBuild;
const onError = async function (options, result) {
    // Todo some thing
    console.warn(`${TAG} run onError`);
};
exports.onError = onError;
const onBeforeMake = async function (root, options) {
    appendMBuildLog(`onBeforeMake: root: ${root}, options: ${options}`);
};
exports.onBeforeMake = onBeforeMake;
const onAfterMake = async function (root, options) {
    appendMBuildLog(`onAfterMake: root: ${root}, options: ${options}`);
};
exports.onAfterMake = onAfterMake;
const appendMBuildLog = function (...strs) {
    let filePath = util_1.util.ProjectPath + "/temp/builder/mbuildlog.txt";
    let content = `[${TAG}] ${new Date().toLocaleString()} ${strs.join(" ")} \n`;
    fs_1.default.appendFileSync(filePath, content);
};
