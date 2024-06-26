"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotUpdate = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const Config_1 = require("../tools/Config");
const LogToFile_1 = require("../tools/LogToFile");
const MLogger_1 = require("../tools/MLogger");
const Utils_1 = require("../tools/Utils");
const MainJsCode_1 = require("./MainJsCode");
const VersionGenerator_1 = require("./VersionGenerator");
/** 原生平台检查构建配置和修改main.js */
class HotUpdate {
    /** 修改main.js 和 src目录中的脚本 */
    static modifyJsFile(options, result) {
        if (Utils_1.Utils.isNative(options.platform)) {
            // if (options.md5Cache) {
            //     LogToFile.log("若使用热更请关闭md5Cache");
            //     return;
            // }
            let buildPath = Utils_1.Utils.toUniSeparator(result.dest);
            Config_1.Config.set("hotupdate.src", buildPath);
            let rootDir = path_1.default.join(result.dest, 'data');
            if (!fs_extra_1.default.existsSync(rootDir)) {
                rootDir = path_1.default.join(result.dest, 'assets');
            }
            let srcDir = path_1.default.join(rootDir, 'src');
            let files = Utils_1.Utils.getAllFiles(srcDir, null, true);
            files = files.concat(Utils_1.Utils.getAllFiles(rootDir, null, true));
            let newFiles = [];
            //修改src目录下文件的文件名 去除md5
            let fileNameMap = new Map();
            files.forEach(file => {
                let newFile = Utils_1.Utils.restoreFilePath(file);
                let fileName = path_1.default.basename(file);
                let newFileName = path_1.default.basename(newFile);
                fileNameMap.set(fileName, newFileName);
                fs_extra_1.default.renameSync(file, newFile);
                newFiles.push(newFile);
            });
            //修改src目录下文件 修改文件中带md5的引用
            newFiles.forEach(file => {
                let content = fs_extra_1.default.readFileSync(file, { encoding: "utf8" });
                fileNameMap.forEach((v, k) => {
                    let regex = new RegExp(k, "g");
                    content = content.replace(regex, v);
                });
                fs_extra_1.default.writeFileSync(file, content, { encoding: "utf8" });
            });
            //修改main.js 中的搜索路径
            let mainjs = path_1.default.join(rootDir, 'main.js');
            if (fs_extra_1.default.existsSync(mainjs)) {
                let version = Config_1.Config.get("gameSetting.mainVersion", "");
                if (version) {
                    let content = fs_extra_1.default.readFileSync(mainjs, { encoding: "utf8" });
                    content = MainJsCode_1.MainJsCode.code.replace("<%version%>", version) + "\n" + content;
                    fs_extra_1.default.writeFileSync(mainjs, content, { encoding: "utf8" });
                    LogToFile_1.LogToFile.log("修改热更搜索路径完成", version);
                }
                else {
                    LogToFile_1.LogToFile.log("若使用热更请先保存热更配置");
                }
            }
        }
    }
    static genHotUpdateRes() {
        let src = Config_1.Config.get("hotupdate.src", "");
        let url = Config_1.Config.get("gameSetting.hotupdateServer", "");
        let version = Config_1.Config.get("gameSetting.version", "");
        let dest = Utils_1.Utils.ProjectPath + "/hotupdate/" + version;
        if (!url || !version) {
            MLogger_1.MLogger.info(`热更配置不正确,请先检查热更配置`);
        }
        if (!src) {
            MLogger_1.MLogger.info(`请先构建一次Native工程 再生成热更资源`);
            return;
        }
        let newSrc = path_1.default.join(src, 'data');
        if (!fs_extra_1.default.existsSync(newSrc)) {
            newSrc = path_1.default.join(src, 'assets');
        }
        src = Utils_1.Utils.toUniSeparator(newSrc);
        MLogger_1.MLogger.info(`url=${url}`);
        MLogger_1.MLogger.info(`version=${version}`);
        MLogger_1.MLogger.info(`src=${src}`);
        MLogger_1.MLogger.info(`dest=${dest}`);
        try {
            VersionGenerator_1.VersionGenerator.gen(url, version, src, dest);
            fs_extra_1.default.copySync(src + '/src', dest + "/src");
            fs_extra_1.default.copySync(src + '/assets', dest + "/assets");
            fs_extra_1.default.copySync(src + '/jsb-adapter', dest + "/jsb-adapter");
            fs_extra_1.default.copySync(dest + '/project.manifest', Utils_1.Utils.ProjectPath + "/assets/resources/project.manifest");
            Utils_1.Utils.refreshAsset(Utils_1.Utils.ProjectPath + "/assets/resources/project.manifest");
            MLogger_1.MLogger.info(`生成热更资源完成 ${dest}`);
        }
        catch (e) {
            MLogger_1.MLogger.info(`生成热更资源失败 ${e}`);
        }
    }
}
exports.HotUpdate = HotUpdate;
