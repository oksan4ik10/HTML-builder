const fs = require('fs');
const path = require('path');
const process = require('process');

let styleRes = [];

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {

  files.forEach((file) => {
    if (file.isDirectory()) return
    if (path.extname(file.name) !== ".css") return

    const rr = fs.ReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
    rr.on('readable', () => {
      let data = rr.read();
      if (data != null) styleRes.push(data);
    });

  })


})

const rw = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8');

process.on('exit', () => {
  rw.write(styleRes.join('\n'))
});


