const fs = require('fs');
const path = require('path');

const filesDir = path.join(__dirname, '../files');
const jsonFilesDir = path.join(__dirname, '../');

// 定义子目录名称
const subDirs = ['mr', 'mb', 'mt', 'others'];

subDirs.forEach((subDir) => {
  const subDirPath = path.join(filesDir, subDir);
  const jsonFilePath = path.join(jsonFilesDir, `files-${subDir}.json`);

  // 读取子目录中的文件
  fs.readdir(subDirPath, (err, files) => {
    if (err) {
      console.error(`Error reading ${subDirPath}:`, err);
      return;
    }

    // 过滤出 HTML 文件
    const htmlFiles = files.filter((file) => path.extname(file) === '.html');

    // 将文件信息写入对应的 JSON 文件
    fs.writeFile(jsonFilePath, JSON.stringify(htmlFiles, null, 2), (err) => {
      if (err) {
        console.error(`Error writing ${jsonFilePath}:`, err);
      } else {
        console.log(`Updated ${jsonFilePath}`);
      }
    });
  });
});