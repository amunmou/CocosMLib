"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuExecute = void 0;
const Utils_1 = require("../tools/Utils");
const path_1 = __importDefault(require("path"));
const Logger_1 = require("../tools/Logger");
class MenuExecute {
    static copyLoadLocation(assetInfo) {
        let filePath = Utils_1.Utils.toUniSeparator(assetInfo.file);
        let bundlePath = Utils_1.Utils.getBundlePath(filePath);
        let location = "";
        if (bundlePath) {
            location = filePath.replace(bundlePath + "/", "");
            location = location.replace(path_1.default.extname(location), "");
        }
        Editor.Clipboard.write("text", location);
        Logger_1.Logger.info("加载路径", location);
    }
}
exports.MenuExecute = MenuExecute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudUV4ZWN1dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2UvYXNzZXRtZW51L01lbnVFeGVjdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDBDQUF1QztBQUN2QyxnREFBd0I7QUFDeEIsNENBQXlDO0FBRXpDLE1BQWEsV0FBVztJQUNiLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFvQjtRQUMvQyxJQUFJLFFBQVEsR0FBRyxhQUFLLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLFVBQVUsR0FBRyxhQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLFVBQVUsRUFBRTtZQUNaLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbEQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMzRDtRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6QyxlQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBQ0o7QUFaRCxrQ0FZQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2V0SW5mbyB9IGZyb20gXCJAY29jb3MvY3JlYXRvci10eXBlcy9lZGl0b3IvcGFja2FnZXMvYXNzZXQtZGIvQHR5cGVzL3B1YmxpY1wiO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi4vdG9vbHMvVXRpbHNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vdG9vbHMvTG9nZ2VyXCI7XG5cbmV4cG9ydCBjbGFzcyBNZW51RXhlY3V0ZSB7XG4gICAgcHVibGljIHN0YXRpYyBjb3B5TG9hZExvY2F0aW9uKGFzc2V0SW5mbzogQXNzZXRJbmZvKSB7XG4gICAgICAgIGxldCBmaWxlUGF0aCA9IFV0aWxzLnRvVW5pU2VwYXJhdG9yKGFzc2V0SW5mby5maWxlKTtcbiAgICAgICAgbGV0IGJ1bmRsZVBhdGggPSBVdGlscy5nZXRCdW5kbGVQYXRoKGZpbGVQYXRoKTtcbiAgICAgICAgbGV0IGxvY2F0aW9uID0gXCJcIjtcbiAgICAgICAgaWYgKGJ1bmRsZVBhdGgpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uID0gZmlsZVBhdGgucmVwbGFjZShidW5kbGVQYXRoICsgXCIvXCIsIFwiXCIpO1xuICAgICAgICAgICAgbG9jYXRpb24gPSBsb2NhdGlvbi5yZXBsYWNlKHBhdGguZXh0bmFtZShsb2NhdGlvbiksIFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIEVkaXRvci5DbGlwYm9hcmQud3JpdGUoXCJ0ZXh0XCIsIGxvY2F0aW9uKTtcbiAgICAgICAgTG9nZ2VyLmluZm8oXCLliqDovb3ot6/lvoRcIiwgbG9jYXRpb24pO1xuICAgIH1cbn0iXX0=