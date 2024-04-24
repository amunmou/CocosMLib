import fs from "fs-extra";
import path from "path";
import { IBuildResult, IBuildTaskOption } from "../../@types";
import { Config } from "../tools/Config";
import { Constant } from "../tools/Constant";
import { LogToFile } from "../tools/LogToFile";
import { MLogger } from "../tools/MLogger";
import { Utils } from "../tools/Utils";

/** 拷贝自定义构建模板资源 */
export class BuildTemplate {
    public static copy(options: IBuildTaskOption, result: IBuildResult) {
        if (!Config.get(Constant.BuildTemplateSaveKey, true)) {
            LogToFile.log("未启用构建模板");
            MLogger.info("未启用构建模板");
            return;//未启用构建模板
        }
        let templatePath = Utils.ProjectPath + "/" + Constant.BuildTemplateDirName + "/" + options.platform;
        fs.ensureDirSync(templatePath);
        //拷贝模板目录资源
        let insertPrefix = "insert_";//以这个前缀开头的文件 会将构建模版中的内容插入到构建后的文件指定行
        let buildPath = Utils.toUniSeparator(result.dest);
        let files = Utils.getAllFiles(templatePath);
        let buildDest = this.resolveBuildDest(buildPath, options.platform);
        for (const file of files) {
            let f = file.replace(templatePath, "").replace("/", "");
            if (f.startsWith(insertPrefix)) {
                f = f.replace(insertPrefix, "");
                let lineNum = 0;
                if (f.includes("_")) {
                    let str = f.substring(0, f.indexOf("_"));
                    let num = parseInt(str);
                    if (!isNaN(num)) {
                        lineNum = num;
                        f = f.replace(str + "_", "");
                    }
                }
                let newFile = buildDest + "/" + f;
                LogToFile.log("insert code ", f);
                this.insertCode(file, newFile, lineNum);
            } else {
                let newFile = buildDest + "/" + f;
                LogToFile.log("copy file", f);
                fs.ensureDirSync(path.dirname(newFile));
                fs.copyFileSync(file, newFile);
            }
        }
    }

    /** 如果构建模板中有特殊脚本 插入内容到构建出的文件内容开头 */
    private static insertCode(src: string, dest: string, lineNum: number) {
        let code = fs.readFileSync(src, { encoding: "utf8" });
        let codeArr = code.split("\r\n");
        if (codeArr.length < 2) {
            codeArr = code.split("\n");
        }
        let destContent = fs.readFileSync(dest, { encoding: "utf8" });
        let destArr = destContent.split("\r\n");
        if (destArr.length < 2) {
            destArr = destContent.split("\n");
        }
        destArr.splice(lineNum, 0, ...codeArr);

        fs.writeFileSync(dest, destArr.join("\n"));
    }


    private static resolveBuildDest(buildDest, platform) {
        // if (platform == "android") {
        //     return buildDest + "/frameworks/runtime-src/proj.android-studio";
        // } else if (platform == "ios") {
        //     return buildDest + "/frameworks/runtime-src/proj.ios_mac";
        // } else if (platform == "win32") {
        //     return buildDest + "/frameworks/runtime-src/proj.win32";
        // }
        return buildDest;
    }
}