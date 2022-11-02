const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    files.forEach((file) => {
      const rr = fs.ReadStream(path.join(__dirname, 'files', file), 'utf-8');


      rr.on('readable', () => {
        const data = rr.read();
        if (data != null) {
          const rw = fs.createWriteStream(path.join(__dirname, 'files-copy', file), 'utf-8');
          rw.write(data)

        }
      });

    })
  })
});