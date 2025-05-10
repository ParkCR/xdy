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

    // 过滤出 HTML 文件并转换为新结构
    const fileObjects = files
      .filter((file) => path.extname(file) === '.html')
      .map((file) => ({
        name: path.basename(file, '.html'),
        type: 'file',
        link: `files/${subDir}/${file}`, // 添加相对路径
        icon: 'html',
        fileType: 'HTML文档'
      }));

    // 将文件信息写入对应的 JSON 文件
    fs.writeFile(jsonFilePath, JSON.stringify(fileObjects, null, 2), (err) => {
      if (err) {
        console.error(`Error writing ${jsonFilePath}:`, err);
      } else {
        console.log(`Updated ${jsonFilePath}`);
      }
    });
  });
});