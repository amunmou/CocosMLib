"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mExec = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("./util");
class mExec {
    /** 导表 */
    static loadExcel() {
        let workDir = util_1.util.ProjectPath + "/excel";
        let batPath = util_1.util.ProjectPath + "/excel/gen_code_json.bat";
        let jsonDir = "db://assets/resources/data";
        util_1.util.exeCMD(workDir, batPath, msg => {
            console.log(msg);
        }, err => {
            console.error(err);
        }, () => {
            let files = util_1.util.getAllFiles(jsonDir, [".json"]);
            files.forEach(v => {
                Editor.Message.send("asset-db", "refresh-asset", util_1.util.toAssetDBUrl(v));
            });
        });
    }
    /** 生成一些常量 */
    static genConst() {
        let map = {};
        let outFile = util_1.util.ProjectPath + "/assets/script/gen/UIConst.ts";
        let ext = ".prefab";
        let path1 = util_1.util.ProjectPath + "/assets/bundles";
        let path2 = util_1.util.ProjectPath + "/assets/resources";
        let files1 = util_1.util.getAllFiles(path1, [ext]);
        let files2 = util_1.util.getAllFiles(path2, [ext]);
        files1.forEach(v => {
            let basename = path_1.default.basename(v);
            if (basename.startsWith("UI")) {
                let name = basename.replace(ext, "");
                let location = v.replace(path2 + "/", "").replace(ext, "");
                let index = location.indexOf("/");
                if (index > -1)
                    location = location.substring(index + 1);
                map[name] = location;
            }
        });
        files2.forEach(v => {
            let basename = path_1.default.basename(v);
            if (basename.startsWith("UI")) {
                let name = basename.replace(ext, "");
                let location = v.replace(path2 + "/", "").replace(ext, "");
                map[name] = location;
            }
        });
        let content = "export const UIConst = {\n";
        for (const key in map) {
            content += `    "${key}": "${map[key]}",\n`;
        }
        content += "}";
        util_1.util.mkDirIfNotExists(path_1.default.dirname(outFile));
        fs_1.default.writeFileSync(outFile, content);
        Editor.Message.send("asset-db", "refresh-asset", util_1.util.toAssetDBUrl(outFile));
    }
    static autoBind(scriptName, start, end, strs) {
        let save = false;
        let filePath = util_1.util.getAllFiles(util_1.util.ProjectPath, [scriptName + ".ts"])[0];
        let content = fs_1.default.readFileSync(filePath).toString();
        let lines = content.split(util_1.util.returnSymbol);
        let classTag = `class ${scriptName}`;
        let classIndex = -1, genStartIndex = -1, genEndIndex = -1;
        for (let index = 0; index < lines.length; index++) {
            const line = lines[index].trim();
            if (line.indexOf(classTag) > -1)
                classIndex = index;
            else if (line == start.trim())
                genStartIndex = index;
            else if (line == end.trim())
                genEndIndex = index;
        }
        // console.log("????? ", classIndex, " - ", genStartIndex, " - ", genEndIndex);
        if (genStartIndex == -1) { //直接生成
            lines.splice(classIndex + 1, 0, start, ...strs, end);
            save = true;
        }
        else {
            if (genEndIndex - genStartIndex - 1 != strs.length) {
                lines.splice(genStartIndex, genEndIndex - genStartIndex + 1, start, ...strs, end);
                save = true;
            }
            else {
                for (let i = genStartIndex + 1, j = 0; i < genEndIndex; i++, j++) {
                    if (lines[i].trim() != strs[j].trim()) {
                        save = true;
                        break;
                    }
                }
                if (save) {
                    lines.splice(genStartIndex, genEndIndex - genStartIndex + 1, start, ...strs, end);
                }
            }
        }
        if (save) {
            fs_1.default.writeFileSync(filePath, lines.join(util_1.util.returnSymbol));
            console.log(`[${scriptName}] 自动绑定成功`);
        }
    }
}
exports.mExec = mExec;