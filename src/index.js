const path = require('path');
const fs = require('fs');

const isResolved = (path) => /^[\\\/\.]/.test(path);

function fileExists(file) {
  try {
    let stat = fs.statSync(file);
    return stat.isFile();
  } catch (e) {
    return false;
  }
}

function resolvePath(path, extensions) {
  let result = null;

  if (fileExists(path)) {
    result = path;
  } else {
    for (
      let i = 0, fileFound = false;
      i < extensions.length && !fileFound;
      i++
    ) {
      const file = path + extensions[i];

      if (fileExists(file)) {
        result = file;
        found = true;
      }
    }
  }

  return result;
}

function plugin(basedir = '.', extensions = ['.ts', '.tsx', '.js', '.jsx', '.d.ts']) {
  return {
    name: 'absolute-import-plugin',
    resolveId(source, origin) {
      if (isResolved(source) || !origin) {
        return null; // default module resolution
      } else {
        let newPath = resolvePath(
          path.resolve(process.cwd(), basedir, source, 'index'),
          extensions
        );

        if (!newPath) {
          newPath = resolvePath(
            path.resolve(process.cwd(), basedir, source),
            extensions
          );
        }

        return newPath;
      }
    }
  };
};

module.exports = plugin;
