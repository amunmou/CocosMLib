"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmdExecute = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const Config_1 = require("./tools/Config");
const Constant_1 = require("./tools/Constant");
const Logger_1 = require("./tools/Logger");
const Utils_1 = require("./tools/Utils");
class CmdExecute {
    /** 功能测试 */
    static test() {
        console.log("测试");
        let dir = path_1.default.dirname(Constant_1.Constant.LogFilePath);
        let basename = path_1.default.basename(Constant_1.Constant.LogFilePath);
        Logger_1.Logger.debug(dir);
        Logger_1.Logger.debug(basename);
        Utils_1.Utils.exeCMD(dir, basename);
    }
    /** 保存游戏配置到本地 */
    static saveGameSetting(jsonStr) {
        Config_1.Config.set("gameSetting", JSON.parse(jsonStr));
    }
    /** 导表 */
    static loadExcel() {
        let workDir = Utils_1.Utils.ProjectPath + "/excel";
        let batPath = "gen_code_json.bat";
        let tsDir = Utils_1.Utils.ProjectPath + "/assets/scripts/gen/table";
        fs_extra_1.default.ensureDirSync(tsDir);
        Logger_1.Logger.debug(workDir);
        Utils_1.Utils.exeCMD(workDir, batPath, msg => {
            Logger_1.Logger.debug(msg);
        }).then(code => {
            if (!code) {
                let bundles = Utils_1.Utils.ProjectPath + "/assets/bundles";
                let dirs = Utils_1.Utils.getAllDirs(bundles, null, true);
                dirs.push(Utils_1.Utils.ProjectPath + "/assets/resources");
                for (const dir of dirs) {
                    let tableDir = dir + "/table";
                    if (fs_extra_1.default.existsSync(tableDir)) {
                        Utils_1.Utils.refreshAsset(tableDir);
                    }
                }
                Utils_1.Utils.refreshAsset(tsDir);
            }
            else {
                Logger_1.Logger.error("导表失败");
            }
        });
    }
    /** 生成一些常量 */
    static genConst() {
        //生成Bundles.json
        {
            let bundlesDir = Utils_1.Utils.ProjectPath + "/assets/bundles";
            let outFile = Utils_1.Utils.ProjectPath + "/assets/scripts/gen/BundleConstant.ts";
            let result = [];
            let list = fs_extra_1.default.readdirSync(bundlesDir);
            for (const name of list) {
                let path = bundlesDir + "/" + name;
                if (fs_extra_1.default.statSync(path).isDirectory()) {
                    let obj = fs_extra_1.default.readJSONSync(path + ".meta");
                    if (obj['userData'] && obj['userData']['isBundle']) {
                        result.push(name);
                    }
                }
            }
            let content = `export const BundleConstant = ${JSON.stringify(result)};`;
            fs_extra_1.default.writeFileSync(outFile, content);
            Utils_1.Utils.refreshAsset(outFile);
            Logger_1.Logger.info("生成BundleConstant.ts成功");
        }
        //生成UIConstant
        {
            let map = {};
            let outFile = Utils_1.Utils.ProjectPath + "/assets/scripts/gen/UIConstant.ts";
            let ext = ".prefab";
            let path1 = Utils_1.Utils.ProjectPath + "/assets/bundles";
            let path2 = Utils_1.Utils.ProjectPath + "/assets/resources";
            let filter = (file) => file.endsWith(ext);
            let files = Utils_1.Utils.getAllFiles(path1, filter).concat(Utils_1.Utils.getAllFiles(path2, filter));
            files.forEach(v => {
                let basename = path_1.default.basename(v);
                if (v.indexOf("/uiPrefab/") > 0) {
                    let name = basename.replace(ext, "");
                    let location = "";
                    if (v.startsWith(path1)) {
                        location = v.replace(path1 + "/", "");
                        location = location.substring(location.indexOf("/") + 1);
                    }
                    else if (v.startsWith(path2)) {
                        location = v.replace(path2 + "/", "");
                    }
                    location = location.replace(ext, "");
                    map[name] = location;
                }
            });
            let content = "export const UIConstant = {\n";
            for (const key in map) {
                content += `    ${key}: "${map[key]}",\n`;
            }
            content += "}";
            fs_extra_1.default.ensureDirSync(path_1.default.dirname(outFile));
            fs_extra_1.default.writeFileSync(outFile, content);
            Utils_1.Utils.refreshAsset(outFile);
            Logger_1.Logger.info("生成UIConstant成功");
        }
    }
    static closeTexCompress() {
        Logger_1.Logger.info("关闭纹理压缩开始");
        let exts = [".jpg", ".png", ".jpeg", ".pac"];
        let filter = (file) => {
            let ext = path_1.default.extname(file);
            return exts.includes(ext);
        };
        let allFiles = Utils_1.Utils.getAllFiles(Utils_1.Utils.ProjectPath + "/assets", filter);
        for (const file of allFiles) {
            if (path_1.default.basename(file).startsWith("__"))
                continue;
            let metaFile = file + ".meta";
            let obj = fs_extra_1.default.readJSONSync(metaFile);
            let compressSettings = obj.userData.compressSettings;
            if (compressSettings && compressSettings.useCompressTexture) {
                compressSettings.useCompressTexture = false;
                fs_extra_1.default.writeJSONSync(metaFile, obj, { spaces: 2 });
                Utils_1.Utils.refreshAsset(file);
                Logger_1.Logger.info("关闭纹理压缩", file);
            }
        }
        Logger_1.Logger.info("关闭纹理压缩结束");
    }
    static setTexCompress() {
        let presetId = Editor.Clipboard.read("text");
        if (presetId.length != 22) {
            Logger_1.Logger.warn("请先拷贝一个纹理压缩配置的22位UUID到剪切板(项目设置-压缩纹理-配置压缩预设集)");
        }
        else {
            Logger_1.Logger.info("纹理压缩方案UUID:", presetId);
            let exts = [".jpg", ".png", ".jpeg", ".pac"];
            let filter = (file) => {
                let ext = path_1.default.extname(file);
                return exts.includes(ext);
            };
            let allFiles = Utils_1.Utils.getAllFiles(Utils_1.Utils.ProjectPath + "/assets", filter);
            for (const file of allFiles) {
                if (path_1.default.basename(file).startsWith("__"))
                    continue;
                let metaFile = file + ".meta";
                let obj = fs_extra_1.default.readJSONSync(metaFile);
                let compressSettings = obj.userData.compressSettings;
                if (!compressSettings || !compressSettings.useCompressTexture || compressSettings.presetId != presetId) {
                    let newCompressSettings = {
                        useCompressTexture: true,
                        presetId: presetId
                    };
                    obj.userData.compressSettings = newCompressSettings;
                    fs_extra_1.default.writeJSONSync(metaFile, obj, { spaces: 2 });
                    Utils_1.Utils.refreshAsset(file);
                    Logger_1.Logger.info(`纹理压缩设置  ${file}`);
                }
            }
            Logger_1.Logger.info("设置纹理压缩结束");
        }
    }
    static openLogFile() {
        if (fs_extra_1.default.existsSync(Constant_1.Constant.LogFilePath)) {
            let dir = path_1.default.dirname(Constant_1.Constant.LogFilePath);
            let basename = path_1.default.basename(Constant_1.Constant.LogFilePath);
            Utils_1.Utils.exeCMD(dir, basename);
        }
        else {
            console.log("暂无日志");
        }
    }
}
exports.CmdExecute = CmdExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ21kRXhlY3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9DbWRFeGVjdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdEQUEwQjtBQUMxQixnREFBd0I7QUFDeEIsMkNBQXdDO0FBQ3hDLCtDQUE0QztBQUM1QywyQ0FBd0M7QUFDeEMseUNBQXNDO0FBRXRDLE1BQWEsVUFBVTtJQUVuQixXQUFXO0lBQ0osTUFBTSxDQUFDLElBQUk7UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLElBQUksR0FBRyxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsbUJBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QyxJQUFJLFFBQVEsR0FBRyxjQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkQsZUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNqQixlQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3RCLGFBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFHRCxnQkFBZ0I7SUFDVCxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQWU7UUFDekMsZUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxTQUFTO0lBQ0YsTUFBTSxDQUFDLFNBQVM7UUFDbkIsSUFBSSxPQUFPLEdBQUcsYUFBSyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7UUFDM0MsSUFBSSxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDbEMsSUFBSSxLQUFLLEdBQUcsYUFBSyxDQUFDLFdBQVcsR0FBRywyQkFBMkIsQ0FBQztRQUM1RCxrQkFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztR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QUFFO1lBQ3JDLElBQUksR0FBRyxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsbUJBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3QyxJQUFJLFFBQVEsR0FBRyxjQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbkQsYUFBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDL0I7YUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkI7SUFDTCxDQUFDO0NBS0o7QUF0TEQsZ0NBc0xDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gXCJmcy1leHRyYVwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi90b29scy9Db25maWdcIjtcclxuaW1wb3J0IHsgQ29uc3RhbnQgfSBmcm9tIFwiLi90b29scy9Db25zdGFudFwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi90b29scy9Mb2dnZXJcIjtcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi90b29scy9VdGlsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENtZEV4ZWN1dGUge1xyXG5cclxuICAgIC8qKiDlip/og73mtYvor5UgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdGVzdCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIua1i+ivlVwiKTtcclxuICAgICAgICBsZXQgZGlyID0gcGF0aC5kaXJuYW1lKENvbnN0YW50LkxvZ0ZpbGVQYXRoKTtcclxuICAgICAgICBsZXQgYmFzZW5hbWUgPSBwYXRoLmJhc2VuYW1lKENvbnN0YW50LkxvZ0ZpbGVQYXRoKTtcclxuICAgICAgICBMb2dnZXIuZGVidWcoZGlyKVxyXG4gICAgICAgIExvZ2dlci5kZWJ1ZyhiYXNlbmFtZSlcclxuICAgICAgICBVdGlscy5leGVDTUQoZGlyLCBiYXNlbmFtZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKiDkv53lrZjmuLjmiI/phY3nva7liLDmnKzlnLAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2F2ZUdhbWVTZXR0aW5nKGpzb25TdHI6IHN0cmluZykge1xyXG4gICAgICAgIENvbmZpZy5zZXQoXCJnYW1lU2V0dGluZ1wiLCBKU09OLnBhcnNlKGpzb25TdHIpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5a+86KGoICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRFeGNlbCgpIHtcclxuICAgICAgICBsZXQgd29ya0RpciA9IFV0aWxzLlByb2plY3RQYXRoICsgXCIvZXhjZWxcIjtcclxuICAgICAgICBsZXQgYmF0UGF0aCA9IFwiZ2VuX2NvZGVfanNvbi5iYXRcIjtcclxuICAgICAgICBsZXQgdHNEaXIgPSBVdGlscy5Qcm9qZWN0UGF0aCArIFwiL2Fzc2V0cy9zY3JpcHRzL2dlbi90YWJsZVwiO1xyXG4gICAgICAgIGZzLmVuc3VyZURpclN5bmModHNEaXIpO1xyXG4gICAgICAgIExvZ2dlci5kZWJ1Zyh3b3JrRGlyKVxyXG4gICAgICAgIFV0aWxzLmV4ZUNNRCh3b3JrRGlyLCBiYXRQYXRoLFxyXG4gICAgICAgICAgICBtc2cgPT4ge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKG1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApLnRoZW4oY29kZSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghY29kZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bmRsZXMgPSBVdGlscy5Qcm9qZWN0UGF0aCArIFwiL2Fzc2V0cy9idW5kbGVzXCI7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlycyA9IFV0aWxzLmdldEFsbERpcnMoYnVuZGxlcywgbnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBkaXJzLnB1c2goVXRpbHMuUHJvamVjdFBhdGggKyBcIi9hc3NldHMvcmVzb3VyY2VzXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBkaXIgb2YgZGlycykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YWJsZURpciA9IGRpciArIFwiL3RhYmxlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmModGFibGVEaXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLnJlZnJlc2hBc3NldCh0YWJsZURpcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgVXRpbHMucmVmcmVzaEFzc2V0KHRzRGlyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuWvvOihqOWksei0pVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDnlJ/miJDkuIDkupvluLjph48gKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2VuQ29uc3QoKSB7XHJcbiAgICAgICAgLy/nlJ/miJBCdW5kbGVzLmpzb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBidW5kbGVzRGlyID0gVXRpbHMuUHJvamVjdFBhdGggKyBcIi9hc3NldHMvYnVuZGxlc1wiO1xyXG4gICAgICAgICAgICBsZXQgb3V0RmlsZSA9IFV0aWxzLlByb2plY3RQYXRoICsgXCIvYXNzZXRzL3NjcmlwdHMvZ2VuL0J1bmRsZUNvbnN0YW50LnRzXCI7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IGZzLnJlYWRkaXJTeW5jKGJ1bmRsZXNEaXIpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIGxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwYXRoID0gYnVuZGxlc0RpciArIFwiL1wiICsgbmFtZTtcclxuICAgICAgICAgICAgICAgIGlmIChmcy5zdGF0U3luYyhwYXRoKS5pc0RpcmVjdG9yeSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IGZzLnJlYWRKU09OU3luYyhwYXRoICsgXCIubWV0YVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqWyd1c2VyRGF0YSddICYmIG9ialsndXNlckRhdGEnXVsnaXNCdW5kbGUnXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gYGV4cG9ydCBjb25zdCBCdW5kbGVDb25zdGFudCA9ICR7SlNPTi5zdHJpbmdpZnkocmVzdWx0KX07YFxyXG4gICAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKG91dEZpbGUsIGNvbnRlbnQpO1xyXG4gICAgICAgICAgICBVdGlscy5yZWZyZXNoQXNzZXQob3V0RmlsZSk7XHJcbiAgICAgICAgICAgIExvZ2dlci5pbmZvKFwi55Sf5oiQQnVuZGxlQ29uc3RhbnQudHPmiJDlip9cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+eUn+aIkFVJQ29uc3RhbnRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBtYXAgPSB7fTtcclxuICAgICAgICAgICAgbGV0IG91dEZpbGUgPSBVdGlscy5Qcm9qZWN0UGF0aCArIFwiL2Fzc2V0cy9zY3JpcHRzL2dlbi9VSUNvbnN0YW50LnRzXCI7XHJcbiAgICAgICAgICAgIGxldCBleHQgPSBcIi5wcmVmYWJcIjtcclxuXHJcbiAgICAgICAgICAgIGxldCBwYXRoMSA9IFV0aWxzLlByb2plY3RQYXRoICsgXCIvYXNzZXRzL2J1bmRsZXNcIjtcclxuICAgICAgICAgICAgbGV0IHBhdGgyID0gVXRpbHMuUHJvamVjdFBhdGggKyBcIi9hc3NldHMvcmVzb3VyY2VzXCI7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXIgPSAoZmlsZTogc3RyaW5nKSA9PiBmaWxlLmVuZHNXaXRoKGV4dCk7XHJcbiAgICAgICAgICAgIGxldCBmaWxlcyA9IFV0aWxzLmdldEFsbEZpbGVzKHBhdGgxLCBmaWx0ZXIpLmNvbmNhdChVdGlscy5nZXRBbGxGaWxlcyhwYXRoMiwgZmlsdGVyKSk7XHJcbiAgICAgICAgICAgIGZpbGVzLmZvckVhY2godiA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFzZW5hbWUgPSBwYXRoLmJhc2VuYW1lKHYpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHYuaW5kZXhPZihcIi91aVByZWZhYi9cIikgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBiYXNlbmFtZS5yZXBsYWNlKGV4dCwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2F0aW9uID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodi5zdGFydHNXaXRoKHBhdGgxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbiA9IHYucmVwbGFjZShwYXRoMSArIFwiL1wiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24gPSBsb2NhdGlvbi5zdWJzdHJpbmcobG9jYXRpb24uaW5kZXhPZihcIi9cIikgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHYuc3RhcnRzV2l0aChwYXRoMikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24gPSB2LnJlcGxhY2UocGF0aDIgKyBcIi9cIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uID0gbG9jYXRpb24ucmVwbGFjZShleHQsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcFtuYW1lXSA9IGxvY2F0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gXCJleHBvcnQgY29uc3QgVUlDb25zdGFudCA9IHtcXG5cIjtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbWFwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ICs9IGAgICAgJHtrZXl9OiBcIiR7bWFwW2tleV19XCIsXFxuYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250ZW50ICs9IFwifVwiO1xyXG5cclxuICAgICAgICAgICAgZnMuZW5zdXJlRGlyU3luYyhwYXRoLmRpcm5hbWUob3V0RmlsZSkpO1xyXG4gICAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKG91dEZpbGUsIGNvbnRlbnQpO1xyXG4gICAgICAgICAgICBVdGlscy5yZWZyZXNoQXNzZXQob3V0RmlsZSk7XHJcbiAgICAgICAgICAgIExvZ2dlci5pbmZvKFwi55Sf5oiQVUlDb25zdGFudOaIkOWKn1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xvc2VUZXhDb21wcmVzcygpIHtcclxuICAgICAgICBMb2dnZXIuaW5mbyhcIuWFs+mXree6ueeQhuWOi+e8qeW8gOWni1wiKTtcclxuICAgICAgICBsZXQgZXh0cyA9IFtcIi5qcGdcIiwgXCIucG5nXCIsIFwiLmpwZWdcIiwgXCIucGFjXCJdO1xyXG4gICAgICAgIGxldCBmaWx0ZXIgPSAoZmlsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBleHQgPSBwYXRoLmV4dG5hbWUoZmlsZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBleHRzLmluY2x1ZGVzKGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbGxGaWxlcyA9IFV0aWxzLmdldEFsbEZpbGVzKFV0aWxzLlByb2plY3RQYXRoICsgXCIvYXNzZXRzXCIsIGZpbHRlcik7XHJcbiAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGFsbEZpbGVzKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXRoLmJhc2VuYW1lKGZpbGUpLnN0YXJ0c1dpdGgoXCJfX1wiKSkgY29udGludWU7XHJcbiAgICAgICAgICAgIGxldCBtZXRhRmlsZSA9IGZpbGUgKyBcIi5tZXRhXCI7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBmcy5yZWFkSlNPTlN5bmMobWV0YUZpbGUpO1xyXG4gICAgICAgICAgICBsZXQgY29tcHJlc3NTZXR0aW5nczogeyB1c2VDb21wcmVzc1RleHR1cmU6IGJvb2xlYW4sIHByZXNldElkOiBzdHJpbmcgfSA9IG9iai51c2VyRGF0YS5jb21wcmVzc1NldHRpbmdzO1xyXG4gICAgICAgICAgICBpZiAoY29tcHJlc3NTZXR0aW5ncyAmJiBjb21wcmVzc1NldHRpbmdzLnVzZUNvbXByZXNzVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgY29tcHJlc3NTZXR0aW5ncy51c2VDb21wcmVzc1RleHR1cmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZzLndyaXRlSlNPTlN5bmMobWV0YUZpbGUsIG9iaiwgeyBzcGFjZXM6IDIgfSk7XHJcbiAgICAgICAgICAgICAgICBVdGlscy5yZWZyZXNoQXNzZXQoZmlsZSk7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuaW5mbyhcIuWFs+mXree6ueeQhuWOi+e8qVwiLCBmaWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBMb2dnZXIuaW5mbyhcIuWFs+mXree6ueeQhuWOi+e8qee7k+adn1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldFRleENvbXByZXNzKCkge1xyXG4gICAgICAgIGxldCBwcmVzZXRJZDogc3RyaW5nID0gRWRpdG9yLkNsaXBib2FyZC5yZWFkKFwidGV4dFwiKSBhcyBzdHJpbmc7XHJcbiAgICAgICAgaWYgKHByZXNldElkLmxlbmd0aCAhPSAyMikge1xyXG4gICAgICAgICAgICBMb2dnZXIud2FybihcIuivt+WFiOaLt+i0neS4gOS4que6ueeQhuWOi+e8qemFjee9rueahDIy5L2NVVVJROWIsOWJquWIh+advyjpobnnm67orr7nva4t5Y6L57yp57q555CGLemFjee9ruWOi+e8qemihOiuvumbhilcIilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuaW5mbyhcIue6ueeQhuWOi+e8qeaWueahiFVVSUQ6XCIsIHByZXNldElkKTtcclxuICAgICAgICAgICAgbGV0IGV4dHMgPSBbXCIuanBnXCIsIFwiLnBuZ1wiLCBcIi5qcGVnXCIsIFwiLnBhY1wiXTtcclxuICAgICAgICAgICAgbGV0IGZpbHRlciA9IChmaWxlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBleHQgPSBwYXRoLmV4dG5hbWUoZmlsZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXh0cy5pbmNsdWRlcyhleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBhbGxGaWxlcyA9IFV0aWxzLmdldEFsbEZpbGVzKFV0aWxzLlByb2plY3RQYXRoICsgXCIvYXNzZXRzXCIsIGZpbHRlcik7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBhbGxGaWxlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhdGguYmFzZW5hbWUoZmlsZSkuc3RhcnRzV2l0aChcIl9fXCIpKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGxldCBtZXRhRmlsZSA9IGZpbGUgKyBcIi5tZXRhXCI7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0gZnMucmVhZEpTT05TeW5jKG1ldGFGaWxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY29tcHJlc3NTZXR0aW5nczogeyB1c2VDb21wcmVzc1RleHR1cmU6IGJvb2xlYW4sIHByZXNldElkOiBzdHJpbmcgfSA9IG9iai51c2VyRGF0YS5jb21wcmVzc1NldHRpbmdzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjb21wcmVzc1NldHRpbmdzIHx8ICFjb21wcmVzc1NldHRpbmdzLnVzZUNvbXByZXNzVGV4dHVyZSB8fCBjb21wcmVzc1NldHRpbmdzLnByZXNldElkICE9IHByZXNldElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0NvbXByZXNzU2V0dGluZ3M6IHsgdXNlQ29tcHJlc3NUZXh0dXJlOiBib29sZWFuLCBwcmVzZXRJZDogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZUNvbXByZXNzVGV4dHVyZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlc2V0SWQ6IHByZXNldElkXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9iai51c2VyRGF0YS5jb21wcmVzc1NldHRpbmdzID0gbmV3Q29tcHJlc3NTZXR0aW5ncztcclxuICAgICAgICAgICAgICAgICAgICBmcy53cml0ZUpTT05TeW5jKG1ldGFGaWxlLCBvYmosIHsgc3BhY2VzOiAyIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLnJlZnJlc2hBc3NldChmaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuaW5mbyhg57q555CG5Y6L57yp6K6+572uICAke2ZpbGV9YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTG9nZ2VyLmluZm8oXCLorr7nva7nurnnkIbljovnvKnnu5PmnZ9cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgb3BlbkxvZ0ZpbGUoKSB7XHJcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoQ29uc3RhbnQuTG9nRmlsZVBhdGgpKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXIgPSBwYXRoLmRpcm5hbWUoQ29uc3RhbnQuTG9nRmlsZVBhdGgpO1xyXG4gICAgICAgICAgICBsZXQgYmFzZW5hbWUgPSBwYXRoLmJhc2VuYW1lKENvbnN0YW50LkxvZ0ZpbGVQYXRoKTtcclxuICAgICAgICAgICAgVXRpbHMuZXhlQ01EKGRpciwgYmFzZW5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pqC5peg5pel5b+XXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn0iXX0=