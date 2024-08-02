"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
const HotUpdate_1 = require("./builder/postbuild/HotUpdate");
const CmdExecute_1 = require("./CmdExecute");
const SceneConnect_1 = require("./scene/SceneConnect");
/**
 * @en Registration method for the main process of Extension
 * @zh 为扩展的主进程的注册方法
 */
exports.methods = {
    /**  */
    saveGameSetting: CmdExecute_1.CmdExecute.saveGameSetting.bind(CmdExecute_1.CmdExecute),
    loadExcel: CmdExecute_1.CmdExecute.loadExcel.bind(CmdExecute_1.CmdExecute),
    genConst: CmdExecute_1.CmdExecute.genConst.bind(CmdExecute_1.CmdExecute),
    closeTexCompress: CmdExecute_1.CmdExecute.closeTexCompress.bind(CmdExecute_1.CmdExecute),
    setTexCompress: CmdExecute_1.CmdExecute.setTexCompress.bind(CmdExecute_1.CmdExecute),
    genHotUpdateRes: HotUpdate_1.HotUpdate.genHotUpdateRes.bind(HotUpdate_1.HotUpdate),
    openLogFile: CmdExecute_1.CmdExecute.openLogFile.bind(CmdExecute_1.CmdExecute),
    //场景操作命令 除了在此处还需在SceneMain中注册
    replaceComponent: SceneConnect_1.SceneConnect.send.bind(this, "replaceComponent"),
    //测试
    test: CmdExecute_1.CmdExecute.test.bind(CmdExecute_1.CmdExecute),
};
/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
function load() { }
exports.load = load;
/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
function unload() { }
exports.unload = unload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9NYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZEQUEwRDtBQUMxRCw2Q0FBMEM7QUFDMUMsdURBQW9EO0FBSXBEOzs7R0FHRztBQUNVLFFBQUEsT0FBTyxHQUE0QztJQUM1RCxPQUFPO0lBQ1AsZUFBZSxFQUFFLHVCQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyx1QkFBVSxDQUFDO0lBQzVELFNBQVMsRUFBRSx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsdUJBQVUsQ0FBQztJQUNoRCxRQUFRLEVBQUUsdUJBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHVCQUFVLENBQUM7SUFDOUMsZ0JBQWdCLEVBQUUsdUJBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsdUJBQVUsQ0FBQztJQUM5RCxjQUFjLEVBQUUsdUJBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLHVCQUFVLENBQUM7SUFDMUQsZUFBZSxFQUFFLHFCQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxxQkFBUyxDQUFDO0lBQzFELFdBQVcsRUFBRSx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsdUJBQVUsQ0FBQztJQUNwRCw2QkFBNkI7SUFDN0IsZ0JBQWdCLEVBQUUsMkJBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQztJQUNsRSxJQUFJO0lBQ0osSUFBSSxFQUFFLHVCQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBVSxDQUFDO0NBQ3pDLENBQUM7QUFFRjs7O0dBR0c7QUFDSCxTQUFnQixJQUFJLEtBQUssQ0FBQztBQUExQixvQkFBMEI7QUFFMUI7OztHQUdHO0FBQ0gsU0FBZ0IsTUFBTSxLQUFLLENBQUM7QUFBNUIsd0JBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSG90VXBkYXRlIH0gZnJvbSBcIi4vYnVpbGRlci9wb3N0YnVpbGQvSG90VXBkYXRlXCI7XG5pbXBvcnQgeyBDbWRFeGVjdXRlIH0gZnJvbSBcIi4vQ21kRXhlY3V0ZVwiO1xuaW1wb3J0IHsgU2NlbmVDb25uZWN0IH0gZnJvbSBcIi4vc2NlbmUvU2NlbmVDb25uZWN0XCI7XG5cblxuXG4vKipcbiAqIEBlbiBSZWdpc3RyYXRpb24gbWV0aG9kIGZvciB0aGUgbWFpbiBwcm9jZXNzIG9mIEV4dGVuc2lvblxuICogQHpoIOS4uuaJqeWxleeahOS4u+i/m+eoi+eahOazqOWGjOaWueazlVxuICovXG5leHBvcnQgY29uc3QgbWV0aG9kczogeyBba2V5OiBzdHJpbmddOiAoLi4uYW55OiBhbnkpID0+IGFueSB9ID0ge1xuICAgIC8qKiAgKi9cbiAgICBzYXZlR2FtZVNldHRpbmc6IENtZEV4ZWN1dGUuc2F2ZUdhbWVTZXR0aW5nLmJpbmQoQ21kRXhlY3V0ZSksXG4gICAgbG9hZEV4Y2VsOiBDbWRFeGVjdXRlLmxvYWRFeGNlbC5iaW5kKENtZEV4ZWN1dGUpLFxuICAgIGdlbkNvbnN0OiBDbWRFeGVjdXRlLmdlbkNvbnN0LmJpbmQoQ21kRXhlY3V0ZSksXG4gICAgY2xvc2VUZXhDb21wcmVzczogQ21kRXhlY3V0ZS5jbG9zZVRleENvbXByZXNzLmJpbmQoQ21kRXhlY3V0ZSksXG4gICAgc2V0VGV4Q29tcHJlc3M6IENtZEV4ZWN1dGUuc2V0VGV4Q29tcHJlc3MuYmluZChDbWRFeGVjdXRlKSxcbiAgICBnZW5Ib3RVcGRhdGVSZXM6IEhvdFVwZGF0ZS5nZW5Ib3RVcGRhdGVSZXMuYmluZChIb3RVcGRhdGUpLFxuICAgIG9wZW5Mb2dGaWxlOiBDbWRFeGVjdXRlLm9wZW5Mb2dGaWxlLmJpbmQoQ21kRXhlY3V0ZSksXG4gICAgLy/lnLrmma/mk43kvZzlkb3ku6Qg6Zmk5LqG5Zyo5q2k5aSE6L+Y6ZyA5ZyoU2NlbmVNYWlu5Lit5rOo5YaMXG4gICAgcmVwbGFjZUNvbXBvbmVudDogU2NlbmVDb25uZWN0LnNlbmQuYmluZCh0aGlzLCBcInJlcGxhY2VDb21wb25lbnRcIiksXG4gICAgLy/mtYvor5VcbiAgICB0ZXN0OiBDbWRFeGVjdXRlLnRlc3QuYmluZChDbWRFeGVjdXRlKSxcbn07XG5cbi8qKlxuICogQGVuIEhvb2tzIHRyaWdnZXJlZCBhZnRlciBleHRlbnNpb24gbG9hZGluZyBpcyBjb21wbGV0ZVxuICogQHpoIOaJqeWxleWKoOi9veWujOaIkOWQjuinpuWPkeeahOmSqeWtkFxuICovXG5leHBvcnQgZnVuY3Rpb24gbG9hZCgpIHsgfVxuXG4vKipcbiAqIEBlbiBIb29rcyB0cmlnZ2VyZWQgYWZ0ZXIgZXh0ZW5zaW9uIHVuaW5zdGFsbGF0aW9uIGlzIGNvbXBsZXRlXG4gKiBAemgg5omp5bGV5Y246L295a6M5oiQ5ZCO6Kem5Y+R55qE6ZKp5a2QXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmxvYWQoKSB7IH1cblxuXG5cbiJdfQ==