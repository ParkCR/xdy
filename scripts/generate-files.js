const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// 将fs方法转换为Promise形式
const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const filesDir = path.join(__dirname, '../files');
const jsonOutputDir = path.join(__dirname, '../json'); // JSON文件输出目录

// 定义子目录名称
const subDirs = ['mr', 'mb', 'mt', 'others'];

async function generateJsonFiles() {
  try {
    // 确保json目录存在
    await mkdir(jsonOutputDir, { recursive: true });

    // 并行处理所有子目录
    await Promise.all(subDirs.map(async (subDir) => {
      const subDirPath = path.join(filesDir, subDir);
      const jsonFilePath = path.join(jsonOutputDir, `files-${subDir}.json`);

      try {
        const files = await readdir(subDirPath);
        
        // 过滤出HTML文件并转换为所需格式
        const fileObjects = files
          .filter(file => path.extname(file) === '.html')
          .map(file => ({
            name: path.basename(file, '.html'),
            type: 'file',
            link: `files/${subDir}/${file}`,
            icon: 'html',
            fileType: 'HTML文档'
          }));

        // 写入JSON文件
        await writeFile(
          jsonFilePath,
          JSON.stringify(fileObjects, null, 2)
        );
        
        console.log(`成功生成: ${jsonFilePath}`);
      } catch (err) {
        console.error(`处理目录 ${subDir} 时出错:`, err);
      }
    }));
    
    console.log('所有JSON文件生成完成！');
  } catch (err) {
    console.error('初始化时出错:', err);
  }
}

// 执行生成任务
generateJsonFiles();