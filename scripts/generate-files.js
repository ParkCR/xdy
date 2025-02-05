const fs = require('fs');
const path = require('path');


const directories = [
  { dir: 'mr', jsonPath: 'xdy/files-mr.json' },
  { dir: 'mb', jsonPath: 'xdy/files-mb.json' },
  { dir: 'mt', jsonPath: 'xdy/files-mt.json' },
  { dir: 'others', jsonPath: 'xdy/files-others.json' }
];

directories.forEach(({ dir, jsonPath }) => {

  const targetDir = path.join(__dirname, `../xdy/files/${dir}`);

  console.log(`Processing directory: ${targetDir}`);

  if (!fs.existsSync(targetDir)) {
    console.warn(`Directory ${targetDir} does not exist.`);
    return;
  }


  fs.readdir(targetDir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${targetDir}:`, err);
      process.exit(1);
    }

    console.log(`Files in ${targetDir}:`, files);


    const fileNames = files.filter(file => {
      const filePath = path.join(targetDir, file);
      return fs.statSync(filePath).isFile();
    });

    console.log(`Filtered files in ${targetDir}:`, fileNames);


    const jsonData = JSON.stringify(fileNames, null, 2);


    fs.writeFile(jsonPath, jsonData, (err) => {
      if (err) {
        console.error(`Error writing ${jsonPath}:`, err);
        process.exit(1);
      }
      console.log(`Successfully updated ${jsonPath}`);
    });
  });
});



