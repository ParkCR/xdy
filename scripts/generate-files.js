const fs = require('fs');
const path = require('path');

 定义目标目录和对应的 JSON 文件路径
const directories = [
  { dir 'mr', jsonPath 'xdyfiles-mr.json' },
  { dir 'mb', jsonPath 'xdyfiles-mb.json' },
  { dir 'mt', jsonPath 'xdyfiles-mt.json' },
  { dir 'others', jsonPath 'xdyfiles-others.json' }
];

directories.forEach(({ dir, jsonPath }) = {
   定义目标目录路径
  const targetDir = path.join(__dirname, `..xdyfiles${dir}`);

   读取目标目录中的所有文件名
  fs.readdir(targetDir, (err, files) = {
    if (err) {
      console.error(`Error reading directory ${targetDir}`, err);
      process.exit(1);
    }

     过滤掉非文件的条目（例如子目录）
    const fileNames = files.filter(file = {
      const filePath = path.join(targetDir, file);
      return fs.statSync(filePath).isFile();
    });

     生成 JSON 内容
    const jsonData = JSON.stringify(fileNames, null, 2);

     写入 JSON 文件
    fs.writeFile(jsonPath, jsonData, (err) = {
      if (err) {
        console.error(`Error writing ${jsonPath}`, err);
        process.exit(1);
      }
      console.log(`Successfully updated ${jsonPath}`);
    });
  });
});



