const fs = require('fs');
const path = require('path');

// 定义目标目录和对应的 JSON 文件路径
const directories = [
  { dir: 'mr', jsonPath: 'xdy/files-mr.json' },
  { dir: 'mb', jsonPath: 'xdy/files-mb.json' },
  { dir: 'mt', jsonPath: 'xdy/files-mt.json' },
  { dir: 'others', jsonPath: 'xdy/files-others.json' }
];

directories.forEach(({ dir, jsonPath }) => {
  // 定义目标目录路径
  const targetDir = path.join(__dirname, `../xdy/files/${dir}`);

  console.log(`Processing directory: ${targetDir}`);

  // 检查目标目录是否存在
  if (!fs.existsSync(targetDir)) {
    console.warn(`Directory ${targetDir} does not exist.`);
    return;
  }

  // 读取目标目录中的所有文件名
  fs.readdir(targetDir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${targetDir}:`, err);
      process.exit(1);
    }

    console.log(`Files in ${targetDir}:`, files);

    // 过滤掉非文件的条目（例如子目录）
    const fileNames = files.filter(file => {
      const filePath = path.join(targetDir, file);
      return fs.statSync(filePath).isFile();
    });

    console.log(`Filtered files in ${targetDir}:`, fileNames);

    // 生成 JSON 内容
    const jsonData = JSON.stringify(fileNames, null, 2);

    // 写入 JSON 文件
    fs.writeFile(jsonPath, jsonData, (err) => {
      if (err) {
        console.error(`Error writing ${jsonPath}:`, err);
        process.exit(1);
      }
      console.log(`Successfully updated ${jsonPath}`);
    });
  });
});



