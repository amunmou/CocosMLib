import child from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
export class util {

    private static projectPath: string;
    static get ProjectPath() {
        if (!this.projectPath) this.projectPath = this.toUniSeparator(Editor.Project.path);
        return this.projectPath;
    }

    static exeCMD(workDir: string, cmd: string, onMsg?: (msg: string) => void, onError?: (err: string) => void, onExit?: () => void) {

        let result = child.spawn(cmd, { cwd: workDir });
        result.stdout.on("data", (data) => {
            let msg = data.toString();
            onMsg && onMsg(msg);
            if (msg == "Press any key to continue . . . ") {
                result.kill();
                onExit && onExit();
            }
        })
        result.stderr.on("data", (data) => {
            onError && onError(data.toString());
        })
    }

    static getAllFiles(dir: string, suffix?: string[]) {
        dir = this.toAbsolutePath(dir);
        suffix = suffix || [];
        let files: string[] = [];
        if (!fs.existsSync(dir)) return files;
        let walkSync = (currentDir: string, callback: (filePath: string) => void) => {
            fs.readdirSync(currentDir, { withFileTypes: true }).forEach(dirent => {
                let p = path.join(currentDir, dirent.name);
                if (dirent.isFile()) {
                    callback(p);
                } else if (dirent.isDirectory()) {
                    walkSync(p, callback);
                }

            });
        };
        walkSync(dir, file => {
            if (file.endsWith(".meta")) return;
            if (suffix.length == 0) files.push(this.toUniSeparator(file));
            let s = suffix.find(v => file.endsWith(v));
            if (s) files.push(this.toUniSeparator(file));
        });
        return files;
    }

    static fixupFilePath(filePath: string) {
        if (filePath.endsWith(".tpl")) filePath = filePath.replace(".tpl", "");
        let result = "";
        let dir = path.dirname(filePath);
        let extname = path.extname(filePath);
        let basename = path.basename(filePath, extname) + ".";
        let arr = fs.readdirSync(dir, { withFileTypes: true });
        for (const dirent of arr) {
            if (dirent.isFile()) {
                let name = dirent.name;
                let p = path.join(dir, name);
                if (name.startsWith(basename) && name.endsWith(extname)) {
                    result = this.toUniSeparator(p);
                    break;
                }
            }
        }
        if (!result) result = filePath;
        return result;
    }

    static toAssetDBUrl(path: string) {
        if (path.startsWith("db://")) return path;
        else return path.replace(this.ProjectPath + "/", "db://");
    }

    static toAbsolutePath(dbUrl: string) {
        if (dbUrl.startsWith("db://")) return dbUrl.replace("db://", this.ProjectPath + "/");
        else return dbUrl;
    }

    static toUniSeparator(path: string) {
        return path.replace(/\\/g, "/");
    }

    static mkDirIfNotExists(dir: string) {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    }

    static get returnSymbol() {
        switch (os.platform()) {
            case 'win32': return '\r\n' // windows
            case 'darwin':
            case 'linux':
            case 'aix':
            case 'freebsd':
            case 'openbsd':
            case 'sunos':
            default: return '\n'
        }
    }

}