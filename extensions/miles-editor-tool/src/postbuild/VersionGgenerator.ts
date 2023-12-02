import fs from "fs-extra";
import path from "path";
import crypto from "crypto";

class Manifest {
    packageUrl = 'http://localhost/tutorial-hot-update/remote-assets/';
    remoteManifestUrl = 'http://localhost/tutorial-hot-update/remote-assets/project.manifest';
    remoteVersionUrl = 'http://localhost/tutorial-hot-update/remote-assets/version.manifest';
    version = '1.0.0';
    assets = {};
    searchPaths = [];
}

export class VersionGgenerator {


    private static dest = './remote-assets/';
    private static src = './jsb/';

    public static gen(url: string, version: string, src: string, dest: string) {
        let manifest = new Manifest();

        manifest.packageUrl = url;
        manifest.remoteManifestUrl = url + '/project.manifest';
        manifest.remoteVersionUrl = url + '/version.manifest';
        manifest.version = version;
        this.src = src;
        this.dest = dest;

        
        fs.emptyDirSync(dest);
        
        // Iterate assets and src folder
        this.readDir(path.join(src, 'src'), manifest.assets);
        this.readDir(path.join(src, 'assets'), manifest.assets);
        this.readDir(path.join(src, 'jsb-adapter'), manifest.assets);

        let destManifest = path.join(dest, 'project.manifest');
        let destVersion = path.join(dest, 'version.manifest');

        fs.writeJSONSync(destManifest, manifest);

        delete manifest.assets;
        delete manifest.searchPaths;
        fs.writeJSONSync(destVersion, manifest);
    }

    private static readDir(dir, obj) {
        try {
            let stat = fs.statSync(dir);
            if (!stat.isDirectory()) {
                return;
            }
            let subpaths = fs.readdirSync(dir), subpath, size, md5, compressed, relative;
            for (let i = 0; i < subpaths.length; ++i) {
                if (subpaths[i][0] === '.') {
                    continue;
                }
                subpath = path.join(dir, subpaths[i]);
                stat = fs.statSync(subpath);
                if (stat.isDirectory()) {
                    this.readDir(subpath, obj);
                }
                else if (stat.isFile()) {
                    // Size in Bytes
                    size = stat['size'];
                    md5 = crypto.createHash('md5').update(fs.readFileSync(subpath)).digest('hex');
                    compressed = path.extname(subpath).toLowerCase() === '.zip';
                    
                    relative = subpath.replace(/\\/g, "/").replace(this.src + "/", "");
                    obj[relative] = {
                        'size': size,
                        'md5': md5
                    };
                    if (compressed) {
                        obj[relative].compressed = true;
                    }
                }
            }
        } catch (err) {
            console.error(err)
        }
    }
}